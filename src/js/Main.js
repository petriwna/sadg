import Swiper from 'swiper/bundle';

import { Catalog } from './Catalog';
import { MobileMenu } from './MobileMenu';

export class Main {
  constructor() {
    this.init();
  }

  init() {
    this.initMobileMenu();
    this.initCatalog();
    this.initSwiper();
  }

  initMobileMenu() {
    const mobileMenu = new MobileMenu();
    mobileMenu.addListener();
  }

  initCatalog() {
    new Catalog();
  }

  initSwiper() {
    const swiperContainers = document.querySelectorAll('.swiper-container');
    swiperContainers.forEach((container) => {
      const slides = container.querySelectorAll('.swiper-slide');
      const shouldEnablePagination = slides.length > 4;
      if (shouldEnablePagination) {
        const pagination = container.querySelector('.pagination');
        pagination.style.display = 'flex';
      }
    });

    new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      breakpoints: {
        600: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      },
      loop: true,
      pagination: {
        el: '.pagination',
        bulletClass: 'pagination__button',
        bulletActiveClass: 'pagination__button--active',
        clickable: true,
      },
    });
  }
}
