export class SizeList {
  constructor(modalCodeElement, modalPriceElement, onSizeChange) {
    this.modalCodeElement = modalCodeElement;
    this.modalPriceElement = modalPriceElement;
    this.onSizeChange = onSizeChange;
  }

  render(sizeList) {
    this.remove();

    const sizeContainer = this.createSizeListElement(sizeList);
    document.querySelector('.modal__description').appendChild(sizeContainer);
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
        this.handleSizeChange(event);
      }
    });

    return sizeContainer;
  }

  createSizeItemElement(size, index) {
    const sizeItem = document.createElement('div');
    sizeItem.classList.add('modal__size-item');

    const sizeListItem = document.createElement('input');
    sizeListItem.type = 'radio';
    sizeListItem.dataset.code = size.code;
    sizeListItem.id = size.code;
    sizeListItem.dataset.newCost = size.newCost;

    if (size.oldCost) {
      sizeListItem.dataset.oldCost = size.oldCost;
    }

    sizeListItem.value = size.name;
    sizeListItem.name = 'size';

    const label = document.createElement('label');
    label.setAttribute('for', size.code);
    label.classList.add('modal__size-item--label');
    label.innerText = size.name;

    sizeItem.appendChild(sizeListItem);
    sizeItem.appendChild(label);

    if (index === 0) {
      sizeListItem.checked = true;
    }

    return sizeItem;
  }

  handleSizeChange(event) {
    if (event.target.type === 'radio') {
      const selectedValue = event.target;

      this.modalCodeElement.textContent = selectedValue.dataset.code;

      this.modalPriceElement.innerHTML = `
        <p class="price__new">${selectedValue.dataset.newCost} грн</p>
        ${selectedValue.dataset.oldCost ? `<p class="price__old">${selectedValue.dataset.oldCost} грн</p>` : ''}
      `;

      this.onSizeChange({
        code: selectedValue.dataset.code,
        newCost: selectedValue.dataset.newCost,
        oldCost: selectedValue.dataset.oldCost,
        name: selectedValue.value,
      });
    }
  }

  remove() {
    const sizeList = document.querySelector('.modal__size-list');
    if (sizeList) {
      sizeList.remove();
    }
  }
}
