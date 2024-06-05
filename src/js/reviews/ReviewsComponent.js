import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export class ReviewsComponent {
  constructor() {
    this.initSlider();
  }

  initSlider() {
    // eslint-disable-next-line no-undef
    const slider = new Splide('#reviews-slider', {
      type: 'loop',
      drag: 'free',
      focus: 'center',
      perPage: 3,
      autoScroll: {
        speed: 1,
      },
      autoWidth: true,
      gap: 20,
      padding: '10px',
      classes: {
        pagination: 'splide__pagination pagination',
        page: 'splide__pagination__page pagination__button',
        arrows: 'splide__arrows gallery__arrows',
        arrow: 'splide__arrow gallery__arrow',
        prev: 'splide__arrow--prev gallery__prev',
        next: 'splide__arrow--next gallery__next',
      },
    });

    slider.mount({ AutoScroll });
  }
}
