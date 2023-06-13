import ApiMovie from '../../api/themoviedbAPI/fetch-movie';
import { ServiceAddRemoveBtn } from '../../api/ServiceAddRemoveBtn/ServiceAddRemoveBtnAPI';

const apiMovie = new ApiMovie();
const IMG_URL = 'https://image.tmdb.org/t/p/original/';
import { getStar } from '../../components/getStar';
import * as basicLightbox from 'basiclightbox';

const svgCloseIcon = `<svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="svg-close-icon" d="M11.25 11.25L0.75 0.75M11.25 0.75L0.75 11.25" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const catalogPath = document.querySelector('.hero-catalog');

async function getTrendMovieOfDay() {
  try {
    const response = await apiMovie.getTrend('day');
    const randomFilm = randomElement(response.data.results);
    createMarkupFilm(randomFilm, catalogPath);
  } catch (error) {
    console.log('Error:', error);
  }
}

getTrendMovieOfDay();

function randomElement(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand]];
}

export function createMarkupFilm(response, path) {
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
  return basicLightbox.create(`
          <div class="trailer-fail">
            <p class="trailer-fail-text">OOPS...<br/> We are very sorry!<br /> But we couldn’t find the trailer.</p>
            <button type="button" class="btn-close"><svg class="btn-close--svg" width=24 height=24>
            <use href='../../img/sprite.svg#icon-x-button'></use>
        </svg>
      </button>
            <div class="bg-box"></div>
          </div>
        `);
}

// ! Логика для модалки

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
