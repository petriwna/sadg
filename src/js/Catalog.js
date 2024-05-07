import { fromEvent } from 'rxjs';

import { BasketModal } from './BasketModal';
import { ProductModal } from './ProductModal';

export class Catalog {
  constructor() {
    this.cards = document.querySelectorAll('.card');
    this.btnDetails = document.querySelectorAll('.details');
    this.btnBuy = document.querySelectorAll('.card__button-buy');

    this.productModal = new ProductModal();
    this.basketModal = new BasketModal();

    this.addClickListeners();
  }

  addClickListeners() {
    this.cards.forEach((card) => {
      fromEvent(card, 'click').subscribe((event) => this.handleCardClick(event));
    });

    this.btnDetails.forEach((btn) => {
      fromEvent(btn, 'click').subscribe((event) => this.handleClickDetails(event));
    });

    this.btnBuy.forEach((btn) => {
      fromEvent(btn, 'click').subscribe((event) => this.handleClickBuy(event));
    });
  }

  handleCardClick(event) {
    const card = event.currentTarget.closest('.card');
    this.productModal.openWithProduct(card);
  }

  handleClickDetails(event) {
    event.stopPropagation();
    const card = event.currentTarget.closest('.card');
    if (card) {
      this.productModal.openWithProduct(card);
    }
  }

  handleClickBuy(event) {
    event.stopPropagation();
    const card = event.currentTarget.closest('.card');
    const img = card.querySelector('.card__image').getAttribute('src');
    const name = card.querySelector('.card__title').textContent;
    const code = card.querySelector('.card__code').textContent;
    const price = card.querySelector('.price__new').textContent;
    const size = card.querySelector('.size');
    if (card) {
      this.basketModal.openWithBasket(img, name, code, price, size, 1);
    }
  }
}
