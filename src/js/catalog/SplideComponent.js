export class SplideComponent {
  constructor(container) {
    this.splideContainers = container.parentNode;

    this.init();
  }

  init() {
    // eslint-disable-next-line no-undef
    const splide = new Splide(this.splideContainers, {
      type: 'loop',
      arrows: false,
      gap: 8,
      perPage: 4,
      pagination: true,
      classes: {
        pagination: 'splide__pagination pagination',
        page: 'splide__pagination__page pagination__button',
      },
      breakpoints: {
        600: {
          perPage: 1,
        },
        768: {
          perPage: 2,
        },
        992: {
          perPage: 3,
        },
      },
    });

    splide.mount();
  }
}
