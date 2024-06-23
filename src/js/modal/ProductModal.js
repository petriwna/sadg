import { Modal } from './Modal';
import { ProductComponent } from '../catalog/ProductComponent';
import { ProductService } from '../service/ProductService';

export class ProductModal extends Modal {
  constructor(basket, basketModal) {
    super('#modal-product', '#close-product');
    this.basket = basket;
    this.basketModal = basketModal;

    this.productService = new ProductService();
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
    const product = await this.productService.getProduct(category, id);

    this.productComponent.updateModalContent(product);
    this.open();
  }

  close() {
    super.close();
    this.productComponent.removeDescription();
    this.productComponent.removeSize();
    this.productComponent.resetCounter();
    this.productComponent.removeGallery();
  }

  handleClickOrderBtn() {
    this.basketModal.openWithBasket(
      this.productComponent.modalImg,
      this.productComponent.modalTitle.textContent,
      this.productComponent.modalCode.textContent,
      this.productComponent.price,
      this.productComponent.size.name,
      this.productComponent.getCounter(),
    );
  }
}
