import '../scss/main.scss';

import Swiper from 'swiper/bundle';

import { Catalog } from './Catalog';
import { MobileMenu } from './MobileMenu';
import { toggleBtn } from './utils';

export function init() {
  new MobileMenu().addListener();

  const moveTopBtn = document.getElementById('up');

  moveTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('load', () => toggleBtn(moveTopBtn));
  window.addEventListener('scroll', () => toggleBtn(moveTopBtn));

  new Catalog();
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

document.addEventListener('DOMContentLoaded', init);
