const refs = {
  btnMobileMenu: document.querySelector('.btn-mobile-menu-js'),
  mobileMenu: document.querySelector('.mobile-menu'),
};

refs.btnMobileMenu.addEventListener('click', openMobileMenu);

function openMobileMenu() {
  document.body.classList.add('no-scroll');
  refs.mobileMenu.classList.remove('is-hidden');

  refs.mobileMenu.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu(e) {
  if (
    e.target.closest('.mobile-menu') &&
    !e.target.closest('.mobile-menu-content')
  ) {
    refs.mobileMenu.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
    removeAllEventListeners();
  }
  return;
}
