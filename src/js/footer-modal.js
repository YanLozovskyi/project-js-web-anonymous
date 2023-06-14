const linkCommandModalEl = document.querySelector('.team-modal-link-js');
const footerModalEl = document.querySelector('.footer-modal-backdrop');
const audio = document.querySelector('.footer-modal-backdrop audio');

linkCommandModalEl.addEventListener('click', openModalCommand);

function openModalCommand() {
  document.body.classList.add('no-scroll');
  footerModalEl.classList.remove('is-hidden');

  footerModalEl.addEventListener('click', closeModal);
  playMusic();
}

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
