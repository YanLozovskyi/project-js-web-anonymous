import ApiMovie from './api/themoviedbAPI/fetch-movie';
import { ServiceAddRemoveBtn } from './api/ServiceAddRemoveBtn/ServiceAddRemoveBtnAPI';
import { markupMovieCard } from './components/createMarkupFilmCardModal';
import { ScrollService } from './components/scrollService';
import * as basicLightbox from 'basiclightbox';

const apiMovie = new ApiMovie();
const scrollService = new ScrollService();

try {
  const openModalMovie = document.querySelector('.js-open-modal-movie');
  openModalMovie.addEventListener('click', onMovieCardClick);
} catch (error) {}

async function onMovieCardClick(e) {
  e.preventDefault();
  if (e.target.offsetParent?.nodeName === 'LI') {
    const movieId = Number(e.target.offsetParent.dataset['movie_id']);

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

          this.handlerEscape = handlerEsc.bind(instance);
          document.addEventListener('keydown', this.handlerEscape);

          const btnCloseEl = instance
            .element()
            .querySelector('#closeModalPopUp');

          this.handlerBtnClose = handlerClose.bind(instance);
          btnCloseEl.addEventListener('click', this.handlerBtnClose);
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

async function showTrailer(response) {
  const button = document.querySelector(
    'button[data-action="add-movie-trailer-btn"]'
  );

  button.addEventListener('click', onButtonClick);

  async function onButtonClick() {
    try {
      const youtubeTrailers = await apiMovie.getTrailer(response.data.id);

      const trailer = youtubeTrailers.data.results.find(
        el => el.type === 'Trailer' || el.name === 'Official Trailer'
      );

      if (!trailer) {
        throw new Error('Trailer not found');
      }

      const instance = basicLightbox.create(
        `
       <iframe class="iframe" src="https://www.youtube.com/embed/${trailer.key}" width="560" height="315" frameborder="0"></iframe>`,
        {
          handlerEscape: null,

          onShow() {
            this.handlerEscape = handlerEsc.bind(instance);
            document.addEventListener('keydown', this.handlerEscape);
          },
          onClose() {
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
  const instance = basicLightbox.create(
    `
  <div class="trailer-fail">
  <p class="trailer-fail-text">OOPS...<br/> We are very sorry!<br /> But we couldn’t find the trailer.</p>
  <button type="button" class="btn-close"><svg class="btn-close--svg">
  <use href='/sprite.a5e5e87b.svg#icon-close'></use>
  </svg>
  </button>
  <div class="bg-box"></div>
  </div>
  `,
    {
      handlerEscape: null,
      handlerBtnClose: null,

      onShow() {
        this.handlerEscape = handlerEsc.bind(instance);
        document.addEventListener('keydown', this.handlerEscape);

        const btnCloseEl = instance.element().querySelector('.btn-close');

        this.handlerBtnClose = handlerClose.bind(instance);
        btnCloseEl.addEventListener('click', this.handlerBtnClose);
      },
      onClose() {
        document.removeEventListener('click', this.handlerBtnClose);
        document.removeEventListener('keydown', this.handlerEscape);
      },
    }
  );

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
