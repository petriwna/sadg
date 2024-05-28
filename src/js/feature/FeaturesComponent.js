export class FeaturesComponent {
  constructor() {
    this.propertyList = document.querySelectorAll('.property');
    this.image = document.querySelector('.features__img');
    this.imagesSrc = [
      'public/images/two-mm/10/16.jpg',
      'public/images/two-mm/6/1.jpg',
      'public/images/two-mm/6/16.jpg',
      'public/images/two-mm/10/1.jpg',
    ];
    this.image.setAttribute('src', `${this.imagesSrc[0]}`);
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
    const selectedIndex = Array.prototype.findIndex.call(
      this.propertyList,
      (property) => property === selectedProperty,
    );

    this.image.setAttribute('src', `${this.imagesSrc[selectedIndex]}`);
  }
}
