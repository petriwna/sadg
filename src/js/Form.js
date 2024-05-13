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
      input.addEventListener('input', (event) => this.handleInputTel(event));
    });

    this.btnSubmit.addEventListener('click', (event) => this.handleSubmit(event));
  }

  handleInputTel(event) {
    if (event.target.type === 'tel') {
      this.formatPhoneNumber(event);
      const cursorPos = event.target.selectionStart;
      const formatInput = this.formatPhoneNumber(event.target);
      event.target.value = String(formatInput);
      const isBackspace = event?.data === null;
      const nextCusPos = this.nextDigit(formatInput, cursorPos, isBackspace);

      event.target.setSelectionRange(nextCusPos + 1, nextCusPos + 1);
    }
  }

  nextDigit(input, cursorPos, isBackspace) {
    if (isBackspace) {
      for (let i = cursorPos - 1; i > 0; i--) {
        if (/\d/.test(input[i])) {
          return i;
        }
      }
    } else {
      for (let i = cursorPos - 1; i < input.length; i++) {
        if (/\d/.test(input[i])) {
          return i;
        }
      }
    }

    return cursorPos;
  }

  formatPhoneNumber(ref) {
    try {
      const phoneNumberString = ref.value;
      const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
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
    } catch (err) {
      return '';
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
          this.handleInputError(input, 'Будь ласка введіть дійсний номер телефону!');

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

    return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
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
