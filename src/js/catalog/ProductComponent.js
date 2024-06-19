import { ProductCounter } from './ProductCounter';
import { ProductGallery } from './ProductGallery';

export class ProductComponent {
  constructor() {
    this.modalTitle = document.querySelector('.modal__title');
    this.modalCode = document.querySelector('.code-js');
    this.modalPrice = document.querySelector('.modal__price');
    this.modalDescription = document.querySelector('.modal__description');
    this.orderBtn = document.getElementById('order-modal');

    this.productCounter = new ProductCounter();
    this.productGallery = new ProductGallery();

    this.description = null;
    this.price = null;
    this.size = null;
    this.modalImg = null;
  }

  setupEventListeners(handleClickOrderBtn) {
    this.orderBtn.addEventListener('click', handleClickOrderBtn.bind(this));
    this.productCounter.setupEventListeners();
  }

  updateModalContent(product, category) {
    this.modalTitle.textContent = product.title ? product.title : product.name;
    this.updateSizeAndPrice(product.sizeList[0]);

    if (product.sizeList.length > 1) {
      this.renderSizeList(product.sizeList);
    }

    this.renderDescription(product, category);
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

  renderSizeList(sizeList) {
    const sizeContainer = this.createSizeListElement(sizeList);
    this.modalDescription.appendChild(sizeContainer);
  }

  createSizeListElement(sizeList) {
    const sizeContainer = document.createElement('fieldset');
    sizeContainer.classList.add('modal__size-list');

    const legend = document.createElement('legend');
    legend.classList.add('modal__size-title');
    legend.textContent = sizeList[0].code.includes('Kaz') ? "Об'єм" : 'Розмір';

    sizeContainer.appendChild(legend);

    sizeList.forEach((size, index) => {
      const sizeItem = this.createSizeItemElement(size, index);
      sizeContainer.appendChild(sizeItem);
    });

    sizeContainer.addEventListener('change', (event) => {
      if (event.target.type === 'radio') {
        this.handleChangeSize(event, sizeList[0]);
      }
    });

    return sizeContainer;
  }

  createSizeItemElement(size, index) {
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

    if (index === 0) {
      sizeListItem.checked = true;
    }

    return sizeItem;
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

  renderDescription(product) {
    const description = this.createDescription(product);

    this.modalDescription.appendChild(description);
  }

  createDescription(product) {
    const description = this.createDescriptionElement();
    this.description = description;

    this.renderCompectationContent(description, product.description);

    return description;
  }

  createDescriptionElement() {
    const description = document.createElement('div');
    description.classList.add('product');
    return description;
  }

  createMangalDescription(product) {
    const description = document.createElement('div');

    this.description = description;

    description.classList.add('product');
    console.log('mangal');

    return description;
  }

  renderCompectationContent(description, productDescription) {
    if (productDescription) {
      this.appendTitle(description, productDescription.title);
      this.appendText(description, productDescription.text);
      this.appendDescriptionElement(description, productDescription.matter, 'Матеріал');
      this.appendDescriptionElement(description, productDescription.color, 'Колір');
      this.appendDescriptionElement(description, productDescription.application, 'Застосування');
      this.appendAdvantages(description, productDescription.advantages);
      this.appendCharacteristics(
        description,
        productDescription.dimensionsFolded,
        'Габаритні розміри в складеному стані',
      );
      this.appendCharacteristics(
        description,
        productDescription.dimensionsLaidOut,
        'Габаритні розміри в розкладеному стані',
      );
      this.appendText(description, productDescription.secondText);
      this.appendCharacteristics(description, productDescription.characteristics, 'ХАРАКТЕРИСТИКИ');
      this.appendTable(description, productDescription.general);
    }
  }

  appendDescriptionElement(description, propertyName, label) {
    if (propertyName) {
      const element = document.createElement('p');
      element.innerHTML = `<span class='accent'>${label}: </span>${propertyName}`;
      description.appendChild(element);
    }
  }

  appendTitle(description, title) {
    if (title) {
      const p = document.createElement('p');

      if (title.length > 1) {
        p.innerHTML = ` <span class='accent'>${title[0]}</span> ${title[1]}`;
      } else {
        console.log('ssss');
        p.classList.add('accent');
        p.innerText = title;
      }

      description.appendChild(p);
    }
  }

  appendAdvantages(description, advantages) {
    if (advantages) {
      console.log(advantages.length);
      const advantagesElement = document.createElement('p');
      advantagesElement.innerHTML = `<span class='accent'>Переваги: </span>${advantages} `;
      description.appendChild(advantagesElement);
    }
  }

  appendText(description, textList) {
    if (textList) {
      textList.forEach((text) => {
        const textElement = document.createElement('p');
        textElement.textContent = text;
        description.appendChild(textElement);
      });
    }
  }

  appendCharacteristics(description, characteristics, label) {
    if (characteristics) {
      const p = document.createElement('p');
      p.classList.add('accent');
      p.innerText = `${label}:`;
      description.appendChild(p);

      const characteristicsList = document.createElement('ul');

      characteristics.forEach((item) => {
        const characteristicItem = document.createElement('li');
        characteristicItem.innerHTML = `<p><span class='accent'>${item.name}: </span>${item.value}</p>`;

        characteristicsList.appendChild(characteristicItem);
      });

      description.appendChild(characteristicsList);
    }
  }

  appendTable(description, info) {
    if (info) {
      const headers = ["Формат - Об'єм", 'Діаметр верхній', 'Діаметр нижній', 'Вага'];
      const table = document.createElement('table');
      const tr = document.createElement('tr');

      headers.forEach((header) => {
        const th = document.createElement('th');

        th.innerText = header;
        tr.appendChild(th);
      });
      table.appendChild(tr);

      console.log(info);
      info.forEach((item) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
          <td>${item.format}</td>
          <td>${item.diameterTop}</td>
          <td>${item.diameterBottom}</td>
          <td>${item.weight}</td>
        `;
        table.appendChild(tr);
      });

      description.appendChild(table);
    }
  }

  removeSize() {
    const sizeList = document.querySelector('.modal__size-list');
    if (sizeList) {
      sizeList.remove();
    }
  }

  removeDescription() {
    if (this.description) {
      this.description.remove();
    }
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
