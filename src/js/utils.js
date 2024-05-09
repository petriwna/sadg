export function toggleBtn(btn) {
  if (window.scrollY === 0) {
    btn.style.display = 'none';
  } else {
    btn.style.display = 'flex';
  }
}

export function validationInputLength(input) {
  input.addEventListener('input', () => {
    if (input.value.length > 3) {
      input.value = input.value.slice(0, 3);
    }
  });
}

export function validationInputEmpty(input) {
  input.addEventListener('blur', () => {
    if (input.value.trim() === '') {
      input.value = '1';
      return true;
    }
    return false;
  });
}
