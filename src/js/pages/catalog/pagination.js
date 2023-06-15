import Pagination from 'tui-pagination';
import { refs } from './catalog-refs';

const option = {
  // totalItems: 10,
  itemsPerPage: 20,
  visiblePages: 3,
  // page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn tui-num-page">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected tui-num-page">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{page}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip tui-order-{{type}}-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

export const pagination = new Pagination(refs.pagination, option);

function addLeadingZero(number) {
  return number.toString().padStart(2, '0');
}

export function updateBtnNames(lastPage) {
  const pagination = document.querySelector('.catalog-gallery-pagination')
  const firstButton = pagination.querySelector('.tui-first');
  const lastButton = pagination.querySelector('.tui-last');
  const pageButton = pagination.querySelectorAll('.tui-num-page')

  firstButton.textContent = '01';

  if (lastPage === 1000) {
    lastButton.textContent = addLeadingZero('500');
  } else {
  lastButton.textContent = addLeadingZero(lastPage);
  }

  pageButton.forEach(page => page.textContent = addLeadingZero(page.textContent))
}