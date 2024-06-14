import { AdvantagesComponent } from './advantages/AdvantagesComponent';
import { Catalog } from './catalog/Catalog';
import { SplideComponent } from './catalog/SplideComponent';
import { DeliverySection } from './dlivery/DeliverySection';
import { FeaturesComponent } from './feature/FeaturesComponent';
import { FormHandler } from './FormHandler';
import { MobileMenu } from './modal/MobileMenu';
import { ReviewsComponent } from './reviews/ReviewsComponent';

export class Main {
  constructor() {
    this.mobileMenu = new MobileMenu();

    this.init();
  }

  init() {
    this.initMobileMenu();
    this.initCatalog();
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
