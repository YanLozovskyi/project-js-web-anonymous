const pagesEl = document.querySelectorAll('.header-nav-link');
const windowPathName = window.location.pathname;

pagesEl.forEach(pageEl => {
  const pageLinkPathname = new URL(pageEl.href).pathname;

  if (
    (windowPathName === '/' && pageLinkPathname === '/') ||
    pageLinkPathname === windowPathName
  ) {
    pageEl.classList.add('active');
  }
});

const MobilePagesEl = document.querySelectorAll('.mobile-menu-nav-link');
const MobileWindowPathName = window.location.pathname;

MobilePagesEl.forEach(pageEl => {
  const pageLinkPathname = new URL(pageEl.href).pathname;

  if (
    (MobileWindowPathName === '/' && pageLinkPathname === '/') ||
    pageLinkPathname === MobileWindowPathName
  ) {
    pageEl.classList.add('active');
  }
});
