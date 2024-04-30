import { Modal } from './Modal';

export class BasketModal extends Modal {
  constructor() {
    super('#modal-basket', '#close-basket');
    this.fabBasket = document.getElementById('basket');
    this.counterFab = document.getElementById('basket-count');
    this.counter = 0;
  }

  openWithBasket(basketItems) {
    this.populateBasket(basketItems);
    this.open();
  }

  populateBasket(basketItems) {
    this.fabBasket.style.display = 'flex';
    this.counter = this.counter + 1;
    this.counterFab.innerText = this.counter;
  }
}
