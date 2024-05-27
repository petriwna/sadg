import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';

export class MobileMenu {
  constructor() {
    this.menu = document.querySelector('.mobile-menu');
    this.menuBtnOpen = document.querySelector('.menu-btn-open');
    this.menuBtnClose = document.querySelector('.menu-btn-close');
    this.body = document.querySelector('body');
  }

  toggleMenu() {
    this.menu.classList.toggle('is-open');
  }

  disableScroll() {
    document.body.classList.toggle('is-scroll-disable');
  }

  addListener() {
    const openMenu$ = fromEvent(this.menuBtnOpen, 'click').pipe(
      tap(() => {
        this.toggleMenu();
        this.disableScroll();
      }),
    );

    const closeMenu$ = fromEvent(this.menuBtnClose, 'click').pipe(
      tap(() => {
        this.toggleMenu();
        this.disableScroll();
      }),
    );

    openMenu$.subscribe();
    closeMenu$.subscribe();

    this.menuBtnOpen.addEventListener('click', this.handleClickInsideMenu.bind(this));
    this.body.addEventListener('click', this.handleClickOutsideMenu.bind(this));
  }

  handleClickInsideMenu(event) {
    event.stopPropagation();
  }

  handleClickOutsideMenu(event) {
    if (
      !this.menu.contains(event.target) &&
      event.target !== this.menuBtnOpen &&
      event.target !== this.menuBtnClose
    ) {
      if (this.menu.classList.contains('is-open')) {
        this.toggleMenu();
        this.disableScroll();
      }
    }
  }
}
