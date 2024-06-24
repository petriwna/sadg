import '../scss/main.scss';

import { Main } from './Main';
import { toggleBtn } from './utils/utils';

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
