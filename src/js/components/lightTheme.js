const bodyStyle = document.querySelector('body');
const themSwitcherButton = document.querySelector('.button-switch');
const halfofmoon = document.querySelector('.icon-halfofmoon');
const moonLeft = document.querySelector('.icon-moon-left');
const moonRight = document.querySelector('.icon-moon-right');
const iconSun = document.querySelector('.icon-sun');

const saveMode = localStorage.getItem('selectedMode');

if (saveMode === 'light') {
  bodyStyle.classList = saveMode;
  halfofmoon.classList.add('visually-hidden');
  moonRight.classList.add('visually-hidden');
  moonLeft.classList.remove('visually-hidden');
  iconSun.classList.remove('visually-hidden');
}

themSwitcherButton.addEventListener('click', switchThem);

function switchThem(event) {
  halfofmoon.classList.toggle('visually-hidden');
  moonRight.classList.toggle('visually-hidden');
  moonLeft.classList.toggle('visually-hidden');
  iconSun.classList.toggle('visually-hidden');

  if (!iconSun.classList.contains('visually-hidden')) {
    bodyStyle.classList.remove('dark');
    bodyStyle.classList.add('light');
    localStorage.setItem('selectedMode', 'light');
  } else {
    bodyStyle.classList.remove('light');
    bodyStyle.classList.add('dark');
    localStorage.setItem('selectedMode', 'dark');
  }
}

// Отображение актуального состояния кнопки для пользователей программой чтения с экрана.

themSwitcherButton.addEventListener('click', toggleTheme);

function toggleTheme() {
  const isPressed = themSwitcherButton.getAttribute('aria-pressed') === 'true';

  if (isPressed) {
    themSwitcherButton.setAttribute('aria-pressed', 'false');
  } else {
    themSwitcherButton.setAttribute('aria-pressed', 'true');
  }
}
