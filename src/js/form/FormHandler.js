import { InputValidator } from './InputValidator';
import { SelectComponent } from './SelectComponent';
import { AlertRenderer } from '../AlertRenderer';
import { addClassToElement, removeClassFromElement, sendError } from '../utils/utils';

export class FormHandler {
  constructor(form, modal) {
    this.form = form;
    this.modal = modal;

    this.selected = new SelectComponent();

    this.inputs = this.form.querySelectorAll('input');
    this.btnSubmit = this.form.querySelector('button');
    this.error = this.form.querySelector('.error');

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.inputs.forEach((input) => {
      input.addEventListener('input', () => this.handleInput(input));
    });

    this.btnSubmit.addEventListener('click', (event) => this.handleSubmit(event));
  }

  handleInput(input) {
    if (input.type === 'tel') {
      this.handleInputTel(input);
    }
  }

  handleInputTel(input) {
    input.value = this.formatPhoneNumber(input.value);

    this.moveCursor(input);
  }

  moveCursor(input) {
    const cursorPosition = input.selectionStart;
    input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
  }

  formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})?(\d{0,3})?(\d{0,2})?(\d{0,2})?(\d{0,3})?/);
    return [
      match[1] ? '+' : '',
      match[1],
      match[2] ? ' ' : '',
      match[2],
      match[3] ? ' ' : '',
      match[3],
      match[4] ? ' ' : '',
      match[4],
      match[5] ? ' ' : '',
      match[5],
    ].join('');
  }

  handleSubmit(event) {
    event.preventDefault();
    this.modal ? this.handleModalOrder() : this.handleNonModalOrder();
  }

  handleModalOrder() {
    const orderData = this.getOrderData();
    const basketText = this.getBasketText();
    const orderDataText = this.generateOrderDataText(orderData);
    const text = `${orderDataText}\n ${basketText}`;
    const isError = this.validateInputs();

    if (!isError) {
      this.sendMessageTelegram(text);
      this.modal.close();
      this.modal.clearBasket();
      this.clearForm();
    }
  }

  handleNonModalOrder() {
    const isError = this.validateInputs();

    const contactData = this.getContactData();

    const text = `Заявка на дзвінок!\n Ім'я: ${contactData.name},\n Телефон: ${contactData.phone}`;

    if (!isError) {
      this.sendMessageTelegram(text);
      this.clearForm();
    }
  }

  async sendMessageTelegram(text) {
    try {
      const response = await fetch(process.env.API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
          disable_notification: true,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      AlertRenderer.createAlert('ok', 'Дякуємо за вашу заявку!');
    } catch (error) {
      sendError(error, 'Заявка не відправлена!');
      AlertRenderer.createAlert('error', 'Заявка не відправлена! Спробуйте пізніше.');
    }
  }

  getOrderData() {
    return {
      firstName: this.inputs[0].value,
      name: this.inputs[1].value,
      phone: this.inputs[2].value,
      delivery: this.getSelectedRadioValue(),
      address: this.inputs[6].value,
      payment: this.getPaymentValue(),
    };
  }

  getPaymentValue() {
    return this.selected.selectedValue;
  }

  getContactData() {
    return {
      name: this.inputs[0].value,
      phone: this.inputs[1].value,
    };
  }

  getBasketText() {
    const basket = this.modal ? this.modal.basket.getBasket() : [];
    return basket
      .map((product, index) => {
        return `
        Товар ${index + 1}:
        Назва: ${product.name},
        Код товара: ${product.code},
        Розмір: ${product.size},
        Кількість: ${product.quantity},
        Сума за товар ${index + 1}: ${product.price * product.quantity} грн.
      `;
      })
      .join('');
  }

  getSelectedRadioValue() {
    const selectedRadio = this.form.querySelector('input[type="radio"]:checked');
    return selectedRadio ? selectedRadio.value : '';
  }

  generateOrderDataText(orderData) {
    return `
      Замовлення! 
      ${orderData.firstName} ${orderData.name},
      телефон: ${orderData.phone}, 
      спосіб доставки: ${orderData.delivery},
      адрес: ${orderData.address},
      спосіб оплати: ${orderData.payment}.
    `;
  }

  validateInputs() {
    let isError = false;

    this.inputs.forEach((input) => {
      if (!InputValidator.isEmpty(input.value)) {
        this.handleInputError(input, 'Заповніть всі поля!');
        isError = true;
      } else if (input.classList.contains('phone')) {
        if (!InputValidator.isPhoneNumber(input.value)) {
          this.handleInputError(input, 'Будь ласка введіть дійсний номер телефону!');
          isError = true;
        }
      } else if (input.classList.contains('first-name')) {
        if (!InputValidator.isNameValid(input.value)) {
          this.handleInputError(input, 'Введіть коректне призвіще!');
          isError = true;
        }
      } else if (input.classList.contains('name')) {
        if (!InputValidator.isNameValid(input.value)) {
          this.handleInputError(input, 'Введіть коректне ім’я!');
          isError = true;
        }
      }
    });

    return isError;
  }

  handleInputError(input, message) {
    const inputId = input.getAttribute('id');

    addClassToElement(inputId, 'bounce');
    this.error.innerText = message;

    setTimeout(() => {
      removeClassFromElement(inputId, 'bounce');
      this.error.innerText = '';
    }, 2000);
  }

  clearForm() {
    this.inputs.forEach((input) => {
      if (input.type === 'radio') {
        if (input.value === this.form.querySelector('input[type="radio"]:checked')) {
          input.checked = true;
        }
      } else {
        input.value = '';
      }
    });
  }
}
