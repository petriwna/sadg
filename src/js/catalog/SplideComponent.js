export class SplideComponent {
  constructor(container) {
    this.splideContainers = container.parentNode;

    this.init();
  }

  init() {
    const slides = this.splideContainers.querySelectorAll('.splide__slide');
    const shouldEnablePagination = slides.length > 4;
    const type = shouldEnablePagination ? 'loop' : 'slide';

    // eslint-disable-next-line no-undef
    const splide = new Splide(this.splideContainers, {
      type: type,
      arrows: false,
      gap: 8,
      perPage: 4,
      pagination: false,
      classes: {
        pagination: 'splide__pagination pagination',
        page: 'splide__pagination__page pagination__button',
      },
      breakpoints: {
        600: {
          perPage: 1,
          pagination: true,
        },
        768: {
          perPage: 2,
          pagination: true,
        },
        992: {
          perPage: 3,
          pagination: true,
        },
        1280: {
          perPage: 4,
          pagination: shouldEnablePagination,
        },
      },
    });

    splide.mount();
  }
}
