import { Basket } from './Basket';
import { Modal } from './Modal';

export class BasketModal extends Modal {
  constructor() {
    super('#modal-basket', '#close-basket');
    this.fabBasket = document.getElementById('basket');
    this.basket = new Basket();
  }

  openWithBasket(basketItems) {
    this.populateBasket(basketItems);
    this.open();
  }

  populateBasket(basketItems) {
    this.fabBasket.style.display = 'flex';
    this.basket.addProductToBasket(basketItems);
  }
}
