import ApiMovie from './api/themoviedbAPI/fetch-movie';
import { randomElement } from './components/randomElement';
import Storage from './api/localStorageAPI/localStorageAPI';
import { STORAGE_KEY } from './localStorageKey/localStorageKey';

const apiMovie = new ApiMovie();
const IMAGE_URL = 'https://image.tmdb.org/t/p/original/';

const movieDescription = document.querySelector('.movieDescription');

async function getNewFilms() {
  try {
    const response = await apiMovie.getNewFilms();

    const randomFilm = randomElement(response.data.results);

    const randomFilmId = randomFilm.map(film => film.id).join('');

    const randomMovieInfo = await apiMovie.getMovieInfo(randomFilmId);

    const movieId = randomMovieInfo.data.id;

    const dataLocal = Storage.load(STORAGE_KEY.myLibraryMoviesList);

    console.log(dataLocal);

    movieDescription.innerHTML = createUpcomingMovieMarkup(
      randomMovieInfo.data
    );

    const buttonAddLibrary = document.querySelector('.test');
    buttonAddLibrary.addEventListener('click', onBtnClick);

    function onBtnClick() {
      console.log('hi');
    }

    if (dataLocal?.length === 0 || !dataLocal) {
      buttonAddLibrary.textContent = 'Add to my library';
    } else {
      if (dataLocal.some(({ id }) => id === movieId)) {
        buttonAddLibrary.textContent = 'Remove from my library';
      } else {
        buttonAddLibrary.textContent = 'Add to my library';
      }
    }

    // if (true) {
    //   buttonAddLibrary.textContent = 'Add to my library';
    // } else {
    //   buttonAddLibrary.textContent = 'Remove from my library';
    // }
  } catch (error) {
    console.log(error);
    f;
  }
}

getNewFilms();

function createUpcomingMovieMarkup(data) {
  const {
    id,
    backdrop_path,
    original_title,
    release_date,
    vote_average,
    vote_count,
    popularity,
    genres,
    overview,
  } = data;
  const allGenres = genres
    .map(genre => {
      return genre.name;
    })
    .join(', ');
  return `
    <div class="image-upcoming">
    <h2 class="one-title">Upcoming this months</h2>
    <img
      class="gallery-item__img"
      src="${IMAGE_URL}${backdrop_path}"
      alt="movie"
      loading="lazy"
    />
  </div>
  <div class="gallery-item" id="${id}">
    <h3 class="info-item-title">${original_title}</h3>
    <div class="info">
      <div class="info-item-one-part">
        <p class="info-item">
          <b>Release date</b
          ><span class="info-item-second">${release_date}</span>
        </p>
        <p class="info-item">
          <b>Vote / Votes</b
          ><span class="info-item-fourth vote-text">${vote_average}</span> /
          <span class="info-item-fourth vote-text">${vote_count}</span>
        </p>
      </div>
      <div class="info-item-two-part">
        <p class="info-item"><b>Popularity</b>${popularity}</p>
        <p class="info-item"><b>Genre </b>${allGenres}</p>
      </div>
    </div>
    <div class="info-item-about">
      <p class="info-item-about-movie">
        <b><span class="info-item-thirty">About</span></b
        >${overview}
      </p>
    </div>
    <button type="button" class="test button-accent"></button>
  </div>`;
}
