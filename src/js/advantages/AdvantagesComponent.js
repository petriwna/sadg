import { Intersection } from '@splidejs/splide-extension-intersection';

export class AdvantagesComponent {
  constructor() {
    this.initSplide();
  }

  setupEventListeners(video) {
    const playPauseHandler = () => this.playPauseVideo(video);

    window.addEventListener('scroll', playPauseHandler);
    window.addEventListener('resize', playPauseHandler);

    video._playPauseHandler = playPauseHandler;
  }

  removeEventListeners(video) {
    if (video._playPauseHandler) {
      window.removeEventListener('scroll', video._playPauseHandler);
      window.removeEventListener('resize', video._playPauseHandler);
      delete video._playPauseHandler;
    }
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  playPauseVideo(video) {
    if (this.isElementInViewport(video)) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
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
        this.removeEventListeners(video);
      });

      const activeVideo = activeSlide.querySelector('video');
      if (activeVideo) {
        this.setupEventListeners(activeVideo);
        activeVideo.play();
      }
    });

    splide.mount({ Intersection });
  }
}
