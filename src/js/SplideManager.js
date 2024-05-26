export class SplideManager {
  initSlide(container, thumbnailsContainer) {
    // eslint-disable-next-line no-undef
    const splide = new Splide(container, {
      type: 'fade',
      rewind: true,
      pagination: false,
      arrows: true,
    });

    // eslint-disable-next-line no-undef
    const thumbnails = new Splide(thumbnailsContainer, {
      fixedWidth: 100,
      // fixedHeight: 100,
      gap: 10,
      rewind: true,
      pagination: false,
      isNavigation: true,
      breakpoints: {
        600: {
          fixedWidth: 60,
          fixedHeight: 60,
        },
      },
    });

    splide.sync(thumbnails);
    splide.mount();
    thumbnails.mount();
  }
}
