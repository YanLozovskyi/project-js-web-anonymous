import axios from 'axios';
import ApiMovie from './api/themoviedbAPI/fetch-movie';

const apiMovie = new ApiMovie();

async function getTrendMovieOfWeek() {
  try {
    const response = await apiMovie.getTrend('week');
    console.log('Трендові фільми тижня :', response.data.results);
  } catch (error) {
    console.log('Error:', error);
  }
}
getTrendMovieOfWeek();

// console.log(apiMovie);
const markup = `<li class="weekly-trends-item">
          <a href="" class="weekly-trends-imgLink"
            ><img src="" alt="" class="weekly-trends-img"
          /></a>
          <div class="weekly-trends-textWrapper">
            <p class="weekly-trends-text"></p>
            <span class="weekly-trends-rating"></span>
          </div>
        </li>`;
