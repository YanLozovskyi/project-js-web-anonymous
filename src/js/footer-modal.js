const linkCommandModalEl = document.querySelector('.team-modal-link-js');
const footerModalEl = document.querySelector('.footer-modal-backdrop');

linkCommandModalEl.addEventListener('click', openModalCommand);

function openModalCommand() {
  document.body.classList.add('no-scroll');
  footerModalEl.classList.remove('is-hidden');

  footerModalEl.addEventListener('click', closeModal);
}

function closeModal(e) {
  if (
    e.target.closest('.footer-modal-backdrop') &&
    !e.target.closest('.footer-modal-content')
  ) {
    refs.mobileMenu.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
    removeAllEventListeners();
  }
  return;
}
