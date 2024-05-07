import { Catalog } from './Catalog';
import { MobileMenu } from './MobileMenu';
import { SwiperComponent } from './SwiperComponent';

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
}
