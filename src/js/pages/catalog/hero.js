import ApiMovie from '../../api/themoviedbAPI/fetch-movie';
import { getStar } from '../../components/getStar';
import * as basicLightbox from 'basiclightbox';
import { ServiceAddRemoveBtn } from '../../api/ServiceAddRemoveBtn/ServiceAddRemoveBtnAPI';

const apiMovie = new ApiMovie();
const IMG_URL = 'https://image.tmdb.org/t/p/original/';
const svgCloseIcon = `<svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="svg-close-icon" d="M11.25 11.25L0.75 0.75M11.25 0.75L0.75 11.25" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const catalogPath = document.querySelector('.hero-catalog');

async function getTrendMovieOfDay() {
  try {
    const response = await apiMovie.getTrend('day');

    const randomFilms = randomElement(response.data.results);

    if (response.data.results.length === 0) {
      createDefaultMarkup(catalogPath);

      DefaultMarkupSettings();
    } else {
      createMarkupFilm(randomFilms.slice(0, 5), catalogPath);
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

getTrendMovieOfDay();

function randomElement(arr) {
  arr = arr.sort(() => Math.random() - 0.5);

  return arr;
}

async function createMarkupFilm(response, path) {
  const markup = response
    .map(({ original_title, overview, backdrop_path, vote_average, id }) => {
      return `
      <swiper-slide class="hero-film_background hero-wrap"
        style="background-image: url(${IMG_URL}${backdrop_path})"
        data-movie-id="${id}"
      >
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
        </div>
      </swiper-slide>
    `;
    })
    .join('');
  path.innerHTML = markup;
  showTrailer(response);
  showModalMoreDetails(response);
}

async function showTrailer(response) {
  const buttons = document.querySelectorAll('.hero-button-trailer');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      onButtonClick(response[index].id);
    });
  });

  async function onButtonClick(movieId) {
    try {
      const youtubeTrailers = await apiMovie.getTrailer(movieId);
      const trailer = youtubeTrailers.data.results.find(
        el => el.type === 'Trailer' || el.name === 'Official Trailer'
      );

      if (!trailer) {
        throw new Error('Trailer not found');
      }

      const instance = basicLightbox.create(`
        <iframe class="iframe" src="https://www.youtube.com/embed/${trailer.key}" width="560" height="315" frameborder="0"></iframe>
      `);

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

// ! Логика для модалки

function showModalMoreDetails(response) {
  const buttonsMoreDetails = document.querySelectorAll(
    '.hero-button-moredetails'
  );

  buttonsMoreDetails.forEach((button, index) => {
    button.addEventListener('click', () => {
      onButtonMoreClick(response[index].id);
    });
  });

  async function onButtonMoreClick(movieId) {
    document.body.insertAdjacentHTML('beforeend', markupBackdropMovieCard());

    const backdropMovieCardEl = document.getElementById('backdrop-movie-card');

    try {
      const movie = await apiMovie.getMovieInfo(movieId);

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
    ${svgCloseIcon}
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
