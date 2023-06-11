import ApiMovie from '../../api/themoviedbAPI/fetch-movie';
// import { randomElement, createMarkupFilm } from '../home/hero';
const apiMovie = new ApiMovie();
const IMG_URL = 'https://image.tmdb.org/t/p/original/';
import { getStar } from '../../components/getStar';
import * as basicLightbox from 'basiclightbox';

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
}

async function showTrailer(response) {
  const button = document.querySelector('.hero-button-trailer');
  button.addEventListener('click', onButtonClick);

  async function onButtonClick() {
    try {
      const id = await response.map(data => data.id).join('');

      const youtubeTrailers = await apiMovie.getTrailer(id);

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
