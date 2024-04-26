import '../scss/main.scss';
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
    const catalog = new Catalog();
  }

  initSwiper() {
    const mySwiper = new Swiper('.swiper-container', {
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
      },
    });
  }
}
