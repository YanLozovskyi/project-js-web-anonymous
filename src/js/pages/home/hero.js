import ApiMovie from '../../api/themoviedbAPI/fetch-movie';
import { ServiceAddRemoveBtn } from '../../api/ServiceAddRemoveBtn/ServiceAddRemoveBtnAPI';

import { getStar } from '../../components/getStar';
import * as basicLightbox from 'basiclightbox';
const apiMovie = new ApiMovie();
const IMG_URL = 'https://image.tmdb.org/t/p/original/';

const contentPath = document.querySelector('.hero-content');

// --------------------------ТЕСТ - Трендові фільми дня та тижня

async function getTrendMovieOfDay() {
  try {
    const response = await apiMovie.getTrend('day');

    const randomFilm = randomElement(response.data.results);

    if (response.data.results.length === 0) {
      createDefaultMarkup(contentPath);

      DefaultMarkupSettings();
    } else {
      createMarkupFilm(randomFilm, contentPath);
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

getTrendMovieOfDay();

function createMarkupFilm(response, path) {
  const markup = response
    .map(({ original_title, overview, backdrop_path, vote_average }) => {
      return `<div class="hero-film_background" style="background-image: url(${IMG_URL}${backdrop_path})""></div>
        <div class="hero-wrap">

  <h1 class="hero-title">${original_title}</h1>
    <div class="hero-stars">${getStar(vote_average)}</div>

  <p class="hero-description-js">${overview}</p>
  <div class="hero-buttons">

    <button class="hero-button-trailer">
      Watch trailer
    </button>

    <button class="hero-button-moredetails">
      More details
    </button>
  </div>
</div>`;
    })
    .join('');
  path.innerHTML = markup;
  showTrailer(response);
  showModalMoreDetails(response);
}

function createDefaultMarkup(path) {
  const markup = `
  <h1 class="hero-title-default">Let’s Make Your Own Cinema</h1>
    <p class="hero-description-default">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.</p>
    <a class="hero-link" href="./catalog.html">Get Started</a>
    
    <div class="hero-picture-default">

</div>
`;
  path.innerHTML = markup;
}

function randomElement(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand]];
}

function DefaultMarkupSettings() {
  const heroDescription = document.querySelector('.hero-description-default');
  const heroContent = document.querySelector('.hero-content');

  heroContent.classList.add('hero-content-default');
  heroContent.classList.remove('hero-content');
  const screenSize = window.innerWidth;

  if (screenSize > 768) {
    heroDescription.textContent =
      "Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.";
  } else {
    heroDescription.textContent =
      "Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. ";
  }
}

async function showTrailer(response) {
  const button = document.querySelector('.hero-button-trailer');
  button.addEventListener('click', onButtonClick);

  async function onButtonClick() {
    try {
      getIdTotalFilm(response);

      const youtubeTrailers = await apiMovie.getTrailer(
        getIdTotalFilm(response)
      );

      const trailer = youtubeTrailers.data.results.find(
        el => el.type === 'Trailer' || el.name === 'Official Trailer'
      );

      if (!trailer) {
        throw new Error('Trailer not found');
      }

      const instance = basicLightbox.create(`
     <iframe class="iframe" src="https://www.youtube.com/embed/${trailer.key}" width="560" height="315" frameborder="0"></iframe>`);

      instance.show();
    } catch (error) {
      markupForMistake().show();
      console.log('Error:', error);
    }
  }
}

function markupForMistake() {
  const instance = basicLightbox.create(`
  <div class="trailer-fail">
  <p class="trailer-fail-text">OOPS...<br/> We are very sorry!<br /> But we couldn’t find the trailer.</p>
  <button type="button" class="btn-close"><svg class="btn-close--svg">
  <use href='/sprite.a5e5e87b.svg#icon-close'></use>
  </svg>
  </button>
  <div class="bg-box"></div>
  </div>
  `);

  const buttonClose = instance.element().querySelector('.btn-close');
  buttonClose.addEventListener('click', onButtonCloseClick);
  function onButtonCloseClick() {
    instance.close();
    buttonClose.removeEventListener('click', onButtonCloseClick);
  }

  return instance;
}

function getIdTotalFilm(response) {
  return response.map(data => data.id).join('');
}

function showModalMoreDetails(response) {
  const buttonMoreDetails = document.querySelector('.hero-button-moredetails');

  buttonMoreDetails.addEventListener('click', onButtonMoreClick);

  async function onButtonMoreClick() {
    document.body.insertAdjacentHTML('beforeend', markupBackdropMovieCard());

    const backdropMovieCardEl = document.getElementById('backdrop-movie-card');

    try {
      const movie = await apiMovie.getMovieInfo(getIdTotalFilm(response));

      backdropMovieCardEl.innerHTML = markupMovieCard(movie.data);
      const addRemoveBtn = document.querySelector('button[data-type="action"]');
      const serviceAddRemoveBtn = new ServiceAddRemoveBtn(addRemoveBtn, movie);

      serviceAddRemoveBtn.setButtonName();
      backdropMovieCardEl.addEventListener('click', onBackdropClick);
    } catch (error) {
      console.log(error);
    }

    function onBackdropClick(e) {
      if (e.target === backdropMovieCardEl) {
        backdropMovieCardEl.removeEventListener('click', onBackdropClick);
        backdropMovieCardEl.remove();
      }
    }

    function markupBackdropMovieCard() {
      return `
    <div id="backdrop-movie-card" class="backdrop-movie-card overlay visual">
    </div>`;
    }

    function markupMovieCard({
      id,
      poster_path,
      original_title,
      vote_average,
      vote_count,
      popularity,
      genres,
      overview,
    }) {
      const allGenres = genres.map(({ name }) => name).join(', ');
      return `
<div class="pop-up-modal visual" id="modalPopUp">
  <button class="pop-up-modal__close" id="closeModalPopUp">
    <svg width="18" height="18" class="pop-up-modal__close-icon">
      <use href="./images/sprite/sprite.svg#icon-close"></use>
    </svg>
  </button>
  <div class="pop-up-modal__container">
    <img src="${IMG_URL}${poster_path}" alt="image.png" class="pop-up-modal__img" />
    <div class="pop-card" id="${id}">
      <h2 class="pop-up-modal__title">${original_title}</h2>
      <div class="pop-up-modal__blok">
        <ul class="pop-up-modal__list">
          <li class="pop-up-modal__link">Vote / Votes</li>
          <li class="pop-up-modal__link">Popularity</li>
          <li class="pop-up-modal__link">Genre</li>
          <li class="pop-up-modal__link">ABOUT</li>
        </ul>
        <ul class="pop-up-modal__list">
          <li class="pop-up-modal__link-item item-votes">
            <div class="vote">${vote_average}</div>
            &nbsp;/&nbsp;
            <div class="votes">${vote_count}</div>
          </li>
          <li class="pop-up-modal__link-item popularity">${popularity}</li>
          <li class="pop-up-modal__link-item genres">${allGenres}</li>
        </ul>
      </div>
      <div class="pop-up-modal__about">
        <p class="pop-up-modal__about-txt">${overview}</p>
      </div>
        <button
          class="add-remove-btn button-accent"
          type="button"
          data-type="action"
          data-action="add-to-my-library"
          >
        </button>
    </div>
  </div>
</div>
`;
    }
  }
}
