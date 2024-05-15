export class Video {
  constructor() {
    this.video = document.getElementById('info-video');

    this.playPauseVideo = this.playPauseVideo.bind(this);
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('scroll', this.playPauseVideo);
    window.addEventListener('resize', this.playPauseVideo);
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  playPauseVideo() {
    if (this.isElementInViewport(this.video)) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }
}
