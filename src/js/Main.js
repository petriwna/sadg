import { AdvantagesComponent } from './advantages/AdvantagesComponent';
import { Catalog } from './catalog/Catalog';
import { SplideComponent } from './catalog/SplideComponent';
import { DeliverySection } from './dlivery/DeliverySection';
import { FeaturesComponent } from './feature/FeaturesComponent';
import { FormHandler } from './FormHandler';
import { MobileMenu } from './modal/MobileMenu';
import { ReviewsComponent } from './reviews/ReviewsComponent';
// import { Video } from './Video';

export class Main {
  constructor() {
    this.slide = new SplideComponent();
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
    new ReviewsComponent();
  }

  initMobileMenu() {
    this.mobileMenu.addListener();
  }

  initCatalog() {
    new Catalog();
  }

  initSwiper() {
    this.slide.init();
  }

  initForm() {
    const form = document.querySelector('.contacts__form');
    new FormHandler(form);
  }

  // initVideo() {
  //   new Video();
  // }

  initProperty() {
    new FeaturesComponent();
  }

  initDeliverySection() {
    new DeliverySection();
  }
}
