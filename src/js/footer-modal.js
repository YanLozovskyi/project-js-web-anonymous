// Change code below this line
import SimpleLightbox from 'simplelightbox';

import { ourTeam } from './our-team';

import 'simplelightbox/dist/simple-lightbox.min.css';

const linkCommandModalEl = document.querySelector('.team-modal-link-js');
const footerModalEl = document.querySelector('.footer-modal-backdrop');
const audio = document.querySelector('.footer-modal-backdrop audio');

const teamList = document.querySelector('.team-list');

linkCommandModalEl.addEventListener('click', openModalCommand);

function openModalCommand() {
  document.body.classList.add('no-scroll');
  footerModalEl.classList.remove('is-hidden');

  footerModalEl.addEventListener('click', closeModal);
  playMusic();
}

const creatingGalleryMarkup = ourTeam
  .map(
    info => `<li class="team-item">
  <a class="gallery__link" href="${info.preview}">
    <img class="team-img" src="${info.preview}" alt="${info.description}" width="200" height="180" loading="lazy" />
  </a>
    <div class="team__box">
      <h2 class="team__member">${info.description}</h2>
      <p class="team__role">${info.role}</p>
     
      <a class="team__link-linkedin team__link-linkedin--active" target="_blank" rel="noopener noreferrer nofollow"
        href="${info.linkedin}">
        <svg class="team__icon" width="25" height="25">
          <use href="${info.linkedinSvg}"></use>
        </svg>
      </a>
      <a class="team__link-github team__link-github--active" target="_blank" rel="noopener noreferrer nofollow"
        href="${info.github}">
        <svg class="team__icon" width="25" height="25">
          <use href="${info.gitSvg}"></use>
        </svg>
      </a>
       
    </div>
</li>`
  )
  .join('');

teamList.insertAdjacentHTML('afterbegin', creatingGalleryMarkup);

new SimpleLightbox('.team-item .gallery__link', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    footerModalEl.classList.add('is-hidden');
  }
});

function closeModal(e) {
  if (
    (e.target.closest('.footer-modal-backdrop') &&
      !e.target.closest('.footer-modal-content')) ||
    e.target.closest('.footer-modal-close-btn')
  ) {
    footerModalEl.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
    stopMusic();
  }
  return;
}

function playMusic() {
  audio.play();
  audio.volume = 0.4;
}

function stopMusic() {
  audio.pause();
}
