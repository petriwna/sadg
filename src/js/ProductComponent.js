import { fromEvent } from 'rxjs';

export class ProductComponent {
  constructor() {
    this.modalTitle = document.querySelector('.modal__title');
    this.modalCode = document.querySelector('.modal__code');
    this.modalPrice = document.querySelector('.modal__price');
    this.modalDescription = document.querySelector('.modal__description');
    this.modalImg = null;
    this.gallery = document.querySelector('.gallery');
    this.price = document.querySelector('.price__new').textContent;
    this.size = 0;
    this.counterInput = document.getElementById('order-counter');
    this.incrementBtn = document.querySelector('.product-plus');
    this.decrementBtn = document.querySelector('.product-minus');
    this.orderBtn = document.getElementById('order-modal');
    this.slideIndex = 1;
    this.nextBtn = this.gallery.querySelector('.gallery__next');
    this.prevBtn = this.gallery.querySelector('.gallery__prev');

    this.counterInputValue = 1;
  }

  setupEventListeners(handleClickOrderBtn, incrementCounter, decrementCounter) {
    this.orderBtn.addEventListener('click', handleClickOrderBtn.bind(this));

    this.counterInput.addEventListener('blur', () => {
      if (this.counterInput.value.trim() === '' || this.counterInput.value.trim() === '0') {
        this.counterInput.value = '1';
      }
    });

    this.counterInput.addEventListener('input', () => {
      if (this.counterInput.value.length > 3) {
        this.counterInput.value = this.counterInput.value.slice(0, 3);
      }
      this.handleInputValue(parseInt(this.counterInput.value));
      this.counterInputValue = parseInt(this.counterInput.value);
    });

    fromEvent(this.incrementBtn, 'click').subscribe(() => incrementCounter());
    fromEvent(this.decrementBtn, 'click').subscribe(() => decrementCounter());

    this.prevBtn.addEventListener('click', () => this.nextSlides(-1));
    this.nextBtn.addEventListener('click', () => this.nextSlides(1));
  }

  handleInputValue(value) {
    if (value === '' || value < 1) {
      this.counterInput.value = 1;
      this.counterInputValue = 1;
    } else if (value > 999) {
      this.counterInput.value = 999;
      this.counterInputValue = 999;
    }
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
    this.renderGallery(product);
  }

  renderGallery(product) {
    const gallery = document.querySelector('.gallery');

    const demo = document.createElement('div');
    demo.classList.add('gallery__row');

    product.info[0].images.forEach((url) => {
      const slides = document.createElement('div');
      slides.classList.add('gallery__slides');

      const image = document.createElement('img');
      image.setAttribute('src', `${url}`);
      image.setAttribute('alt', `${product.title}`);
      image.setAttribute('loading', 'lazy');

      slides.appendChild(image);
      gallery.appendChild(slides);
    });

    product.info[0].images.forEach((url) => {
      const columnDemo = document.createElement('div');
      columnDemo.classList.add('gallery__column');

      const image = document.createElement('img');
      image.setAttribute('src', `${url}`);
      image.setAttribute('alt', `${product.title}`);
      image.setAttribute('loading', 'lazy');
      image.classList.add('gallery__demo');

      columnDemo.appendChild(image);

      demo.appendChild(columnDemo);
    });

    gallery.appendChild(demo);
    this.modalImg = gallery.querySelectorAll('.gallery__demo')[0];
    this.showSlides(this.slideIndex);
    gallery.querySelectorAll('.gallery__demo').forEach((element, index) => {
      element.addEventListener('click', () => this.currentSlide(index + 1));
    });
  }

  showSlides(index) {
    let i;
    const slides = this.gallery.querySelectorAll('.gallery__slides');
    const dots = this.gallery.querySelectorAll('.gallery__demo');
    if (index > slides.length) {
      this.slideIndex = 1;
    }
    if (index < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' gallery__active', '');
    }
    slides[this.slideIndex - 1].style.display = 'block';
    dots[this.slideIndex - 1].className += ' gallery__active';
  }

  currentSlide(index) {
    this.showSlides((this.slideIndex = index));
  }

  nextSlides(index) {
    this.showSlides((this.slideIndex += index));
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

  removeGallery() {
    if (this.gallery) {
      this.gallery.querySelectorAll('.gallery__slides').forEach((item) => item.remove());
      this.gallery.querySelectorAll('.gallery__row').forEach((item) => item.remove());
    }
  }

  resetCounter() {
    this.counterInput.value = 1;
    this.counterInputValue = 1;
  }
}
