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
        this.openModal(event);
    }

    openModal(event){
        const card = event.currentTarget;
        this.modal.toggle(card);
    }

    handleClickDetails(event) {
        event.stopPropagation();
        this.openModal(event);
    }

    handleClickBuy() {

    }
}
