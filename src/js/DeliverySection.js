export class DeliverySection {
  constructor() {
    this.containerDelivery = document.getElementById('delivery-slider');
    this.initSplide(this.containerDelivery);
  }

  initSplide(container) {
    // eslint-disable-next-line no-undef
    new Splide(container, {
      arrows: false,
      perPage: 4,
      classes: {
        pagination: 'splide__pagination pagination',
        page: 'splide__pagination__page pagination__button',
      },
      breakpoints: {
        992: {
          fixedWidth: 300,
        },
        768: {
          fixedWidth: 0,
          perPage: 2,
          perMove: 2,
        },
        600: {
          perPage: 1,
        },
      },
    }).mount();
  }
}
