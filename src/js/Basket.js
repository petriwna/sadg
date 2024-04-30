import { Modal } from './Modal';

export class Basket {
  constructor() {
    this.basketFab = document.querySelector('#basket');
    this.counterFab = document.getElementById('basket-count');

    this.modal = new Modal('#modal-basket', '#close-basket');

    this.counter = 0;
    this.basket = {};
    this.addClickListeners();
  }

  addClickListeners() {
    this.basketFab.addEventListener('click', () => this.handleClickFab());
  }

  handleClickFab() {
    this.modal.open();
  }

  addProductToBasket(card) {
    this.counter = this.counter + 1;
    this.counterFab.innerText = this.counter;
  }
}
