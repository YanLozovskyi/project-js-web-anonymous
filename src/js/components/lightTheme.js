const bodyStyle = document.querySelector('body');
const themSwitcherButton = document.querySelector('.switch-button');
const halfofmoon = document.querySelector('.icon-halfofmoon');
const moonLeft = document.querySelector('.icon-moon-left');
const moonRight = document.querySelector('.icon-moon-right');
const iconSun = document.querySelector('.icon-sun');

const saveMode = localStorage.getItem('selectedMode');

if (saveMode === 'light') {
  bodyStyle.classList = saveMode;
  halfofmoon.classList.add('visually-hidden');
  moonRight.classList.remove('visually-hidden');
  moonLeft.classList.add('visually-hidden');
  iconSun.classList.remove('visually-hidden');
}

themSwitcherButton.addEventListener('click', switchThem);

function switchThem(event) {
  halfofmoon.classList.toggle('visually-hidden');
  moonRight.classList.toggle('visually-hidden');
  moonLeft.classList.toggle('visually-hidden');
  iconSun.classList.toggle('visually-hidden');

  if (!iconSun.classList.contains('visually-hidden')) {
    bodyStyle.classList.add('light');
    localStorage.setItem('selectedMode', 'light');
  } else {
    bodyStyle.classList.remove('light');
    localStorage.setItem('selectedMode', 'dark');
  }
}
