import ApiMovie from './fetch-movie';

// Елементи DOM
const searchForm = document.querySelector('#catalog-gallery-form');
const searchInput = document.querySelector('#catalog-gallery-input');
const searchSelect = document.querySelector('#catalog-gallery-select');
const movieList = document.querySelector('.catalog-gallery');
const paginationContainer = document.querySelector('.catalog-gallery-pagination');

// Ініціалізація API-класу для отримання фільмів
const apiMovie = new ApiMovie();

// Очищення пошукової форми
function clearSearchForm() {
    searchInput.value = '';
}

// Відображення повідомлення про відсутність результатів пошуку
function showNoResultsMessage() {
    movieList.innerHTML = '<p>OOPS...We are very sorry! We don’t have any results matching your search.</p>';
}

// Відображення списку фільмів
function renderMovieList(movies) {
    if (!movies || movies.length === 0) {
        showNoResultsMessage();
        return;
    }
    
    movieList.innerHTML = '';
    for (const movie of movies) {
        // Створення DOM-елементів для відображення фільмів
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');

        const img = document.createElement('img');
        img.src = movie.poster_url;

        movieItem.innerHTML = `<h2>${movie.title}</h2><p>${movie.overview}</p>`;

        movieItem.appendChild(img);

        movieList.appendChild(movieItem);
    }
}

// Оновлення варіантів років у випадаючому списку
function renderYears(years) {
    const selectOptions = years.map(year => `<option value="${year}">${year}</option>`).join('');
    searchSelect.innerHTML = `<option value="">Year</option>${selectOptions}`;
}

// Обробник події відправки форми
function handleFormSubmit(event) {
    event.preventDefault();

    const searchQuery = searchInput.value;
    const selectedYear = searchSelect.value;

  // Скидання сторінки на початок при новому пошуку
    apiMovie.resetPage();

  // Виклик методу пошуку за ключовим словом та роком
    apiMovie.searchByQueryYear(searchQuery, selectedYear)
        .then(results => {
            renderMovieList(results);
        })
        .catch(error => {
            console.log(error);
        });
}

// Додавання обробника події на форму пошуку
searchForm.addEventListener('submit', handleFormSubmit);

// Ініціалізація рендеру фільмів при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    apiMovie.getTrend('week')
        .then(response => {
            const movieResults = response.data.results;
            console.log(movieResults); // Вивести результати в консоль
            renderMovieList(movieResults);

            // Отримання років з фільмів
            const years = movieResults.map(movie => movie.release_year);
            const uniqueYears = [...new Set(years)];

            // Оновлення варіантів років у випадаючому списку
            renderYears(uniqueYears);
        })
        .catch(error => {
            console.log(error);
        });
});
