export class Modal {
  constructor(backdropSelector, closeBtnSelector) {
    this.backdrop = document.querySelector(backdropSelector);
    this.closeBtn = document.querySelector(closeBtnSelector);
    this.closeBtn.addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', (event) => this.handleClickOutside(event));
  }

  open() {
    this.backdrop.classList.remove('is-hidden');
  }

  close() {
    this.backdrop.classList.add('is-hidden');
  }

  handleClickOutside(event) {
    if (event.target === this.backdrop) {
      this.close();
    }
  }
}
