export class Basket {
  constructor() {
    this.basketFab = document.querySelector('#basket');

    this.basket = [];
  }

  addProductToBasket(img, name, code, price, size, quantity, gift) {
    this.basketFab.style.display = 'flex';

    const existingProductIndex = this.basket.findIndex((product) => product.code === code);

    if (existingProductIndex !== -1) {
      this.basket[existingProductIndex].quantity += quantity;
    } else {
      this.basket.push({ img, name, code, price, size, quantity, gift });
    }
  }

  renderBasket() {
    const basketList = document.querySelector('.basket');
    basketList.innerHTML = '';

    this.basket.map((product) => {
      const productItem = document.createElement('article');
      productItem.classList.add('basket__product');

      productItem.innerHTML = `
        <div class='basket__item'>
          <div class='basket__info'>
            <div class='basket__description'>
              <img class='basket__img' src='${product.img}' alt='${product.name}'>
              <div class='basket__text'>
              <h3 class='basket__name'>${product.name}</h3>
                ${product.size ? `<p class='basket__options'>${product.size}</p>` : ''}
                <p class='basket__options'>${product.code}</p>
              </div>
            </div>
            <div class='basket__settings'>
              <div class='basket__counter'>
                <button class='basket__plus-minus basket-minus' type='button'>-</button>
                <label for='order-counter' class='visually-hidden'></label>
                <input type='number' name='order-counter' class='basket__value' min='1' step='1' size='4' max='999' maxlength='3'
                  value='${product.quantity}'>
                <button class='basket__plus-minus basket-plus' type='button'>+</button>
              </div>
              <div>
                <p class='basket__price'></p>
              </div>
            </div>
          </div>
          <button class='basket__delete' id='delete' type='button'>
            <svg width='30' height='30'>
              <use href='public/images/icons.svg#icon-close'></use>
            </svg>
          </button>
        </div>
      `;
      if (product.gift) {
        product.gift.forEach((gift) => {
          productItem.appendChild(this.renderGiftBasket(gift, product.quantity));
        });
      }

      basketList.appendChild(productItem);
    });
  }

  renderGiftBasket(gift, quantity) {
    const giftEl = document.createElement('div');
    giftEl.classList.add('basket__gift-card', 'gift-card');

    giftEl.innerHTML = `
      <div class='gift-card__info'>
        <div class='gift-card__description'>
          <img class='gift-card__img' src='${gift.imgsUrl[0]}' alt='${gift.name}'>
          <div class='gift-card__text'>
            <h3 class='gift-card__name margin'>${gift.name}</h3>
            <p class='gift-card__quantity margin'>Кількість (шт): <span id='gift-quantity'>${quantity}</span></p>
          </div>
        </div>           
        <div>
          <p class='accent'>Безкоштовно</p>
        </div>
      </div>
    `;

    return giftEl;
  }

  getSumProduct(index) {
    return this.basket[index].price * this.basket[index].quantity;
  }

  getSumBasket() {
    let sum = 0;
    this.basket.forEach((product) => {
      const oneSum = product.price * product.quantity;
      sum += oneSum;
    });
    return sum;
  }

  changeQuantity(index, newQuantity) {
    if (newQuantity >= 1) {
      this.basket[index].quantity = newQuantity;
    } else {
      this.basket[index].quantity = 1;
    }
  }

  getQuantity() {
    let counter = 0;
    this.basket.forEach((product) => {
      counter += product.quantity;
    });

    return counter;
  }

  getBasket() {
    return this.basket;
  }

  clearBasket() {
    this.basketFab.style.display = 'none';

    this.basket = [];
  }

  deleteProduct(index) {
    this.basket.splice(index, 1);
  }
}
