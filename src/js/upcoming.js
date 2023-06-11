import ApiMovie from './api/themoviedbAPI/fetch-movie';

const apiMovie = new ApiMovie();
const IMAGE_URL = 'https://image.tmdb.org/t/p/original/';

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
    console.log(response);
    const example = await apiMovie.getMovieInfo(569094);
    console.log(example);
    getNewFilm(example.data);
  } catch (error) {
    console.log(error);
  }
  //569094
}

getNewFilms();

// console.log(apiMovie.getNewFilms())

//   addEventListener.buttonAddLibrary("click", getMovieInfo)

function getNewFilm(data) {
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
  const allGenres = genres.map(genre => {
    return genre.name;
  });
  const markup = `
    <div class="image-upcoming">
            <img class="gallery-item__img" src="${IMAGE_URL}${backdrop_path}" 
            alt="movie" width="280" height="auto" loading="lazy"/>  
    </div>
              <div class="gallery-item" id="${id}">
               <h3 class="info-item-title">${original_title}</h3> 
    <div class="info">
          <p class="info-item selection"><b>Release date</b>${release_date}</p>
          <p class="info-item"><b>Vote / Votes</b>${vote_average} / ${vote_count}</p>
          <p class="info-item"><b>Popularity</b>${popularity}</p>
          <p class="info-item"><b>Genre </b>${allGenres}</p>
          </div>
          <div class="info-item-about">
          <p class="info-item-about-movie"><b>About</b>${overview}</p>
          </div>
                 </div>`;
  
  movieDescription.innerHTML = markup;
}
