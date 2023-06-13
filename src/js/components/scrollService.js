export class ScrollService {
  blockScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = this.getWidthScrollbar() + 'px';
  }

  getScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  getWidthScrollbar() {
    document.body.insertAdjacentHTML(
      'afterend',
      `<div id="scrollbar-measure"></div>`
    );
    const scrollbarMeasure = document.getElementById('scrollbar-measure');
    scrollbarMeasure.style.overflow = 'scroll';
    const scrollbarWidth =
      scrollbarMeasure.offsetWidth - scrollbarMeasure.clientWidth;
    scrollbarMeasure.style.overflow = 'hidden';
    scrollbarMeasure.remove();
    return scrollbarWidth;
  }
}
