import { fromEvent } from 'rxjs';

import { Modal } from './Modal';

export class BasketModal extends Modal {
  constructor(basket) {
    super('#modal-basket', '#close-basket');

    this.sumElement = document.querySelectorAll('.sum');
    this.basket = basket;

    this.setupEventListeners();
  }

  setupEventListeners() {
    console.log('basket');
    super.setupEventListeners();

    if (!this.basketFabClickSubscription) {
      this.basketFabClickSubscription = fromEvent(document.querySelector('#basket'), 'click').subscribe(() =>
        this.handleClickFab(),
      );
    }

    if (!this.submitClickSubscription) {
      this.submitClickSubscription = fromEvent(document.querySelector('.basket__submit'), 'click').subscribe(() =>
        this.handleClickSubmit(),
      );
    }
  }

  handleClickFab() {
    console.log('click fab');
    this.open();
  }

  openWithBasket(img, name, code, price, size, quantity) {
    this.basket.addProductToBasket(img, name, code, price, size, quantity);
    this.renderSum();
    this.open();
  }

  renderSum() {
    this.sumElement.forEach((element) => {
      element.textContent = ` ${this.basket.getSumBasket()} грн`;
    });
  }

  handleClickSubmit() {
    console.log('click submit');
  }
}
