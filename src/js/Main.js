import { Catalog } from './Catalog';
import { Form } from './Form';
import { MobileMenu } from './MobileMenu';
import { SwiperComponent } from './SwiperComponent';
import { Video } from './Video';

export class Main {
  constructor() {
    this.swiper = new SwiperComponent();
    this.mobileMenu = new MobileMenu();

    this.init();
  }

  init() {
    this.initMobileMenu();
    this.initCatalog();
    this.initSwiper();
    this.initForm();
    this.initVideo();
  }

  initMobileMenu() {
    this.mobileMenu.addListener();
  }

  initCatalog() {
    new Catalog();
  }

  initSwiper() {
    this.swiper.init();
  }

  initForm() {
    const form = document.querySelector('.contacts__form');
    new Form(form);
  }

  initVideo() {
    new Video();
  }
}
