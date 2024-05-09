import { Modal } from './Modal';
import { ProductComponent } from './ProductComponent';

export class ProductModal extends Modal {
  constructor(basket, basketModal) {
    super('#modal-product', '#close-product');

    this.productComponent = new ProductComponent();
    this.basket = basket;

    this.basketModal = basketModal;

    this.product = {};

    this.cardDescriptionCopy = null;

    this.productComponent.setupEventListeners(
      this.handleClickOrderBtn.bind(this),
      this.incrementCounter.bind(this),
      this.decrementCounter.bind(this),
    );

    this.setupEventListeners();
  }

  setupEventListeners() {
    super.setupEventListeners();
  }

  openWithProduct(card) {
    this.getProductDescription(card);
    this.open();
  }

  getProductDescription(card) {
    this.product = this.extractProductDetails(card);

    this.cardDescriptionCopy = this.product.description;

    this.productComponent.updateModalContent(this.product);
  }

  extractProductDetails(card) {
    const info = [];
    const title = card.querySelector('.card__title').textContent;
    const code = card.querySelector('.card__code').textContent;
    const priceOldElement = card.querySelector('.price__old');
    const priceNew = card.querySelector('.price__new').textContent;
    const size = card.querySelectorAll('.card__size');
    const img = card.querySelector('.card__image');
    const imagesUrl = card.querySelectorAll('.url');
    const urls = [];
    imagesUrl.forEach((item) => {
      urls.push(item.dataset.url);
    });
    const imgSrc = img.getAttribute('src');
    this.productComponent.modalImg.setAttribute('src', imgSrc);
    this.productComponent.modalImg.setAttribute('alt', title);

    if (size.length !== 0) {
      size.forEach((e) => {
        info.push({
          size: e.textContent,
          code: e.dataset.size,
          newCost: e.dataset.newCost,
          oldCost: e.dataset.oldCost,
          images: urls,
        });
      });
    } else {
      info.push({
        size: null,
        code: code,
        newCost: priceNew,
        oldCost: priceOldElement ? priceOldElement.textContent.replace('грн.', '').trim() : '',
        images: urls,
      });
    }

    const description = card.querySelector('.product').cloneNode(true);
    this.cardDescriptionCopy = description;
    description.classList.remove('visually-hidden');

    return { title, info, size, description };
  }

  close() {
    super.close();
    this.removeDescription();
    this.productComponent.removeSize();
    this.productComponent.resetCounter();
  }

  removeDescription() {
    this.productComponent.removeDescription(this.cardDescriptionCopy);
    this.cardDescriptionCopy = null;
  }

  incrementCounter() {
    if (this.productComponent.counterInputValue < 999) {
      this.productComponent.counterInput.value = ++this.productComponent.counterInputValue;
    }
  }

  decrementCounter() {
    if (this.productComponent.counterInputValue > 1) {
      this.productComponent.counterInput.value = --this.productComponent.counterInputValue;
    }
  }

  handleClickOrderBtn() {
    this.basketModal.openWithBasket(
      this.productComponent.modalImg.getAttribute('src'),
      this.productComponent.modalTitle.textContent,
      this.productComponent.modalCode.textContent,
      this.productComponent.price,
      this.productComponent.size,
      this.productComponent.counterInputValue,
    );
  }
}
