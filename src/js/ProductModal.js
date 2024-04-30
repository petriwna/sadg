import { Modal } from './Modal';

export class ProductModal extends Modal {
  constructor() {
    super('#modal-product', '#close-product');

    this.modalTitle = document.querySelector('.modal__title');
    this.modalCode = document.querySelector('.modal__code');
    this.modalPrice = document.querySelector('.modal__price');
    this.modalDescription = document.querySelector('.modal__description');
    this.cardDescriptionCopy = null;

    this.handleClickClose = this.handleClickClose.bind(this);

    this.closeBtn.addEventListener('click', this.handleClickClose);
    this.backdrop.addEventListener('click', this.handleClickClose);
  }

  openWithProduct(card) {
    this.getProductDescription(card);
    this.open();
  }

  getProductDescription(card) {
    const cardTitle = card.querySelector('.card__title').textContent;
    const cardCode = card.querySelector('.card__code').textContent;
    const cardPriceOld = card.querySelector('.price__old').textContent;
    const cardPriceNew = card.querySelector('.price__new').textContent;
    const cardDescription = card.querySelector('.product');
    this.cardDescriptionCopy = cardDescription.cloneNode(true);

    this.cardDescriptionCopy.classList.remove('visually-hidden');
    this.modalTitle.textContent = cardTitle;
    this.modalCode.textContent = cardCode;
    this.modalPrice.innerHTML = `
            <p class="price__new">${cardPriceNew}</p>
            <p class="price__old">${cardPriceOld}</p>
        `;
    this.modalDescription.appendChild(this.cardDescriptionCopy);
  }

  handleClickClose() {
    this.removeDescription();
  }

  removeDescription() {
    if (this.cardDescriptionCopy) {
      this.cardDescriptionCopy.remove();
    }
  }
}
