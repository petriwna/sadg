import { Modal } from './Modal';

export class BasketModal extends Modal {
  constructor() {
    super('#modal-basket', '#close-basket');
  }

  openWithBasket(basketItems) {
    this.populateBasket(basketItems);
    this.open();
  }

  populateBasket(basketItems) {
    console.log('basket', basketItems);
  }
}
