import { ProductCounter } from './ProductCounter';
import { ProductDescription } from './ProductDescription';
import { ProductGallery } from './ProductGallery';
import { SizeList } from './SizeList';
import { EventHandler } from '../EventHandler';

export class ProductComponent {
  constructor() {
    this.modalTitle = document.querySelector('.modal__title');
    this.modalCode = document.querySelector('.code-js');
    this.modalPrice = document.querySelector('.modal__price');
    this.orderBtn = document.getElementById('order-modal');

    this.productCounter = new ProductCounter();
    this.productGallery = new ProductGallery();
    this.sizeList = new SizeList(this.modalCode, this.modalPrice);
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

  updateModalContent(product) {
    this.modalTitle.textContent = product.title || product.name;
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
    this.modalCode.textContent = selectedSize.code;
    this.price = selectedSize.newCost;

    this.modalPrice.innerHTML = `
      <p class="price__new">${selectedSize.newCost} грн</p>
      ${selectedSize.oldCost ? `<p class="price__old">${selectedSize.oldCost} грн</p>` : ''}
    `;
  }

  removeSize() {
    this.sizeList.remove();
  }

  removeDescription() {
    this.productDescription.remove();
  }

  //
  // getCounter() {
  //   return this.productCounter.counterInputValue;
  // }
  //
  // resetCounter() {
  //   this.productCounter.resetCounter();
  // }
  //
  removeGallery() {
    this.productGallery.removeGallery();
  }
}
