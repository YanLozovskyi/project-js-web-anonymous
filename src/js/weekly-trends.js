import axios from 'axios';
import ApiMovie from './api/themoviedbAPI/fetch-movie';

const list = document.querySelector('.weekly-trends-list');

const apiMovie = new ApiMovie();

async function getTrendMovieOfWeek() {
  try {
    const response = await apiMovie.getTrend('week');
    const correctList = response.data.results.slice(0, 3);

    const createMarkup = correctList
      .map(item => {
        console.log(item);
        console.log(apiMovie.getMovieInfo(item.id));
        return `<li class="weekly-trends-item">
      <a href="#" class="weekly-trends-imgLink"
        ><img src="${item.poster_path}" alt="${
          item.original_title
        }" class="weekly-trends-img"
      /></a>
      <div class="weekly-trends-textWrapper">
        <p class="weekly-trends-filmName">${item.original_title}</p>
        <p class="weekly-trends-genre"></p>
        <p class="weekly-trends-date">${item.release_date.slice(0, 4)}</p>
        <span class="weekly-trends-rating">${Math.ceil(
          item.vote_average
        )}</span>
      </div>
    </li>`;
      })
      .join('');

    //     console.log('Трендові фільми тижня :', correctList);

    // console.log(createMarkup);
    // list.innerHTML = createMarkup;
  } catch (error) {
    console.log('Error:', error);
  }
}

getTrendMovieOfWeek();

const movieId = 245891;
console.log(apiMovie.getMovieInfo(movieId));

// console.log(apiMovie.getGenresList());
// const markup = `<li class="weekly-trends-item">
//   <a href="#" class="weekly-trends-imgLink"
//     ><img src="" alt="" class="weekly-trends-img"
//   /></a>
//   <div class="weekly-trends-textWrapper">
//     <p class="weekly-trends-filmName"></p>
//     <p class="weekly-trends-genre"></p>
//     <p class="weekly-trends-date"></p>
//     <span class="weekly-trends-rating"></span>
//   </div>
// </li>`;
