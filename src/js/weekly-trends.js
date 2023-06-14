import ApiMovie from './api/themoviedbAPI/fetch-movie';

import { createMarkupFilmsCards } from './components/createMarkupFilmCard';
import { Loader } from './loader';
const list = document.querySelector('.card-list');

const apiMovie = new ApiMovie();

const loader = new Loader();

async function getTrendMovieOfWeek() {
  try {
    loader.onShow();
    const response = await apiMovie.getTrend('week');

    const correctList = response.data.results.slice(0, 3);

    list.innerHTML = await createMarkupFilmsCards(correctList);
  } catch (error) {
    console.log('Error:', error);
  }
  loader.onClose();
}

getTrendMovieOfWeek();
