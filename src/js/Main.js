import { AdvantagesComponent } from './advantages/AdvantagesComponent';
import { Catalog } from './catalog/Catalog';
import { SplideComponent } from './catalog/SplideComponent';
import { DeliverySection } from './dlivery/DeliverySection';
import { FeaturesComponent } from './feature/FeaturesComponent';
import { analytics, app } from './Firebase';
import { FormHandler } from './FormHandler';
import { MobileMenu } from './modal/MobileMenu';
import { ReviewsComponent } from './reviews/ReviewsComponent';

export class Main {
  constructor() {
    this.slide = new SplideComponent();
    this.mobileMenu = new MobileMenu();

    this.init();
  }

  init() {
    console.log('Firebase App:', app);
    console.log('Firebase Analytics:', analytics);

    this.initMobileMenu();
    this.initCatalog();
    this.initSwiper();
    this.initForm();
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

  initProperty() {
    new FeaturesComponent();
  }

  initDeliverySection() {
    new DeliverySection();
  }
}
