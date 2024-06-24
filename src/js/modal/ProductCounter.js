import { fromEvent } from 'rxjs';

export class ProductCounter {
  constructor() {
    this.counterInput = document.getElementById('order-counter');
    this.incrementBtn = document.querySelector('.product-plus');
    this.decrementBtn = document.querySelector('.product-minus');

    this.counterInputValue = 1;
  }

  setupEventListeners() {
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

    fromEvent(this.incrementBtn, 'click').subscribe(() => this.incrementCounter());
    fromEvent(this.decrementBtn, 'click').subscribe(() => this.decrementCounter());
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

  incrementCounter() {
    this.counterInputValue = Math.min(this.counterInputValue + 1, 999);
    this.counterInput.value = this.counterInputValue;
  }

  decrementCounter() {
    this.counterInputValue = Math.max(this.counterInputValue - 1, 1);
    this.counterInput.value = this.counterInputValue;
  }

  resetCounter() {
    this.counterInput.value = 1;
    this.counterInputValue = 1;
  }
}
