import ApiMovie from './api/themoviedbAPI/fetch-movie';

import { ServiceAddRemoveBtn } from './api/ServiceAddRemoveBtn/ServiceAddRemoveBtnAPI';

const apiMovie = new ApiMovie();
const IMAGE_URL = 'https://image.tmdb.org/t/p/original/';

const movieDescription = document.querySelector('.movieDescription');
const buttonAddLibrary = document.querySelector('.button-accent');
// buttonAddLibrary.addEventListener("click", addRemoveMovie)


getNewFilms();


async function getNewFilms() {
  try {
    const response = await apiMovie.getNewFilms();
    const randomFilm = randomElement(response.data.results);

    const movie = await apiMovie.getMovieInfo(randomFilm.id);

    movieDescription.innerHTML = createUpcomingMovieMarkup(movie.data);

    const addRemoveBtn = document.querySelector('.add-remove-btn');

    const serviceAddRemoveBtn = new ServiceAddRemoveBtn(addRemoveBtn, movie);

    serviceAddRemoveBtn.setButtonName();
  } catch (error) {
    console.log(error);
  }
}

function randomElement(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
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
    <button type="button" class="add-remove-btn button-accent"></button>
  </div>`;
}
