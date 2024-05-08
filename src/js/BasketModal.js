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

  setupEventListeners() {
    super.setupEventListeners();

    if (!this.basketFabClickSubscription) {
      this.basketFabClickSubscription = fromEvent(
        document.querySelector('#basket'),
        'click',
      ).subscribe(() => this.handleClickFab());
    }

    if (!this.submitClickSubscription) {
      this.submitClickSubscription = fromEvent(
        document.querySelector('.basket__submit'),
        'click',
      ).subscribe(() => this.handleClickSubmit());
    }
  }

  openBasket() {
    this.updateTotalSum();
    this.open();
    this.basket.renderBasket();
    this.updateProductSums();
    this.clickButtonsBasket();
  }

  updateFabCounter() {
    this.counterFab.innerText = this.basket.getQuantity();
  }

  updateProductSums() {
    const products = document.querySelectorAll('.basket__item');
    products.forEach((product, index) => {
      this.updateProductSum(index, product);
    });
  }

  clickButtonsBasket() {
    document.querySelectorAll('.basket-plus').forEach((btn, index) => {
      btn.addEventListener('click', (event) => this.increment(event, index));
    });
    document.querySelectorAll('.basket-minus').forEach((btn, index) => {
      btn.addEventListener('click', (event) => this.decrement(event, index));
    });
  }

  handleClickFab() {
    this.openBasket();
  }

  openWithBasket(img, name, code, price, size, quantity) {
    this.basket.addProductToBasket(img, name, code, price, size, quantity);
    this.updateFabCounter();

    this.openBasket();
  }

  updateTotalSum() {
    this.sumElement.forEach((element) => {
      element.textContent = ` ${this.basket.getSumBasket()} грн`;
    });
  }

  updateProductSum(index, parent) {
    const price = parent.querySelector('.basket__price');
    price.innerText = `${this.basket.getSumProduct(index)} грн`;
  }

  increment(event, index) {
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

  decrement(event, index) {
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

  handleClickSubmit() {
    console.log('click submit');
  }
}
