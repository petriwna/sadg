import { Basket } from './Basket';
import { Modal } from './Modal';

export class BasketModal extends Modal {
  constructor() {
    super('#modal-basket', '#close-basket');
    this.basket = new Basket();
  }

  openWithBasket(img, name, code, price, size, quantity) {
    this.populateBasket(img, name, code, price, size, quantity);
    this.open();
  }

  populateBasket(img, name, code, price, size, quantity) {
    this.basket.addProductToBasket(img, name, code, price, size, quantity);
  }
}
