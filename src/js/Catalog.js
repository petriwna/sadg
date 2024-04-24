import {Modal} from "./Modal";

export class Catalog {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.btnDetails = document.querySelectorAll('.details')
        this.modal = new Modal('.backdrop', '.modal-btn-close');
        this.addClickListeners()
    }

    addClickListeners() {
        this.cards.forEach(card => {
            card.addEventListener('click', event => this.handleCardClick(event));
        });

        this.btnDetails.forEach(btn => {
            btn.addEventListener('click', event => this.handleClickDetails(event))
        })
    }

    handleCardClick(event) {
        const card = event.currentTarget;
        const id = card.dataset.id;
        const category = card.dataset.category;

        this.modal.toggle();
    }

    handleClickDetails(event) {
        event.stopPropagation();
        this.modal.toggle();
    }

    handleClickBuy() {

    }
}
