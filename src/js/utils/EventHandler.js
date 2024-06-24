export class EventHandler {
  addClickListener(element, callback) {
    if (element) {
      element.addEventListener('click', callback);
    }
  }
}
