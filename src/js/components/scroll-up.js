const guard = document.querySelector('.js-guard');
const scrollBtn = document.querySelector('.scroll-up--button');

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(scrollButtonShow, options);

observer.observe(guard);

function scrollButtonShow(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      scrollBtn.classList.add('scroll-up--button---shown');
    } else {
      scrollBtn.classList.remove('scroll-up--button---shown');
    }
  });
}
