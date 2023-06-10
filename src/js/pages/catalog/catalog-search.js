import ApiMovie from '../../api/themoviedbAPI/fetch-movie';
import { refs } from './catalog-refs';

const IMG_URL = 'https://image.tmdb.org/t/p/original/';

// Ініціалізація API-класу для отримання фільмів
const apiMovie = new ApiMovie();

const {
  searchForm,
  searchInput,
  searchSelect,
  searchGallery,
  clearButton,
  pagination,
} = refs;

let currentYear = '';

// Оновлення вмісту галереї фільмів
function updateGallery(movies) {
  searchGallery.innerHTML = '';

  if (movies.length === 0) {
    searchGallery.innerHTML =
      '<p class="catalog-message"><span>OOPS...</span><span>We are very sorry!</span><span>We don’t have any results matching your search.</span></p >';
  } else {
    movies.forEach(movie => {
      // код для відображення фільмів у галереї
      const movieElement = document.createElement('div');
      const movieTitle = document.createElement('h2');
      const movieOverview = document.createElement('p');
      const movieReleaseDate = document.createElement('p');
      const moviePoster = document.createElement('img');

      movieTitle.textContent = movie.title;
      movieOverview.textContent = `Overview: ${movie.overview}`;
      movieReleaseDate.textContent = `Release Date: ${movie.release_date}`;
      moviePoster.src = `${IMG_URL}${movie.poster_path}`;

      movieElement.appendChild(moviePoster);
      movieElement.appendChild(movieTitle);
      movieElement.appendChild(movieOverview);
      movieElement.appendChild(movieReleaseDate);

      searchGallery.appendChild(movieElement);
    });
  }
}

// Очищення пошукового поля
function clearInput() {
  searchInput.value = '';
}

// Обробник події submit форми
function handleFormSubmit(event) {
  event.preventDefault();
  searchMovies();
}

// Обробник події click кнопки очищення поля
function handleClearButtonClick() {
  clearInput();
  searchMovies();
}

// Обробник події change селекта року
function handleYearSelectChange() {
  currentYear = searchSelect.value;
  searchMovies();
}

// Пошук фільмів за ключовим словом та роком
async function searchMovies() {
  const query = searchInput.value.trim();

  if (query || currentYear) {
    apiMovie.query = query;
    try {
      const response = await apiMovie.searchByQueryYear(1);
      const movies = response.data.results;
      updateGallery(movies);
    } catch (error) {
      console.log(error);
    }
  } else {
    searchGallery.innerHTML =
      '<p class="catalog-message"><span>OOPS...</span><span>We are very sorry!</span><span>We don’t have any results matching your search.</span></p>';
  }
}

// Додавання обробників подій
searchForm.addEventListener('submit', handleFormSubmit);
// clearButton.addEventListener('click', handleClearButtonClick);
searchSelect.addEventListener('change', handleYearSelectChange);

// Отримання списку років для селекта
apiMovie
  .getNewFilms(1)
  .then(async response => {
    const movies = response.data.results;
    const years = new Set();
    movies.forEach(movie => {
      const releaseYear = new Date(movie.release_date).getFullYear();
      years.add(releaseYear);
    });
    for (const year of years) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      searchSelect.appendChild(option);
    }
  })
  .catch(error => {
    console.log(error);
  });

// Отримання трендових фільмів тижня
apiMovie
  .getTrend('week')
  .then(async response => {
    const movies = response.data.results;
    if (movies.length === 0) {
      searchGallery.innerHTML =
        '<p class="catalog-message"><span>OOPS...</span><span>We are very sorry!</span><span>We don’t have any results matching your search.</span></p>';
    } else {
      updateGallery(movies);
    }
  })
  .catch(error => {
    console.log(error);
  });
