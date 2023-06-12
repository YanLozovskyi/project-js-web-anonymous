import ApiMovie from './api/themoviedbAPI/fetch-movie';
import Storage from './api/localStorageAPI/localStorageAPI';
import { randomElement } from './components/randomElement';
import { STORAGE_KEY } from './localStorageKey/localStorageKey';

const apiMovie = new ApiMovie();
const IMAGE_URL = 'https://image.tmdb.org/t/p/original/';

const movieDescription = document.querySelector('.movieDescription');

getNewFilms();

let toggleAddRemoveButton;
let movieId = null;
let randomMovieInfo;
const dataLocalStorage = Storage.load(STORAGE_KEY.myLibraryMoviesList);

async function getNewFilms() {
  try {
    const response = await apiMovie.getNewFilms();
    const randomFilm = randomElement(response.data.results);
    const randomFilmId = randomFilm.map(film => film.id).join('');
    randomMovieInfo = await apiMovie.getMovieInfo(randomFilmId);
    movieId = randomMovieInfo.data.id;

    movieDescription.innerHTML = createUpcomingMovieMarkup(
      randomMovieInfo.data
    );

    toggleAddRemoveButton = document.querySelector('.test');
    setButtonName();
  } catch (error) {
    console.log(error);
  }
}

function setButtonName(movieId) {
  if (dataLocalStorage?.length === 0 || !dataLocalStorage) {
    Storage.save(STORAGE_KEY.myLibraryMoviesList, []);
    toggleAddRemoveButton.textContent = 'Add to my library';
    toggleAddRemoveButton.removeEventListener('click', onAddMovieBtnClick);
    toggleAddRemoveButton.addEventListener('click', onAddMovieBtnClick);
  } else {
    if (dataLocalStorage.some(({ id }) => id === movieId)) {
      toggleAddRemoveButton.textContent = 'Remove from my library';
      toggleAddRemoveButton.removeEventListener('click', onRemoveBtnClick);
      toggleAddRemoveButton.addEventListener('click', onRemoveBtnClick);
    } else {
      toggleAddRemoveButton.textContent = 'Add to my library';
      toggleAddRemoveButton.removeEventListener('click', onAddMovieBtnClick);
      toggleAddRemoveButton.addEventListener('click', onAddMovieBtnClick);
    }
  }
}

function onRemoveBtnClick() {
  const localStorageData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
  const index = localStorageData.findIndex(({ id }) => id === movieId);
  const updateData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
  updateData.splice(index, 1);

  Storage.save(STORAGE_KEY.myLibraryMoviesList, updateData);
  toggleAddRemoveButton.textContent = 'Add to my library';
  toggleAddRemoveButton.removeEventListener('click', onRemoveBtnClick);
  toggleAddRemoveButton.addEventListener('click', onAddMovieBtnClick);
}

function onAddMovieBtnClick() {
  const localStorageData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
  const updateData = [...localStorageData, randomMovieInfo.data];
  Storage.save(STORAGE_KEY.myLibraryMoviesList, updateData);
  toggleAddRemoveButton.textContent = 'Remove from my library';
  toggleAddRemoveButton.removeEventListener('click', onAddMovieBtnClick);
  toggleAddRemoveButton.addEventListener('click', onRemoveBtnClick);
}

function createUpcomingMovieMarkup({
  id,
  backdrop_path,
  original_title,
  release_date,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
}) {
  const allGenres = genres.map(({ name }) => name).join(', ');
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
