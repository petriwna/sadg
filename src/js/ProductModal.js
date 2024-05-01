import { Basket } from './Basket';
import { Modal } from './Modal';

export class ProductModal extends Modal {
  constructor() {
    super('#modal-product', '#close-product');

    this.modalTitle = document.querySelector('.modal__title');
    this.modalCode = document.querySelector('.modal__code');
    this.modalPrice = document.querySelector('.modal__price');
    this.modalDescription = document.querySelector('.modal__description');
    this.modalImg = document.querySelector('.modal__img');
    this.price = document.querySelector('.price__new').textContent;

    this.counterInput = document.getElementById('order-counter');
    this.incrementBtn = document.querySelector('.plus');
    this.decrementBtn = document.querySelector('.minus');
    this.orderBtn = document.getElementById('order-modal');

    this.basket = new Basket();
    this.cardDescriptionCopy = null;
    this.counterInputValue = 1;

    this.handleClickClose = this.handleClickClose.bind(this);
    this.handleClickOrderBtn = this.handleClickOrderBtn.bind(this);

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.closeBtn.addEventListener('click', this.handleClickClose);
    this.backdrop.addEventListener('click', this.handleClickClose);
    this.orderBtn.addEventListener('click', this.handleClickOrderBtn);

    this.incrementBtn.addEventListener('click', () => this.handleClickIncrement());
    this.decrementBtn.addEventListener('click', () => this.handleClickDecrement());
    this.counterInput.addEventListener('input', () => this.handleCounterInput());
  }

  openWithProduct(card) {
    this.getProductDescription(card);
    this.open();
  }

  getProductDescription(card) {
    const { title, code, priceNew, priceOld, size, description } = this.extractProductDetails(card);

    this.cardDescriptionCopy = description;

    this.updateModalContent(title, code, priceNew, priceOld, size, description);
  }

  extractProductDetails(card) {
    const title = card.querySelector('.card__title').textContent;
    const code = card.querySelector('.card__code').textContent;
    const priceOldElement = card.querySelector('.price__old');
    const priceNew = card.querySelector('.price__new').textContent;
    const size = card.querySelectorAll('.card__size');
    this.modalImg = card.querySelector('.card__image').getAttribute('src');
    const description = card.querySelector('.product').cloneNode(true);

    description.classList.remove('visually-hidden');

    let priceOld = '';

    if (priceOldElement !== null) {
      priceOld = priceOldElement.textContent;
    }

    return { title, code, priceNew, priceOld, size, description };
  }

  updateModalContent(title, code, priceNew, priceOld, size, description) {
    this.modalTitle.textContent = title;
    this.modalCode.textContent = code;
    this.modalPrice.innerHTML = `
      <p class="price__new">${priceNew}</p>
      ${priceOld ? `<p class="price__old">${priceOld}</p>` : ''}
    `;

    if (size.length > 1) {
      const sizeList = this.renderSizeList(size);
      this.modalDescription.appendChild(sizeList);
    }

    this.modalDescription.appendChild(description);
  }

  renderSizeList(listSize) {
    const sizeList = document.createElement('div');
    sizeList.classList.add('modal__size-list');

    listSize.forEach((size, index) => {
      const sizeContainer = document.createElement('div');
      sizeContainer.classList.add('modal__size-item');

      const contentSize = size.textContent;
      const data = size.dataset.size;
      const sizeListItem = document.createElement('input');
      sizeListItem.setAttribute('type', 'radio');
      sizeListItem.setAttribute('value', `${contentSize}`);
      sizeListItem.setAttribute('name', `${data}`);

      const label = document.createElement('label');
      label.setAttribute('for', `${data}`);
      label.innerText = contentSize;

      sizeContainer.appendChild(sizeListItem);
      sizeContainer.appendChild(label);

      sizeList.appendChild(sizeContainer);

      if (index === 0) {
        sizeListItem.setAttribute('checked', 'checked');
      }
    });
    return sizeList;
  }

  handleClickClose() {
    this.removeDescription();
    this.removeSize();
    this.resetCounter();
  }

  removeSize() {
    const sizeList = document.querySelector('.modal__size-list');
    if (sizeList) {
      sizeList.remove();
    }
  }

  removeDescription() {
    if (this.cardDescriptionCopy) {
      this.cardDescriptionCopy.remove();
    }
  }

  resetCounter() {
    this.counterInput.value = 1;
    this.counterInputValue = 1;
  }

  handleCounterInput() {
    const newValue = parseInt(this.counterInput.value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 999) {
      this.counterInputValue = newValue;
    }
  }

  handleClickIncrement() {
    if (this.counterInputValue < 999) {
      this.counterInputValue += 1;
      this.counterInput.value = this.counterInputValue;
    }
  }

  handleClickDecrement() {
    if (this.counterInputValue > 1) {
      this.counterInputValue -= 1;
      this.counterInput.value = this.counterInputValue;
    }
  }

  handleClickOrderBtn() {
    this.basket.addProductToBasket(
      this.modalImg,
      this.modalTitle,
      this.modalCode.textContent,
      this.price,
      this.counterInputValue,
    );
  }
}
