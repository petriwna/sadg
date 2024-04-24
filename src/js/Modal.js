export class Modal {
    constructor(backdropSelector, closeBtnSelector) {
        this.backdrop = document.querySelector(backdropSelector);
        this.modalBtnClose = document.querySelector(closeBtnSelector);
        this.handleClickClose();
    }

    toggle() {
        this.backdrop.classList.toggle('is-hidden');
    }

    handleClickClose() {
        this.modalBtnClose.addEventListener('click', () => this.toggle());

        this.backdrop.addEventListener('click', event => {
            if (event.target === this.backdrop) {
                this.toggle();
            }
        });
    }
}
