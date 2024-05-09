import { fromEvent } from 'rxjs';

import { Modal } from './Modal';

export class BasketModal extends Modal {
  constructor(basket) {
    super('#modal-basket', '#close-basket');

    this.counterFab = document.getElementById('basket-count');
    this.sumElement = document.querySelectorAll('.sum');

    this.basket = basket;

    this.setupEventListeners();
  }

  openWithBasket(img, name, code, price, size, quantity) {
    this.basket.addProductToBasket(img, name, code, price, size, quantity);
    this.updateFabCounter();

    this.openBasket();
  }

  setupEventListeners() {
    super.setupEventListeners();

    this.setupBasketButtonListeners();
  }

  setupBasketButtonListeners() {
    fromEvent(document.querySelector('#basket'), 'click').subscribe(() => this.handleClickFab());
    fromEvent(document.querySelector('.basket__submit'), 'click').subscribe(() =>
      this.handleClickSubmit(),
    );
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

  handleClickSubmit() {
    this.close();
    this.clearBasket();
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
