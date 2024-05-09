export function toggleBtn(btn) {
  if (window.scrollY === 0) {
    btn.style.display = 'none';
  } else {
    btn.style.display = 'flex';
  }
}
