export function getWidthScrollbar() {
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
