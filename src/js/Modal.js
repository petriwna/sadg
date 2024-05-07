import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';

export class Modal {
  constructor(backdropSelector, closeBtnSelector) {
    this.backdrop = document.querySelector(backdropSelector);
    this.closeBtn = document.querySelector(closeBtnSelector);

    this.setupEventListeners();
  }

  setupEventListeners() {
    fromEvent(this.closeBtn, 'click').subscribe(() => this.close());
    fromEvent(this.backdrop, 'click')
      .pipe(
        tap((event) => {
          if (event.target === this.backdrop) {
            this.close();
          }
        }),
      )
      .subscribe();
  }

  open() {
    this.backdrop.classList.remove('is-hidden');
    document.body.classList.add('is-scroll-disable');
  }

  close() {
    this.backdrop.classList.add('is-hidden');
    document.body.classList.remove('is-scroll-disable');
  }
}
