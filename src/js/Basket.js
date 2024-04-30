import { Modal } from './Modal';

export class Basket {
  constructor() {
    this.basketFab = document.querySelector('#basket');
    this.counterFab = document.getElementById('basket-count');
    this.counterInput = document.getElementById('order-counter');
    this.counterInputValue = Number(this.counterInput.value);
    this.incrementBtn = document.querySelector('.plus');
    this.decrementBtn = document.querySelector('.minus');
    this.modal = new Modal('#modal-basket', '#close-basket');

    this.counter = 0;
    this.basket = {};
    this.addClickListeners();
    this.addInputListener();
  }

  addClickListeners() {
    this.incrementBtn.addEventListener('click', () => {
      this.handleClickIncrement();
    });
    this.decrementBtn.addEventListener('click', () => {
      this.handleClickDecrement();
    });
    this.basketFab.addEventListener('click', () => this.handleClickFab());
  }

  handleClickFab() {
    this.modal.open();
  }

  addProductToBasket(card) {
    this.counter = this.counter + 1;
    this.counterFab.innerText = this.counter;
  }

  addInputListener() {
    this.counterInput.addEventListener('input', () => {
      const newValue = parseInt(this.counterInput.value);
      if (!isNaN(newValue) && newValue >= 1 && newValue <= 999) {
        this.counterInputValue = newValue;
      }
    });
  }

  handleClickIncrement() {
    if (this.counterInputValue < 999) {
      this.counterInputValue += 1;
      this.counterInput.value = this.counterInputValue;
    }
  }

  handleClickDecrement() {
    if (this.counterInputValue > 1) {
      this.counterInputValue -= 1;
      this.counterInput.value = this.counterInputValue;
    }
  }
}
