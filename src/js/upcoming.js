import ApiMovie from './api/themoviedbAPI/fetch-movie';

const apiMovie = new ApiMovie();
const IMAGE_URL = 'https://image.tmdb.org/t/p/original/';
import { randomElement } from './pages/home/hero';

// const apiMovie = new ApiMovie({
// id:569094,
// popularity: 2860.755,
// poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
// release_date: 2023-05-31,
// title: 'Spider-Man: Across the Spider-Verse',
// vote_average: 8.8,
// vote_count: 925
// });
// const response = await axios.get(`${BASE_URL}/?${params}`);
//     return response

const movieDescription = document.querySelector('.movieDescription');
const buttonAddLibrary = document.querySelector('.button-accent');

async function getNewFilms() {
  try {
    const response = await apiMovie.getNewFilms();

    const randomFilm = randomElement(response.data.results);

    const randomFilmId = randomFilm.map(film => film.id).join('');

    const movieInfo = await apiMovie.getMovieInfo(randomFilmId);

    console.log(movieInfo);
    createUpcomingMovieMarkup(movieInfo.data);
  } catch (error) {
    console.log(error);
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
  const markup = `
    <div class="image-upcoming">
    
            <img class="gallery-item__img" src="${IMAGE_URL}${backdrop_path}"
            alt="movie" loading="lazy"/>
    </div>
              <div class="gallery-item" id="${id}">
               <h3 class="info-item-title">${original_title}</h3>
    <div class="info">
    <div class="info-item-one-part">
          <p class="info-item"><b>Release date</b><span class="info-item-second">${release_date}</span></p>
          <p class="info-item"><b>Vote / Votes</b><span class="info-item-fourth vote-text">${vote_average}</span> / <span class="info-item-fourth vote-text">${vote_count}</span></p>
          </div>
     <div class="info-item-two-part">     
          <p class="info-item"><b>Popularity</b>${popularity}</p>
          <p class="info-item"><b>Genre </b>${allGenres}</p>
          </div>
          </div>
          <div class="info-item-about">
          <p class="info-item-about-movie"><b><span class="info-item-about-thirty">About</span></b>${overview}</p>
          </div>
          <button type="button" class="button-accent">Add to my library</button>
                 </div>`;

  movieDescription.innerHTML = markup;
}
