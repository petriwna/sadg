import { fromEvent } from 'rxjs';

import { SplideComponent } from './SplideComponent';
import { Basket } from '../basket/Basket';
// import { BasketModal } from '../modal/BasketModal';
// import { ProductModal } from '../modal/ProductModal';
import { ProductService } from '../service/ProductService';

export class Catalog {
  constructor() {
    this.productService = new ProductService();

    this.containers = document.querySelectorAll('.catalog__list');

    this.initialize();

    this.basket = new Basket();
    // this.basketModal = new BasketModal(this.basket);
    // this.productModal = new ProductModal(this.basket, this.basketModal);
  }

  async initialize() {
    await this.getProductsList();
  }

  async getProductsList() {
    const promises = Array.from(this.containers).map(async (container) => {
      const category = container.dataset.category;
      const productList = await this.productService.getProductList(category);
      this.renderProducts(container, productList);
      this.addClickListeners(container);
    });
    await Promise.all(promises);
  }

  renderProducts(container, productList) {
    container.innerHTML = '';
    productList.forEach((product) => {
      const productElement = this.createProductElement(product);
      container.appendChild(productElement);
    });

    new SplideComponent(container.parentNode);
  }

  createProductElement(product) {
    const newCost = this.formatPrice(product.sizeList[0].newCost);
    const oldCost = product.sizeList[0].oldCost
      ? `${this.formatPrice(product.sizeList[0].oldCost)} грн.`
      : '';
    const li = document.createElement('li');
    li.classList.add('splide__slide');
    li.setAttribute('data-id', product.id);

    const card = document.createElement('article');
    card.classList.add('card');

    card.innerHTML = `
      <img class='card__image' src=${product.imgsUrl[0]} alt='${product.alt}'/>
      <div class='card__container'>
        <h4 class='card__title'>${product.name}</h4>
        <div class='card__price-container price'>
          <p class='price__new'>${newCost} грн.</p>
          <p class='price__old'>${oldCost}</p>
        </div>
        <div class='card__buttons'>
          <button type='button' class='button card__button-detail details' value='Деталі'>Деталі</button>
          <button type='button' class='button card__button-buy buy' value='Замовити'>Замовити</button>
        </div>
      </div>`;

    li.appendChild(card);

    return li;
  }

  formatPrice(num) {
    const numStr = num.toString();
    if (numStr.length === 4) {
      return numStr.slice(0, 1) + ' ' + numStr.slice(1);
    }
    return numStr;
  }

  addClickListeners(container) {
    const cards = container.querySelectorAll('.card');
    const btnsDetails = container.querySelectorAll('.details');
    const btnsBuy = container.querySelectorAll('.card__button-buy');

    cards.forEach((card) => {
      fromEvent(card, 'click').subscribe((event) => this.handleCardClick(event));
    });

    btnsDetails.forEach((btn) => {
      fromEvent(btn, 'click').subscribe((event) => this.handleClickDetails(event));
    });

    btnsBuy.forEach((btn) => {
      fromEvent(btn, 'click').subscribe((event) => this.handleClickBuy(event));
    });
  }

  handleCardClick(event) {
    // const card = event.currentTarget.closest('.card');
    // this.productModal.openWithProduct(card);
    console.log('card');
  }

  handleClickDetails(event) {
    event.stopPropagation();
    // const card = event.currentTarget.closest('.card');
    // if (card) {
    //   this.productModal.openWithProduct(card);
    // }

    console.log('detail');
  }

  handleClickBuy(event) {
    console.log('buy');

    event.stopPropagation();
    // const card = event.currentTarget.closest('.card');
    // const img = card.querySelector('.card__image').getAttribute('src');
    // const name = card.querySelector('.card__title').textContent;
    // const code = card.querySelector('.card__code').textContent;
    // const price = card.querySelector('.price__new').textContent;
    // const sizeList = card.querySelectorAll('.card__size');
    // let size = null;
    //
    // if (sizeList.length !== 0) {
    //   size = sizeList[0].textContent;
    // }
    //
    // if (card) {
    //   this.basketModal.openWithBasket(img, name, code, price, size, 1);
    // }
  }
}
