import { ProductCounter } from './ProductCounter';
import { ProductGallery } from './ProductGallery';

export class ProductComponent {
  constructor() {
    this.modalTitle = document.querySelector('.modal__title');
    this.modalCode = document.querySelector('.modal__code');
    this.modalPrice = document.querySelector('.modal__price');
    this.modalDescription = document.querySelector('.modal__description');
    this.price = document.querySelector('.price__new').textContent;
    this.size = 0;
    this.orderBtn = document.getElementById('order-modal');

    this.productCounter = new ProductCounter();
    this.productGallery = new ProductGallery();

    this.modalImg = null;
  }

  setupEventListeners(handleClickOrderBtn) {
    this.orderBtn.addEventListener('click', handleClickOrderBtn.bind(this));

    this.productCounter.setupEventListeners();
  }

  updateModalContent(product) {
    this.modalTitle.textContent = product.title;
    this.modalCode.textContent = product.info[0].code;
    this.price = product.info[0].newCost;
    this.size = product.info[0].size;

    this.modalPrice.innerHTML = `
      <p class="price__new">${product.info[0].newCost} грн</p>
      ${product.info[0].oldCost ? `<p class="price__old">${product.info[0].oldCost} грн</p>` : ''}
    `;

    if (product.size.length > 1) {
      const sizeList = this.renderSizeList(product.size, product.title, product.info);

      this.modalDescription.appendChild(sizeList);
    }

    this.modalDescription.appendChild(product.description);
    this.productGallery.renderGallery(product);
    this.modalImg = this.productGallery.modalImg[0];
  }

  renderSizeList(listSize, name, info) {
    const sizeContainer = document.createElement('fieldset');
    sizeContainer.setAttribute('class', 'modal__size-list');
    const legend = document.createElement('legend');
    legend.setAttribute('class', 'modal__size-title');
    sizeContainer.appendChild(legend);

    const previousValue = info[0].size;

    if (info[0].code.includes('Kaz')) {
      legend.textContent = "Об'єм";
    } else {
      legend.textContent = 'Розмір';
    }

    listSize.forEach((size, index) => {
      const sizeItem = document.createElement('div');
      sizeItem.classList.add('modal__size-item');

      const contentSize = size.textContent;
      const data = size.dataset.size;
      const sizeListItem = document.createElement('input');
      sizeListItem.setAttribute('type', 'radio');
      sizeListItem.setAttribute('data-code', `${info[index].code}`);
      sizeListItem.setAttribute('id', `${info[index].code}`);
      sizeListItem.setAttribute('data-new-cost', `${info[index].newCost}`);
      if (info[index].oldCost) {
        sizeListItem.setAttribute('data-old-cost', `${info[index].oldCost}`);
      }
      sizeListItem.setAttribute('value', `${contentSize}`);
      sizeListItem.setAttribute('name', `${name}`);

      const label = document.createElement('label');
      label.setAttribute('for', `${data}`);
      label.innerText = contentSize;

      sizeItem.appendChild(sizeListItem);
      sizeItem.appendChild(label);

      sizeContainer.appendChild(sizeItem);

      if (index === 0) {
        sizeListItem.setAttribute('checked', 'checked');
      }
    });

    sizeContainer.addEventListener('change', (event) => {
      this.handleChangeSize(event, previousValue);
    });

    return sizeContainer;
  }

  handleChangeSize(event, previousValue) {
    if (event.target.type === 'radio') {
      const selectedValue = event.target;

      if (selectedValue !== previousValue) {
        this.size = selectedValue.value;
        this.modalCode.textContent = selectedValue.dataset.code;
        this.price = selectedValue.dataset.newCost;
        this.modalPrice.innerHTML = `
          <p class="price__new">${selectedValue.dataset.newCost} грн</p>
          ${selectedValue.dataset.oldCost ? `<p class="price__old">${selectedValue.dataset.oldCost} грн</p>` : ''}
        `;
      }
    }
  }

  removeSize() {
    const sizeList = document.querySelector('.modal__size-list');
    if (sizeList) {
      sizeList.remove();
    }
  }

  removeDescription(cardDescription) {
    if (cardDescription) {
      cardDescription.remove();
    }
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
}
