export class Basket {
  constructor() {
    this.counterFab = document.getElementById('basket-count');
    this.basketFab = document.querySelector('#basket');

    this.counter = 0;
    this.basket = [];
  }

  addProductToBasket(img, name, strCode, price, size, quantity) {
    this.basketFab.style.display = 'flex';
    this.counter = this.counter + quantity;
    this.counterFab.innerText = this.counter;

    const cost = parseFloat(price.replace(/\D/g, ''));
    const code = strCode.match(/[a-zA-Z0-9-]+/)[0];

    const existingProductIndex = this.basket.findIndex((product) => product.code === code && product.size === size);

    if (existingProductIndex !== -1) {
      this.basket[existingProductIndex].quantity += quantity;
    } else {
      this.basket.push({ img, name, code, cost, size, quantity });
    }

    this.renderBasket();
  }

  renderBasket() {
    const basketList = document.querySelector('.basket');
    basketList.innerHTML = '';

    this.basket.map((product) => {
      const productItem = document.createElement('article');
      productItem.classList.add('basket__item');
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
                 value='${product.quantity}'>
            <button class='basket__plus-minus plus' type='button'>+</button>
          </div>
          <div>
            <p class='basket__price'>${product.cost * product.quantity} грн.</p>
          </div>
          <button class='basket__delete' id='delete' type='button'>
            <svg width='30' height='30'>
              <use href='public/images/icons.svg#icon-close'></use>
            </svg>
          </button>
        </div>
      `;
      basketList.appendChild(productItem);
    });
  }
}
