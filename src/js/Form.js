import { addClassToElement, removeClassFromElement } from './utils';

export class Form {
  constructor(form) {
    this.form = form;

    this.inputs = this.form.querySelectorAll('input');
    this.btnSubmit = this.form.querySelector('button');
    this.error = this.form.querySelector('.error');

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.inputs.forEach((input) => {
      input.addEventListener('input', (event) => this.handleInput(event));
    });

    this.btnSubmit.addEventListener('click', (event) => this.handleSubmit(event));
  }

  handleInput(event) {
    if (event.target.type === 'tel') {
      this.formatPhoneNumber(event.target.value, event);
    }
  }

  formatPhoneNumber(phoneNumber, event) {
    if (event.target.value === '+') {
      event.target.value = '';
    } else if (phoneNumber.length === 1 || event.target.value === '+') {
      event.target.value = `+${phoneNumber}`;
    } else if (
      phoneNumber.length === 3 ||
      phoneNumber.length === 7 ||
      phoneNumber.length === 11 ||
      phoneNumber.length === 14
    ) {
      event.target.value = phoneNumber + ' ';
    } else if (phoneNumber.length > 17) {
      event.target.value = phoneNumber.slice(0, 17);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const isError = this.validateInputs();

    if (!isError) {
      this.inputs.forEach((input) => {
        console.log(input.value);
      });
    }
  }

  validateInputs() {
    let isError = false;

    this.inputs.forEach((input) => {
      if (!this.isEmpty(input.value)) {
        this.handleInputError(input, 'Заповніть всі поля!');
        isError = true;
      } else if (input.type === 'tel') {
        if (!this.isValidationNumber(input.value)) {
          this.handleInputError(input, 'Введіть дійсний номер телефону у форматі +380XXXXXXXXX');

          isError = true;
        }
      } else if (input.id === 'contact-name') {
        if (!this.isValidationName(input.value)) {
          this.handleInputError(input, "Ім'я недійсне!");
          isError = true;
        }
      } else {
        isError = false;
      }
    });
    return isError;
  }

  isValidationNumber(phoneNumber) {
    const phoneRegex = /^\+380\d{9}$/;

    return phoneRegex.test(phoneNumber.trim());
  }

  isValidationName(name) {
    return name.length >= 3;
  }

  handleInputError(input, message) {
    const inputId = input.getAttribute('id');

    addClassToElement(inputId, 'bounce');
    this.error.innerText = message;

    setTimeout(() => {
      removeClassFromElement(inputId, 'bounce');
      this.error.innerText = '';
    }, 1100);
  }

  isEmpty(value) {
    return !!value;
  }
}
