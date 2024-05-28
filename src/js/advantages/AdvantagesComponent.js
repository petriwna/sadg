import { Intersection } from '@splidejs/splide-extension-intersection';

export class AdvantagesComponent {
  constructor() {
    this.initSplide();
  }

  initSplide() {
    // eslint-disable-next-line no-undef
    const splide = new Splide('.splide', {
      type: 'loop',
      pagination: false,
      arrows: false,
      interval: 17000,
      pauseOnHover: false,
      pauseOnFocus: false,
      autoplay: 'pause',
      intersection: {
        inView: {
          autoplay: true,
        },
        outView: {
          autoplay: false,
        },
      },
      classes: {
        progress: 'splide__progress__bar advantages__progress',
      },
    });

    splide.on('mounted move', () => {
      const activeSlide = splide.Components.Elements.slides[splide.index];
      const videos = document.querySelectorAll('.splide__slide video');

      videos.forEach((video) => {
        video.pause();
        video.currentTime = 0;
      });

      const activeVideo = activeSlide.querySelector('video');
      if (activeVideo && splide.options.autoplay) {
        activeVideo.pause();
      }

      splide.on('autoplay:playing', () => {
        const activeSlide = splide.Components.Elements.slides[splide.index];
        const activeVideo = activeSlide.querySelector('video');
        if (activeVideo) {
          activeVideo.play();
        }
      });

      splide.on('autoplay:pause', () => {
        const activeSlide = splide.Components.Elements.slides[splide.index];
        const activeVideo = activeSlide.querySelector('video');
        if (activeVideo) {
          activeVideo.pause();
          activeVideo.currentTime = 0;
        }
      });
    });

    splide.mount({ Intersection });
  }
}
