export class Basket {
  constructor() {
    this.basketFab = document.querySelector('#basket');
    this.countBasket = document.querySelector('#basket-count');
    this.basket = {};
    this.addClickListeners();
  }

  addClickListeners() {
    this.basketFab.addEventListener('click', () => this.handleClickFab());
  }

  handleClickFab() {
    this.modal.openModalBasket();
  }

  addProductToBasket(card) {
    console.log(card);
    this.basketFab.style.display = 'flex';

    this.count = this.basket.length;
    this.countBasket.textContent = this.count;
  }
}
