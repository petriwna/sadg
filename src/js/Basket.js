import { Modal } from './Modal';

export class Basket {
  constructor() {
    this.basketFab = document.querySelector('#basket');
    this.counterFab = document.getElementById('basket-count');

    this.modal = new Modal('#modal-basket', '#close-basket');

    this.counter = 0;
    this.basket = [];
    this.addClickListeners();
  }

  addClickListeners() {
    this.basketFab.addEventListener('click', () => this.handleClickFab());
  }

  handleClickFab() {
    this.modal.open();
  }

  addProductToBasket(img, name, code, price, quantity) {
    this.modal.open();
    this.basketFab.style.display = 'flex';
    this.counter = this.counter + quantity;
    this.counterFab.innerText = this.counter;

    const cost = parseFloat(price.replace(/\D/g, ''));
    this.basket.push({ img, name, code, cost, quantity });
    this.renderOrderInBasket();
  }

  renderOrderInBasket() {
    const basket = document.querySelector('.basket');
    const productItem = document.createElement('article');

    basket.appendChild(productItem);
    productItem.classList.add('basket__item');

    this.basket.map((product) => {
      productItem.innerHTML = `
        <div class='basket__img' style='background-image: url("${product.img}")'></div>
        <div class='basket__description'>
           <h3 class='basket__name'>${product.name}</h3>
           <p class='basket__code'>${product.code}</p>
        </div>
      `;
    });
  }
}
