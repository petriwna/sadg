export class MobileMenu {
  constructor() {
    this.menuBtnOpen = document.querySelector('.menu-btn-open');
    this.menuBtnClose = document.querySelector('.menu-btn-close');
  }

  toggleMenu() {
    document.querySelector('.mobile-menu').classList.toggle('is-open');
  }

  disableScroll() {
    document.body.classList.toggle('is-scroll-disable');
  }

  addListener() {
    this.menuBtnOpen.addEventListener('click', this.toggleMenu);
    this.menuBtnClose.addEventListener('click', this.toggleMenu);

    this.menuBtnOpen.addEventListener('click', this.disableScroll);
    this.menuBtnClose.addEventListener('click', this.disableScroll);
  }
}
