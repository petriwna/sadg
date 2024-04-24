import {Modal} from "./Modal";
import {Basket} from "./Basket";

export class Catalog {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.btnDetails = document.querySelectorAll('.details');
        this.btnBuy = document.querySelectorAll('.card__button-buy')
        this.modal = new Modal();
        this.basket = new Basket();
        this.addClickListeners()
    }

    addClickListeners() {
        this.cards.forEach(card => {
            card.addEventListener('click', event => this.handleCardClick(event));
        });

        this.btnDetails.forEach(btn => {
            btn.addEventListener('click', event => this.handleClickDetails(event));
        });

        this.btnBuy.forEach(btn => {
            btn.addEventListener('click', event => this.handleClickBuy(event));
        });
    }

    handleCardClick(event) {
        const card = event.currentTarget.closest('.card');
        this.modal.openModalProduct(card);
    }

    openModal(card, event){
        this.modal.openModal(card, event);
    }

    handleClickDetails(event) {
        event.stopPropagation();
        const card = event.currentTarget.closest('.card');
        if (card) {
            this.openModal(card, event);
        }
    }

    handleClickBuy(event) {
        event.stopPropagation();
        const card = event.currentTarget.closest('.card');
        this.openModal(card, event);
        if (card) {
            this.basket.addProduct(card);
        }
    }
}
