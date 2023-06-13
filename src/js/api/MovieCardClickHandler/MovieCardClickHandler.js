import ApiMovie from '../themoviedbAPI/fetch-movie';
import { ServiceAddRemoveBtn } from '../ServiceAddRemoveBtn/ServiceAddRemoveBtnAPI';
import { markupMovieCard } from '../../components/createMarkupFilmCardModal';
import * as basicLightbox from 'basiclightbox';

const apiMovie = new ApiMovie();

try {
  const openModalMovie = document.querySelector('.js-open-modal-movie');
  openModalMovie.addEventListener('click', onMovieCardClick);
} catch (error) {}

export class MovieCardClickHandler {
  constructor() {
    this.handlerEscape = this.handlerEscape.bind(this);
    this.handlerClose = this.handlerClose.bind(this);
  }

  async onMovieCardClick(e) {
    e.preventDefault();
    if (e.target.offsetParent?.nodeName === 'LI') {
      const movieId = Number(e.target.offsetParent.dataset['movie_id']);

      try {
        const movie = await apiMovie.getMovieInfo(movieId);

        const instance = basicLightbox.create(markupMovieCard(movie.data), {
          handlerEscape: null,
          handlerBtnClose: null,
          onShow: instance => {
            const addRemoveBtn = instance
              .element()
              .querySelector('button[data-type="action"]');

            const serviceAddRemoveBtn = new ServiceAddRemoveBtn(
              addRemoveBtn,
              movie
            );
            serviceAddRemoveBtn.setButtonName();

            this.handlerEscape = this.handlerEscape.bind(instance);
            document.addEventListener('keydown', this.handlerEscape);

            const btnCloseEl = instance
              .element()
              .querySelector('#closeModalPopUp');

            this.handlerBtnClose = this.handlerClose.bind(instance);
            btnCloseEl.addEventListener('click', this.handlerBtnClose);
          },

          onClose() {
            document.removeEventListener('keydown', this.handlerEscape);
            document.removeEventListener('click', this.handlerEscape);
          },
        });

        instance.show();
      } catch (error) {
        console.log(error);
      }
    }
  }

  handlerEscape(evt) {
    if (evt.code === 'Escape') {
      this.close();
    }
  }

  handlerClose(evt) {
    this.close();
  }
}
