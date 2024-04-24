export class Modal {
    constructor(backdropSelector, closeBtnSelector) {
        this.backdrop = document.querySelector(backdropSelector);
        this.modalBtnClose = document.querySelector(closeBtnSelector);
        this.modalTitle = document.querySelector('.modal__title');
        this.modalCode = document.querySelector('.modal__code');
        this.handleClickClose();
    }

    toggle(card) {
        const isBackdropHidden = this.backdrop.classList.contains('is-hidden');

        this.backdrop.classList.toggle('is-hidden');

        if (isBackdropHidden) {
            this.getCategory(card)
            console.log(card.dataset.id);
        }
    }

    getCategory(card) {
        const cardTitle = card.querySelector('.card__title').textContent;
        const cardCode = card.querySelector('.card__code').textContent;
        this.modalTitle.textContent = cardTitle;
        this.modalCode.textContent = cardCode;
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
