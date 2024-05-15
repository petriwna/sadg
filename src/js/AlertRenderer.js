export class AlertRenderer {
  static createAlert(type, text) {
    const notificationBox = document.querySelector('main');

    const component = document.createElement('div');
    component.className = `alert alert__${type}`;
    component.innerHTML = `
      <svg class='alert__icon' width='24' height='24'>
        <use href='public/images/icons.svg#icon-${type}'></use>
      </svg>
      <p class='alert__text'>${text}</p>`;
    notificationBox.appendChild(component);
    setTimeout(() => {
      component.classList.remove('opacity-0');
      component.classList.add('opacity-1');
    }, 1);
    setTimeout(() => {
      component.classList.remove('opacity-1');
      component.classList.add('opacity-0');
      component.style.margin = 0;
      component.style.padding = 0;
    }, 2000);
    setTimeout(() => {
      component.style.setProperty('height', '0', 'important');
    }, 2100);
    setTimeout(() => {
      notificationBox.removeChild(component);
    }, 2700);
  }
}
