import axios from 'axios';
import ApiMovie from './api/themoviedbAPI/fetch-movie';

const list = document.querySelector('.weekly-trends-list');

const apiMovie = new ApiMovie();

async function getTrendMovieOfWeek() {
  try {
    const response = await apiMovie.getTrend('week');
    const correctList = response.data.results.slice(0, 3);
    const infoFromCorr = correctList.map(async item => {
      const DetailedInformation = await apiMovie.getMovieInfo(item.id);
      return DetailedInformation;
    });
    const moviCard = await Promise.allSettled(infoFromCorr);
    const createCardMarkup = moviCard.map(item => console.log(item));
    console.log(createCardMarkup);

    // console.log(infoFromCorr);
    // const infoGet = await apiMovie.getMovieInfo(569094);
    // console.log(infoGet);
    //     console.log('Трендові фільми тижня :', correctList);

    // console.log(createMarkup);
  } catch (error) {
    console.log('Error:', error);
  }
}

getTrendMovieOfWeek();

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
