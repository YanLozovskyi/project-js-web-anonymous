import ApiMovie from '../../api/themoviedbAPI/fetch-movie';
import { randomElement, createMarkup } from '../home/hero';

const apiMovie = new ApiMovie();

const catalogPath = document.querySelector('.hero-catalog');

async function getTrendMovieOfDay() {
  try {
    const response = await apiMovie.getTrend('day');
    const randomFilm = randomElement(response.data.results);
    createMarkup(randomFilm, catalogPath);
  } catch (error) {
    console.log('Error:', error);
  }
}

getTrendMovieOfDay();
