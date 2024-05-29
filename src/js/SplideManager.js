export class SplideManager {
  initSlide(container, thumbnailsContainer) {
    // eslint-disable-next-line no-undef
    const splide = new Splide(container, {
      type: 'fade',
      rewind: true,
      pagination: false,
      arrows: true,
      classes: {
        arrows: 'splide__arrows gallery__arrows',
        arrow: 'splide__arrow gallery__arrow',
        prev: 'splide__arrow--prev gallery__prev',
        next: 'splide__arrow--next gallery__next',
      },
    });

    // eslint-disable-next-line no-undef
    const thumbnails = new Splide(thumbnailsContainer, {
      fixedWidth: 100,
      gap: 10,
      rewind: true,
      pagination: false,
      isNavigation: true,
      arrows: false,
      breakpoints: {
        600: {
          fixedWidth: 60,
          // fixedHeight: 60,
        },
      },
    });

    splide.sync(thumbnails);
    splide.mount();
    thumbnails.mount();
  }
}
