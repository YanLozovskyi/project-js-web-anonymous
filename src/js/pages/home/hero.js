import ApiMovie from '../../api/themoviedbAPI/fetch-movie';
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
    // console.log(response);

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
