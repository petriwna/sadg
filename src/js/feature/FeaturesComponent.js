export class FeaturesComponent {
  constructor() {
    this.propertyList = document.querySelectorAll('.property');
    this.image = document.querySelectorAll('.property__img-container');

    this.setInitialImageHeight(0);
    this.setupEventListeners();
  }

  setHeight(index) {
    const breakpointTable = window.matchMedia('(min-width: 768px) and (max-width: 992px)');
    const breakpointDesktop = window.matchMedia('(min-width: 992px)');

    if (breakpointTable.matches) {
      this.image[index].style.height = '625px';
    } else if (breakpointDesktop.matches) {
      this.setDisplayBlock(index);
    } else {
      this.image[index].style.height = '525px';
    }
  }

  setDisplayBlock(index) {
    this.removeDisplayBlock();

    const imgContainer = document.querySelectorAll('.features__img-container');
    imgContainer[index].style.display = 'block';
  }

  removeDisplayBlock() {
    const imgContainer = document.querySelectorAll('.features__img-container');
    imgContainer.forEach((el) => {
      el.style.display = 'none';
    });
  }

  setInitialImageHeight() {
    this.setHeight(0);

    const breakpointTable = window.matchMedia('(min-width: 768px)');
    const breakpointDesktop = window.matchMedia('(min-width: 992px)');

    breakpointTable.addEventListener('change', () => this.setHeight(0));
    breakpointDesktop.addEventListener('change', () => this.setHeight(0));
  }

  setupEventListeners() {
    this.propertyList.forEach((property) => {
      property.addEventListener('click', () => this.handleProperty(property));
    });
  }

  handleProperty(selectedProperty) {
    this.propertyList.forEach((property, index) => {
      property.classList.remove('property--active');
      this.image[index].style.height = '0';
    });

    selectedProperty.classList.add('property--active');
    const selectedIndex = Array.prototype.findIndex.call(
      this.propertyList,
      (property) => property === selectedProperty,
    );

    this.setHeight(selectedIndex);
  }
}
