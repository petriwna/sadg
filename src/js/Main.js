import { AdvantagesComponent } from './advantages/AdvantagesComponent';
import { Catalog } from './catalog/Catalog';
import { SwiperComponent } from './catalog/SwiperComponent';
import { DeliverySection } from './dlivery/DeliverySection';
import { Property } from './feature/Property';
import { FormHandler } from './FormHandler';
import { MobileMenu } from './modal/MobileMenu';
// import { Video } from './Video';

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
    // this.initVideo();
    this.initDeliverySection();
    this.initProperty();
    new AdvantagesComponent();
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
    new FormHandler(form);
  }

  // initVideo() {
  //   new Video();
  // }

  initProperty() {
    new Property();
  }

  initDeliverySection() {
    new DeliverySection();
  }
}
