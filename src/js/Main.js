import { AdvantagesComponent } from './advantages/AdvantagesComponent';
import { Catalog } from './catalog/Catalog';
import { DeliverySection } from './dlivery/DeliverySection';
import { FormHandler } from './form/FormHandler';
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

  initDeliverySection() {
    new DeliverySection();
  }
}
