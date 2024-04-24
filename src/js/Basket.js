import {Modal} from "./Modal";

export class Basket {

    constructor() {
        this.basketFab = document.querySelector('#basket')
        this.countBasket = document.querySelector('#basket-count');
        this.modal = new Modal();
        this.basket = {}
        this.addClickListeners();
    }

    addClickListeners() {
        this.basketFab.addEventListener('click', () => this.handleClickFab())
    }

    handleClickFab(){
        this.modal.openModalBasket();
    }

    addProduct(card) {
        // const productName = card.querySelector('.card__title').textContent;
        console.log(card)
        this.basketFab.style.display = 'flex';
        // this.basket[productName] = 1;
        // console.log(this.basket)

        this.count = this.basket.length;
        this.countBasket.textContent = this.count;
    }
}
