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

  addProductToBasket(img, name, strCode, price, size, quantity) {
    this.modal.open();
    this.basketFab.style.display = 'flex';
    this.counter = this.counter + quantity;
    this.counterFab.innerText = this.counter;

    const cost = parseFloat(price.replace(/\D/g, ''));
    const code = strCode.match(/[a-zA-Z0-9-]+/)[0];

    this.basket.push({ img, name, code, cost, size, quantity });
    this.renderOrderInBasket();
  }

  renderOrderInBasket() {
    const basket = document.querySelector('.basket');
    const productItem = document.createElement('article');

    basket.appendChild(productItem);
    productItem.classList.add('basket__item');

    this.basket.map((product) => {
      productItem.innerHTML = `
        <div class='basket__description'>
           <div class='basket__img' style='background-image: url("${product.img}")'></div>
           <div class='basket__text'>
           <h3 class='basket__name'>${product.name}</h3>
           <p class='basket__options'>${product.code}</p>
           </div>
        </div>
        <div class='basket__settings'>
          <div class='basket__counter'>
            <button class='basket__plus-minus minus' type='button'>-</button>
            <label for='order-counter' class='visually-hidden'></label>
            <input type='number' name='order-counter' class='basket__value' min='1' step='1' size='4' max='999' maxlength='3'
                 value='1'>
            <button class='basket__plus-minus plus' type='button'>+</button>
          </div>
          <div>
            <p class='basket__price'>${product.cost} грн.</p>
          </div>
          <button class='basket__delete' id='delete' type='button'>
            <svg width='30' height='30'>
              <use href='public/images/icons.svg#icon-close'></use>
            </svg>
          </button>
        </div>
      `;
    });
  }
}
