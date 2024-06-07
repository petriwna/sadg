import { Modal } from './Modal';
import { ProductComponent } from '../catalog/ProductComponent';

export class ProductModal extends Modal {
  constructor(basket, basketModal) {
    super('#modal-product', '#close-product');

    this.productComponent = new ProductComponent();
    this.basket = basket;

    this.basketModal = basketModal;

    this.product = {};

    this.cardDescriptionCopy = null;

    this.productComponent.setupEventListeners(this.handleClickOrderBtn.bind(this));

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
    const imagesUrl = card.querySelectorAll('.url');
    const urls = [];
    imagesUrl.forEach((item) => {
      urls.push(item.dataset.url);
    });

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
    this.productComponent.removeGallery();
  }

  removeDescription() {
    this.productComponent.removeDescription(this.cardDescriptionCopy);
    this.cardDescriptionCopy = null;
  }

  handleClickOrderBtn() {
    this.basketModal.openWithBasket(
      this.productComponent.modalImg,
      this.productComponent.modalTitle.textContent,
      this.productComponent.modalCode.textContent,
      this.productComponent.price,
      this.productComponent.size,
      this.productComponent.getCounter(),
    );
  }
}
