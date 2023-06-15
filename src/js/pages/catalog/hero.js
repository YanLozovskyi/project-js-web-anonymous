import '~node_modules/swiper/swiper-element-bundle.min.js';
import ApiMovie from '../../api/themoviedbAPI/fetch-movie';
import { getStar } from '../../components/getStar';
import * as basicLightbox from 'basiclightbox';
import { ScrollService } from '../../components/scrollService';
import { ServiceAddRemoveBtn } from '../../api/ServiceAddRemoveBtn/ServiceAddRemoveBtnAPI';

const scrollService = new ScrollService();
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
      const movieSrc = getImg(backdrop_path, original_title);
      return `
      <swiper-slide class="hero-film_background hero-wrap"
    
        data-movie-id="${id}"
      ><img class="hero-film_background" width="1280" height="720" ${movieSrc}/><div class="swiper-test">
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
        </div></div>
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

      const instance = basicLightbox.create(
        `
        <iframe class="iframe" src="https://www.youtube.com/embed/${trailer.key}" width="560" height="315" frameborder="0"></iframe>
      `,
        {
          handlerEscape: null,
          onShow() {
            scrollService.blockScroll();
            this.handlerEscape = handlerEsc.bind(instance);
            document.addEventListener('keydown', this.handlerEscape);
          },
          onClose() {
            scrollService.restoreScroll();
            document.removeEventListener('keydown', this.handlerEscape);
          },
        }
      );

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

function handlerEsc(evt) {
  if (evt.code === 'Escape') {
    this.close();
  }
}

function handlerClose() {
  this.close();
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
    try {
      const movie = await apiMovie.getMovieInfo(movieId);

      const instance = basicLightbox.create(markupMovieCard(movie.data), {
        handlerEscape: null,
        handlerBtnClose: null,

        onShow: instance => {
          scrollService.blockScroll();

          const addRemoveBtn = instance
            .element()
            .querySelector('button[data-action="add-remove-to-my-library"]');

          const serviceAddRemoveBtn = new ServiceAddRemoveBtn(
            addRemoveBtn,
            movie
          );
          serviceAddRemoveBtn.setButtonName();

          const escapeHandler = handlerEsc.bind(instance);
          document.addEventListener('keydown', escapeHandler);

          // this.handlerEscape = handlerEsc.bind(instance);
          // document.addEventListener('keydown', this.handlerEscape);

          const closeButton = instance
            .element()
            .querySelector('#closeModalPopUp');
          const btnCloseHandler = handlerClose.bind(instance);
          closeButton.addEventListener('click', btnCloseHandler);

          // const btnCloseEl = instance
          //   .element()
          //   .querySelector('#closeModalPopUp');

          // this.handlerBtnClose = handlerClose.bind(instance);
          // btnCloseEl.addEventListener('click', this.handlerBtnClose);
        },

        onClose() {
          scrollService.restoreScroll();

          document.removeEventListener('keydown', this.handlerEscape);
          document.removeEventListener('click', this.handlerBtnClose);
        },
      });

      instance.show();

      showTrailer(movie);
    } catch (error) {
      console.log(error);
    }
  }
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
        <div class="pop-up-modal-wrap-btn">
          <button
            class="add-remove-btn button-accent"
            type="button"
            data-action="add-remove-to-my-library"
          ></button>
        </div>
    </div>
  </div>
</div>
`;
}

function getImg(backdrop_path, title) {
  // if (poster === null || !poster) {
  //   return `src='${comingSoonImg}' alt='${title}'`;
  // }

  return `
    srcset="https://image.tmdb.org/t/p/w1280${backdrop_path} 1280w,
  https://image.tmdb.org/t/p/w780${backdrop_path} 768w,
  https://image.tmdb.org/t/p/w300${backdrop_path} 320w"
  src="https://image.tmdb.org/t/p/w300${backdrop_path}" "sizes="(min-width: 1280px) 1280px, (min-width: 768px) 768px, (min-width: 320px) 320px, 100vw "   
     alt='${title}'`;
}
