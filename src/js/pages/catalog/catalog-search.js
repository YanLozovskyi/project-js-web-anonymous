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
  mobileInput,
} = refs;

let currentYear = '';
let page;

searchForm.addEventListener('submit', handleFormSubmit);
clearButton.addEventListener('click', handleClearButtonClick);
searchInput.addEventListener('input', handleInputChange);

getTrend();

clearButton.style.display = 'none';

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

// Оновлення вмісту галереї фільмів
async function updateGallery(movies) {
  searchGallery.innerHTML = '';

  if (movies.length === 0) {
    searchGallery.innerHTML =
      '<p class="catalog-message"><span>OOPS...</span><span>We are very sorry!</span><span>We don’t have any results matching your search.</span></p >';
  } else {
    searchGallery.innerHTML = await createMarkupFilmsCards(movies);
  }
}

//.......КНОПКА-Х

// Очищення пошукового поля
function handleClearButtonClick(event) {
  event.preventDefault();
  searchInput.value = '';

  // Перевірка, чи пошукова строка пуста
  if (searchInput.value === '') {
    clearButton.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
  }
}

function handleInputChange() {
  if (searchInput.value !== '') {
    clearButton.style.display = 'block';
  } else {
    clearButton.style.display = 'none';
  }
}

//.......СЕЛЕКТ
// Обробник події change селекта року
function handleYearSelectChange() {
  currentYear = searchSelect.value;
  
  if (currentYear) {
    searchMovies();
  }
}

// Пошук фільмів за вибраним роком

async function searchMovies() {
  const query = searchInput.value.trim();
  page = 1;

  apiMovie.query = query;
  apiMovie.year = currentYear;

  try {
    const response = await apiMovie.searchByQueryYear(page);
    const movies = response.data.results;
    updateGallery(movies);
  } catch (error) {
    console.log(error);
  }
}

// Отримання років з фільмів
async function getYears() {
  try {
    const response = await apiMovie.getTrend('week');
    const movies = response.data.results;

    const years = new Set();

    movies.forEach(movie => {
      const releaseYear = new Date(movie.release_date).getFullYear();
      years.add(releaseYear);
    });

    // for (const movie of movies) {
    //   const releaseYear = new Date(movie.release_date).getFullYear();
    //   years.add(releaseYear);
    // }
    
    // Очистити вміст селекта
    searchSelect.innerHTML = '';

    // Додати початковий варіант "Year"
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Year';
    searchSelect.appendChild(defaultOption);

    // Додавання років як варіантів до селекта
    for (const year of years) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      searchSelect.appendChild(option);
    }
  } catch (error) {
    console.log(error);
  }
}

// Викликати функцію для отримання списку років при завантаженні сторінки
getYears();

searchSelect.addEventListener('change', handleYearSelectChange);