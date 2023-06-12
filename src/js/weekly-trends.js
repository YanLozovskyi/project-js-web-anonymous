import ApiMovie from './api/themoviedbAPI/fetch-movie';

import { createMarkupFilmsCards } from './components/createMarkupFilmCard';

const list = document.querySelector('.card-list');

const apiMovie = new ApiMovie();

async function getTrendMovieOfWeek() {
  try {
    const response = await apiMovie.getTrend('week');

    const correctList = response.data.results.slice(0, 3);

    list.innerHTML = await createMarkupFilmsCards(correctList);
  } catch (error) {
    console.log('Error:', error);
  }
}

getTrendMovieOfWeek();
