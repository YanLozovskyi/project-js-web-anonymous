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
    const createCardMarkup = moviCard
      .map(item => {
        const {
          backdrop_path,
          genres,
          original_title,
          release_date,
          vote_average,
        } = item.value.data;

        const markup = `<li class="weekly-trends-item">
        <a href="#" class="weekly-trends-imgLink"
          ><img src="https://image.tmdb.org/t/p/original/${backdrop_path}" alt="${original_title}" class="weekly-trends-img"
        /></a>
        <div class="weekly-trends-textWrapper">
          <h2 class="weekly-trends-filmName">${original_title}</h2>
          <p class="weekly-trends-text">${
            genres[1].name
          } | ${release_date.slice(0, 4)}</p>
          <span class="weekly-trends-rating">${Math.ceil(vote_average)}</span>
        </div>
      </li>`;

        return markup;
      })
      .join('');

    console.log(createCardMarkup);

    list.innerHTML = createCardMarkup;
  } catch (error) {
    console.log('Error:', error);
  }
}

getTrendMovieOfWeek();
