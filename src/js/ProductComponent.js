import { filter, fromEvent, map } from 'rxjs';

export class ProductComponent {
  constructor() {
    this.modalTitle = document.querySelector('.modal__title');
    this.modalCode = document.querySelector('.modal__code');
    this.modalPrice = document.querySelector('.modal__price');
    this.modalDescription = document.querySelector('.modal__description');
    this.modalImg = document.querySelector('.modal__img');
    this.price = document.querySelector('.price__new').textContent;
    this.counterInput = document.getElementById('order-counter');
    this.incrementBtn = document.querySelector('.product-plus');
    this.decrementBtn = document.querySelector('.product-minus');
    this.orderBtn = document.getElementById('order-modal');

    this.counterInputValue = 1;
  }

  setupEventListeners(handleClickOrderBtn, incrementCounter, decrementCounter) {
    this.orderBtn.addEventListener('click', handleClickOrderBtn.bind(this));

    fromEvent(this.counterInput, 'input')
      .pipe(
        map((event) => parseInt(event.target.value)),
        filter((value) => !isNaN(value) && value >= 1 && value <= 999),
      )
      .subscribe((value) => (this.counterInputValue = value));

    fromEvent(this.incrementBtn, 'click').subscribe(() => incrementCounter());
    fromEvent(this.decrementBtn, 'click').subscribe(() => decrementCounter());
  }

  updateModalContent(product) {
    this.modalTitle.textContent = product.title;
    this.modalCode.textContent = product.code;
    this.modalPrice.innerHTML = `
      <p class="price__new">${product.priceNew}</p>
      ${product.priceOld ? `<p class="price__old">${product.priceOld}</p>` : ''}
    `;

    if (product.size.length > 1) {
      const sizeList = this.renderSizeList(product.size);
      this.modalDescription.appendChild(sizeList);
    }

    this.modalDescription.appendChild(product.description);
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

  resetCounter() {
    this.counterInput.value = 1;
    this.counterInputValue = 1;
  }
}
