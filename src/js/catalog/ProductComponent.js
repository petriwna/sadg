import { ProductCounter } from './ProductCounter';
import { ProductGallery } from './ProductGallery';

export class ProductComponent {
  constructor() {
    this.modalTitle = document.querySelector('.modal__title');
    this.modalCode = document.querySelector('.code-js');
    this.modalPrice = document.querySelector('.modal__price');
    this.modalDescription = document.querySelector('.modal__description');
    // this.price = document.querySelector('.price__new').textContent;
    // this.size = 0;
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
    this.modalTitle.textContent = product.title ? product.title : product.name;
    this.modalCode.textContent = product.sizeList[0].code;
    this.price = product.sizeList[0].newCost;
    this.size = product.sizeList;

    this.modalPrice.innerHTML = `
      <p class="price__new">${product.sizeList[0].newCost} грн</p>
      ${product.sizeList[0].oldCost ? `<p class="price__old">${product.sizeList[0].oldCost} грн</p>` : ''}
    `;

    if (this.size.length > 1) {
      const sizeList = this.renderSizeList(product.sizeList);

      this.modalDescription.appendChild(sizeList);
    }

    // this.modalDescription.appendChild(product.description);
    this.productGallery.renderGallery(product);
    this.modalImg = this.productGallery.modalImg[0];
  }

  renderSizeList(listSize) {
    const sizeContainer = document.createElement('fieldset');
    sizeContainer.classList.add('modal__size-list');

    const legend = document.createElement('legend');
    legend.classList.add('modal__size-title');
    sizeContainer.appendChild(legend);

    legend.textContent = listSize[0].code.includes('Kaz') ? "Об'єм" : 'Розмір';

    listSize.forEach((size, index) => {
      const sizeItem = document.createElement('div');
      sizeItem.classList.add('modal__size-item');

      const sizeListItem = document.createElement('input');
      sizeListItem.type = 'radio';
      sizeListItem.dataset.code = `${size.code}`;
      sizeListItem.id = `${size.code}`;
      sizeListItem.dataset.newCost = `${size.newCost}`;

      if (size.oldCost) {
        sizeListItem.dataset.oldCost = `${size.oldCost}`;
      }

      sizeListItem.value = `${size.name}`;
      sizeListItem.name = 'size';

      const label = document.createElement('label');
      label.setAttribute('for', `${size.code}`);
      label.classList.add('modal__size-item--label');
      label.innerText = size.name;

      sizeItem.appendChild(sizeListItem);
      sizeItem.appendChild(label);

      sizeContainer.appendChild(sizeItem);

      if (index === 0) {
        sizeListItem.checked = true;
      }
    });

    sizeContainer.addEventListener('change', (event) => {
      if (event.target.type === 'radio') {
        this.handleChangeSize(event, listSize[0].name);
      }
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

  // removeDescription(cardDescription) {
  //   if (cardDescription) {
  //     cardDescription.remove();
  //   }
  // }
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
