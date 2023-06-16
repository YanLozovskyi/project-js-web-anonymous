const selectEl = document.querySelector('.select');
const optionEl = document.querySelector('.options');

selectEl.addEventListener('click', onSelectClick);

function onSelectClick(e) {
  optionEl.classList.toggle('option-show');
}
