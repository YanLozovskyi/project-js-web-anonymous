import ApiMovie from '../../api/themoviedbAPI/fetch-movie';
import { refs } from './catalog-refs';
import {
  createMarkupFilmCard,
  createMarkupFilmsCards,
} from '../../components/createMarkupFilmCard';

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
let page;

searchForm.addEventListener('submit', handleFormSubmit);
// clearButton.addEventListener('click', handleClearButtonClick);
getTrend();

// Оновлення вмісту галереї фільмів
async function getTrend() {
  try {
    const response = await apiMovie.getTrend('week');
    const movies = response.data.results;

    updateGallery(movies);
  } catch (error) {
    console.log(error);
  }
}

// Пошук фільмів за ключовим словом та роком
async function handleFormSubmit(event) {
  event.preventDefault();
  const query = searchInput.value.trim();
  page = 1;

  if (query || currentYear) {
    apiMovie.query = query;
    try {
      const response = await apiMovie.searchByQueryYear(page);
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

// Обробник події submit форми
// function handleFormSubmit(event) {
//   event.preventDefault();
//   searchMovies();
// }

// Обробник події click кнопки очищення поля
// function handleClearButtonClick() {
//   clearInput();
//   searchMovies();
// }

// Обробник події change селекта року
function handleYearSelectChange() {
  currentYear = searchSelect.value;
  searchMovies();
}

// Очищення пошукового поля
function handleClearButtonClick(event) {
  event.preventDefault();
  searchInput.value = '';
}

// searchSelect.addEventListener('change', handleYearSelectChange);

async function updateGallery(movies) {
  searchGallery.innerHTML = '';

  if (movies.length === 0) {
    searchGallery.innerHTML =
      '<p class="catalog-message"><span>OOPS...</span><span>We are very sorry!</span><span>We don’t have any results matching your search.</span></p >';
  } else {
    searchGallery.innerHTML = await createMarkupFilmsCards(movies);
  }
}

// function createMarkupFilmsCards(movieList) {
//   return movieList.map(film => createMarkupFilmCard(film)).join('');
// }

// Отримання списку років для селекта

// async function getNewFilms(page) {

// }
// apiMovie
//   .getNewFilms(1)
//   .then(async response => {
//     const movies = response.data.results;
//     const years = new Set();

//     movies.forEach(movie => {
//       const releaseYear = new Date(movie.release_date).getFullYear();
//       years.add(releaseYear);
//     });
//     for (const year of years) {
//       const option = document.createElement('option');
//       option.value = year;
//       option.textContent = year;
//       searchSelect.appendChild(option);
//     }
//   })
//   .catch(error => {
//     console.log(error);
//   });

// // Отримання трендових фільмів тижня

// apiMovie
//   .getTrend('week')
//   .then(async response => {
//     const movies = response.data.results;
//     if (movies.length === 0) {
//       searchGallery.innerHTML =
//         '<p class="catalog-message"><span>OOPS...</span><span>We are very sorry!</span><span>We don’t have any results matching your search.</span></p>';
//     } else {
//       updateGallery(movies);
//     }
//   })
//   .catch(error => {
//     console.log(error);
//   });
