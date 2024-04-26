import '../scss/main.scss';

import { toggleBtn } from './utils';
import { Main } from './Main';

export function init() {
  const moveTopBtn = document.getElementById('up');

  moveTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('load', () => toggleBtn(moveTopBtn));
  window.addEventListener('scroll', () => toggleBtn(moveTopBtn));
  new Main();
}

document.addEventListener('DOMContentLoaded', init);
