import axios from 'axios';
import ApiMovie from './api/themoviedbAPI/fetch-movie';
// import { createMarkup } from './components/create-cards';

const list = document.querySelector('.card-list');

const apiMovie = new ApiMovie();

async function getTrendMovieOfWeek() {
  try {
    const response = await apiMovie.getTrend('week');
    const correctList = response.data.results.slice(0, 3);

    const infoFromCorr = correctList.map(async item => {
      const DetailedInformation = await apiMovie.getMovieInfo(item.id);
      return DetailedInformation;
    });
    console.log(infoFromCorr);
    // const getMarkup = await createMarkup(infoFromCorr);
    // console.log(getMarkup);

    const moviCard = await Promise.allSettled(infoFromCorr);
    const createCardMarkup = moviCard
      .map(item => {
        const {
          poster_path,
          genres,
          original_title,
          release_date,
          vote_average,
        } = item.value.data;

        const markup = `<li class="card-list-item">
      <img
        src="https://image.tmdb.org/t/p/original${poster_path}"
        alt="${original_title}"
        class="card-list-img"
        width="395"
        height="574"
      />
      <div class="card-overlay"></div>
      <div class="text-wrapper">
        <h2 class="text-wrapper-filmName">${original_title}</h2>
        <p class="text-wrapper-nameAndGenres">
          ${genres[1].name} | ${release_date.slice(0, 4)}
        </p>
      </div>
      <span class="card-list-rating">${Math.ceil(vote_average)}</span>
    </li>`;

        return markup;
      })
      .join('');

    // console.log(createCardMarkup);

    list.innerHTML = createCardMarkup;
  } catch (error) {
    console.log('Error:', error);
  }
}

getTrendMovieOfWeek();
