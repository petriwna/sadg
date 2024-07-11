import { Modal } from './Modal';
import { ProductComponent } from './ProductComponent';

export class ProductModal extends Modal {
  constructor(basket, basketModal) {
    super('#modal-product', '#close-product');
    this.basket = basket;
    this.basketModal = basketModal;

    this.productComponent = new ProductComponent();

    this.product = {};

    this.description = document.querySelector('.product');
    this.productComponent.setupEventListeners(this.handleClickOrderBtn.bind(this));
    this.setupEventListeners();
  }

  setupEventListeners() {
    super.setupEventListeners();
  }

  async openWithProduct(category, id) {
    this.productComponent.updateModalContent(category, id);
    this.open();
  }

  close() {
    super.close();
    this.productComponent.clearContent();
  }

  handleClickOrderBtn() {
    this.basketModal.openWithBasket(
      this.productComponent.modalImg,
      this.productComponent.modalTitle.textContent,
      this.productComponent.modalCode.textContent.split(':')[1].trim(),
      this.productComponent.price,
      this.productComponent.size.name,
      this.productComponent.getCounter(),
      this.productComponent.gift,
    );
  }
}
