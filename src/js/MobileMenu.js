import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';

export class MobileMenu {
  constructor() {
    this.menu = document.querySelector('.mobile-menu');
    this.menuBtnOpen = document.querySelector('.menu-btn-open');
    this.menuBtnClose = document.querySelector('.menu-btn-close');
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
  }
}
