export class InputValidator {
  static isPhoneNumber(phoneNumber) {
    const phoneRegex = /^\+380\d{9}$/;
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
  }

  static isNameValid(name) {
    const nameRegex = /^[А-ЯЁҐЄІЇA-Z][а-яёґєіїa-z\s-]{2,}$/u;
    return nameRegex.test(name);
  }

  static isEmpty(value) {
    return !!value;
  }
}
