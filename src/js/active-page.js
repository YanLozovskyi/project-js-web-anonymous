const activePage = window.location.pathname;
const pagesEl = document.querySelectorAll('.header-nav-link');

pagesEl.forEach(pageEl => {
  if (pageEl.href.includes(`${activePage}`)) {
    pageEl.classList.add('active');
  }
});

const mobileActivePage = window.location.pathname;
const mobilePagesEl = document.querySelectorAll('.mobile-menu-nav-link');

mobilePagesEl.forEach(pageEl => {
  if (pageEl.href.includes(`${mobileActivePage}`)) {
    pageEl.classList.add('active');
  }
});
