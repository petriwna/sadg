import { Modal } from './Modal';
import { ProductComponent } from '../catalog/ProductComponent';
import { ProductService } from '../service/ProductService';

export class ProductModal extends Modal {
  constructor(basket, basketModal) {
    super('#modal-product', '#close-product');

    this.productService = new ProductService();

    this.productComponent = new ProductComponent();
    this.basket = basket;

    this.basketModal = basketModal;

    this.product = {};

    this.description = document.querySelector('.product');

    this.productComponent.setupEventListeners(this.handleClickOrderBtn.bind(this));

    this.setupEventListeners();
  }

  setupEventListeners() {
    super.setupEventListeners();
  }

  async openWithProduct(category, id) {
    const product = await this.productService.getProduct(category, id);

    this.productComponent.updateModalContent(product);
    this.open();
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

    // description.classList.remove('visually-hidden');

    return { title, info, size, description };
  }

  close() {
    super.close();
    this.productComponent.removeDescription();
    this.productComponent.removeSize();
    // this.productComponent.resetCounter();
    this.productComponent.removeGallery();
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
