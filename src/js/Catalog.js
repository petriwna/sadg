import { Basket } from './Basket';
import { BasketModal } from './BasketModal';
import { ProductModal } from './ProductModal';

export class Catalog {
  constructor() {
    this.cards = document.querySelectorAll('.card');
    this.btnDetails = document.querySelectorAll('.details');
    this.btnBuy = document.querySelectorAll('.card__button-buy');
    this.productModal = new ProductModal();
    this.basketModal = new BasketModal();
    this.basket = new Basket();
    this.addClickListeners();
  }

  addClickListeners() {
    this.cards.forEach((card) => {
      card.addEventListener('click', (event) => this.handleCardClick(event));
    });

    this.btnDetails.forEach((btn) => {
      btn.addEventListener('click', (event) => this.handleClickDetails(event));
    });

    this.btnBuy.forEach((btn) => {
      btn.addEventListener('click', (event) => this.handleClickBuy(event));
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
    if (card) {
      this.basketModal.openWithBasket(img, name, code, price, 1);
    }
  }
}
