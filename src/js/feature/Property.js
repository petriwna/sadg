export class Property {
  constructor() {
    this.propertyList = document.querySelectorAll('.property');

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.propertyList.forEach((property) => {
      property.addEventListener('click', () => this.handleProperty(property));
    });
  }

  handleProperty(selectedProperty) {
    this.propertyList.forEach((property) => {
      property.classList.remove('property--active');
    });

    selectedProperty.classList.add('property--active');
  }
}
