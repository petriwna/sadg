export class Modal {
  constructor(backdropSelector, closeBtnSelector) {
    this.backdrop = document.querySelector(backdropSelector);
    this.closeBtn = document.querySelector(closeBtnSelector);

    this.modalContent = document.querySelector('.modal');
    this.modalContent.addEventListener('click', (event) => this.handleModalClick(event));

    this.closeBtn.addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', (event) => this.handleClickOutside(event));
  }

  open() {
    this.backdrop.classList.remove('is-hidden');
    document.body.classList.add('is-scroll-disable');
  }

  close() {
    this.backdrop.classList.add('is-hidden');
    document.body.classList.remove('is-scroll-disable');
  }

  handleClickOutside(event) {
    if (event.target === this.backdrop) {
      this.close();
    }
  }

  handleModalClick(event) {
    event.stopPropagation();
  }
}
