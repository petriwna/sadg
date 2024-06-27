import { Gallery } from '../catalog/Gallery';
import { SplideManager } from '../SplideManager';

export class ProductGallery {
  constructor() {
    this.gallery = document.querySelector('.gallery');
    this.splideManager = new SplideManager();
    this.galleryRenderer = new Gallery(this.gallery);
    this.modalImg = this.galleryRenderer.imagesUrl;
  }

  renderGallery(product) {
    const { splideContainer, thumbnailsContainer } = this.galleryRenderer.renderGallery(product);

    this.splideManager.initSlide(splideContainer, thumbnailsContainer);
  }

  removeGallery() {
    if (this.gallery) {
      const mainCarousel = this.gallery.querySelector('#main-carousel');
      const thumbnailCarousel = this.gallery.querySelector('#thumbnail-carousel');
      if (mainCarousel) mainCarousel.remove();
      if (thumbnailCarousel) thumbnailCarousel.remove();
      this.galleryRenderer.imagesUrl = [];
    }
  }
}
