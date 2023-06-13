export class Loader {
  onShow() {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="backdrop-loader">
  <div class="lds-dual-ring"></div>
</div>`
    );
  }

  onClose() {
    const backdropLoaderEl = document.querySelector('.backdrop-loader');
    setTimeout(() => {
      backdropLoaderEl.remove();
    }, 250);
  }
}
