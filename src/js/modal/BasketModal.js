import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Modal } from './Modal';
import { FormHandler } from '../form/FormHandler';

export class BasketModal extends Modal {
  constructor(basket) {
    super('#modal-basket', '#close-basket');

    this.counterFab = document.getElementById('basket-count');
    this.sumElement = document.querySelectorAll('.sum');
    this.modalContent = document.getElementById('modal-basket').childNodes;

    this.basket = basket;

    this.setupEventListeners();
  }

  openWithBasket(img, name, code, price, size, quantity, gift) {
    this.basket.addProductToBasket(img, name, code, price, size, quantity, gift);
    this.updateFabCounter();

    this.openBasket();
  }

  setupEventListeners() {
    super.setupEventListeners();

    this.setupBasketButtonListeners();
  }

  setupBasketButtonListeners() {
    fromEvent(this.modalContent, 'click')
      .pipe(
        tap((event) => {
          event.stopPropagation();
        }),
      )
      .subscribe();
    fromEvent(document.querySelector('#basket'), 'click').subscribe(() => this.handleClickFab());
  }

  setupBasketItemListeners() {
    document.querySelectorAll('.basket__value').forEach((input, index) => {
      input.addEventListener('blur', () => {
        if (input.value.trim() === '' || input.value.trim() === '0') {
          input.value = '1';
        }
      });

      input.addEventListener('input', () => {
        if (input.value.length > 3) {
          input.value = input.value.slice(0, 3);
        }
        this.handleInputValue(event, index, input.value);
      });
    });

    document.querySelectorAll('.basket-plus').forEach((btn, index) => {
      btn.addEventListener('click', (event) => this.handleIncrement(event, index));
    });
    document.querySelectorAll('.basket-minus').forEach((btn, index) => {
      btn.addEventListener('click', (event) => this.handleDecrement(event, index));
    });
    document.querySelectorAll('.basket__delete').forEach((btn, index) => {
      btn.addEventListener('click', (event) => this.handleDeleteProduct(event, index));
    });
  }

  handleClickFab() {
    this.openBasket();
  }

  openBasket() {
    this.updateTotalSum();
    this.open();
    this.basket.renderBasket();
    this.updateProductSums();
    this.setupBasketItemListeners();
    new FormHandler(document.querySelector('.order'), this);
  }

  updateTotalSum() {
    this.sumElement.forEach((element) => {
      element.textContent = ` ${this.basket.getSumBasket()} грн`;
    });
  }

  updateProductSums() {
    const products = document.querySelectorAll('.basket__item');
    products.forEach((product, index) => {
      this.updateProductSum(index, product);
    });
  }

  updateProductSum(index, parent) {
    const price = parent.querySelector('.basket__price');
    price.innerText = `${this.basket.getSumProduct(index)} грн`;
  }

  updateQuantityGift(quantity, el) {
    const parent = el.parentNode.parentNode.parentNode;
    const giftQuantity = parent.querySelector('#gift-quantity');

    if (giftQuantity) {
      giftQuantity.textContent = quantity;
    }
  }

  handleInputValue(event, index, value) {
    const parent = event.target.parentNode;
    this.basket.changeQuantity(index, parseInt(value));
    this.updateProductSum(index, parent.parentNode);
    this.updateTotalSum();
    this.updateFabCounter();
  }

  handleIncrement(event, index) {
    const parent = event.target.parentNode;
    const input = parent.querySelector('.basket__value');
    let newQuantity = (this.basket.basket[index].quantity += 1);
    newQuantity = Math.min(newQuantity, 999);
    this.basket.changeQuantity(index, newQuantity);
    input.value = newQuantity;
    this.updateProductSum(index, parent.parentNode);
    this.updateTotalSum();
    this.updateFabCounter();
    this.updateQuantityGift(newQuantity, parent.parentNode);
  }

  handleDecrement(event, index) {
    const parent = event.target.parentNode;
    const input = parent.querySelector('.basket__value');
    let newQuantity = (this.basket.basket[index].quantity -= 1);
    newQuantity = Math.max(newQuantity, 1);
    this.basket.changeQuantity(index, newQuantity);
    input.value = newQuantity;
    this.updateProductSum(index, parent.parentNode);
    this.updateTotalSum();
    this.updateFabCounter();
    this.updateQuantityGift(newQuantity);
  }

  handleDeleteProduct(event, index) {
    this.basket.deleteProduct(index);
    this.removeItemProduct(index);

    if (this.basket.basket.length === 0) {
      this.close();
      this.updateFabCounter();
      this.basket.basketFab.style.display = 'none';
    } else {
      this.updateBasketUI();
    }
  }

  removeItemProduct(index) {
    const item = document.querySelector(`.basket__item:nth-child(${index + 1})`);
    if (item) {
      item.classList.add('fade-out');

      setTimeout(() => {
        item.remove();
      }, 500);
    } else {
      this.close();
    }
  }

  clearBasket() {
    this.basket.clearBasket();
  }

  updateFabCounter() {
    this.counterFab.innerText = this.basket.getQuantity();
  }

  updateBasketUI() {
    this.updateTotalSum();
    this.updateFabCounter();
  }
}
