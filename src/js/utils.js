export function toggleBtn(btn) {
  if (window.scrollY === 0) {
    btn.style.display = 'none';
  } else {
    btn.style.display = 'flex';
  }
}

export function addClassToElement(id, className) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.add(className);
  }
}

export function removeClassFromElement(id, className) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.remove(className);
  }
}
