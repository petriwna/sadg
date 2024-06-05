export class SplideComponent {
  constructor() {
    this.splideContainers = document.querySelectorAll('.catalog__slider');
  }

  init() {
    this.splideContainers.forEach((container) => {
      const slides = container.querySelectorAll('.splide__slide');
      const shouldEnablePagination = slides.length > 4;
      const type = shouldEnablePagination ? 'loop' : 'slide';

      // eslint-disable-next-line no-undef
      new Splide(container, {
        type: type,
        arrows: false,
        gap: 8,
        perPage: 4,
        pagination: shouldEnablePagination,
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
      }).mount();
    });
  }
}
