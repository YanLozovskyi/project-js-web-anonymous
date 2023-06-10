import ApiMovie from './api/themoviedbAPI/fetch-movie';
import { halfStarSVG, fullStarSVG, emptyStarSVG } from './components/stars';
import { createMarkupFilmCard } from './components/createMarkupFilmCard';

const list = document.querySelector('.card-list');

const apiMovie = new ApiMovie();

function createMarkupFilmsCards(movieList) {
  return movieList.map(film => createMarkupFilmCard(film)).join('');
}

async function getTrendMovieOfWeek() {
  try {
    const response = await apiMovie.getTrend('week');

    const correctList = response.data.results.slice(0, 3);

    list.innerHTML = createMarkupFilmsCards(correctList);
  } catch (error) {
    console.log('Error:', error);
  }
}

getTrendMovieOfWeek();
