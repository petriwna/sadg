export class SelectComponent {
  constructor() {
    this.selected = document.querySelector('.select__wrapper');
    this.optionsAll = document.querySelectorAll('.select__option');
    this.selectedValue = this.selected.querySelector('span').textContent;
  }

  init() {
    this.selected.addEventListener('click', () => this.handleSelectClick());
    this.optionsAll.forEach((option) => {
      option.addEventListener('click', () => this.handleOptionsClick(option));
    });
  }

  handleSelectClick() {
    const arrow = this.selected.parentNode.querySelector('.arrow');
    const optionsContainer = this.selected.previousSibling;

    if (optionsContainer.classList.contains('active')) {
      optionsContainer.classList.remove('active');
      arrow.classList.add('rotated');
    } else {
      const currentActive = document.querySelector('.select__options-container.active');

      if (currentActive) {
        currentActive.classList.remove('.active');

        const otherArrow = currentActive.parentNode.querySelector('.arrow');

        otherArrow.classList.add('rotated');
      }

      arrow.classList.remove('rotated');
      optionsContainer.classList.add('active');
    }
  }

  handleOptionsClick(option) {
    if (this.selected) {
      this.selected.querySelector('span').textContent = option.textContent;
      this.selectedValue = option.textContent;
      const activeOption = option.parentNode.querySelector('.select__option--active');
      activeOption.classList.remove('select__option--active');
      option.classList.add('select__option--active');
    }
    this.closeDropdown();
  }

  closeDropdown() {
    const optionsContainer = this.selected.previousSibling;
    const arrow = this.selected.parentNode.querySelector('.arrow');

    if (optionsContainer) {
      optionsContainer.classList.remove('active');
    }
    if (arrow) {
      arrow.classList.add('rotated');
    }
  }
}
