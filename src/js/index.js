import '../scss/main.scss';

import { Catalog } from './Catalog';
import { toggleBtn } from './utils';

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

  new Catalog();
}

document.addEventListener('DOMContentLoaded', init);
