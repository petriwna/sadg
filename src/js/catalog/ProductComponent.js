import { ProductCounter } from './ProductCounter';
import { ProductDescription } from './ProductDescription';
import { ProductGallery } from './ProductGallery';
import { SizeList } from './SizeList';
import { EventHandler } from '../EventHandler';
import { ProductService } from '../service/ProductService';

export class ProductComponent {
  constructor() {
    this.modalTitle = document.querySelector('.modal__title');
    this.modalCode = document.querySelector('.modal__code');
    this.modalPrice = document.querySelector('.modal__price');

    this.orderBtn = document.getElementById('order-modal');
    this.productService = new ProductService();
    this.productCounter = new ProductCounter();
    this.productGallery = new ProductGallery();
    this.sizeList = new SizeList(
      this.modalCode,
      this.modalPrice,
      this.updateSizeAndPrice.bind(this),
    );
    this.productDescription = new ProductDescription();

    this.eventHandler = new EventHandler();
    this.productCounter.setupEventListeners();

    this.price = null;
    this.size = null;
    this.modalImg = null;
  }

  setupEventListeners(handleClickOrderBtn) {
    this.eventHandler.addClickListener(this.orderBtn, handleClickOrderBtn);
  }

  async updateModalContent(category, id) {
    this.renderSkeletonContent();

    const product = await this.productService.getProduct(category, id);

    setTimeout(() => {
      this.renderModalContent(product);
    }, 1000);
  }

  renderSkeletonContent() {
    console.log('s');
  }

  renderModalContent(product) {
    this.modalTitle.textContent = product.title || product.name;
    this.size = product.sizeList[0].name;
    const p = document.createElement('p');
    this.modalCode.appendChild(p);

    this.updateSizeAndPrice(product.sizeList[0]);

    if (product.sizeList.length > 1) {
      this.sizeList.render(product.sizeList);
    }

    this.productDescription.render(product);
    this.productGallery.renderGallery(product);
    this.modalImg = this.productGallery.modalImg[0];
  }

  updateSizeAndPrice(selectedSize) {
    this.size = selectedSize;
    this.modalCode.firstChild.innerText = `Код товару: ${selectedSize.code}`;
    this.price = selectedSize.newCost;

    this.modalPrice.innerHTML = `
      <p class="price__new">${selectedSize.newCost} грн</p>
      ${selectedSize.oldCost ? `<p class="price__old">${selectedSize.oldCost} грн</p>` : ''}
    `;
  }

  removeSize() {
    this.sizeList.remove();
  }

  removePrice() {
    const items = Array.from(this.modalPrice.children);
    items.forEach((item) => {
      console.log(item);
      item.remove();
    });
  }

  removeCode() {
    this.modalCode.firstChild.remove();
  }

  removeDescription() {
    this.productDescription.remove();
  }

  getCounter() {
    return this.productCounter.counterInputValue;
  }

  resetCounter() {
    this.productCounter.resetCounter();
  }

  removeGallery() {
    this.productGallery.removeGallery();
  }

  clearContent() {
    this.modalTitle.textContent = '';
    this.removeCode();
    this.removePrice();
    this.removeGallery();
    this.removeSize();
    this.resetCounter();
    this.removeDescription();
  }
}
