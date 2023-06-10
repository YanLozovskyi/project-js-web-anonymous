import ApiMovie from './api/themoviedbAPI/fetch-movie';
// import { createMarkup } from './components/create-cards';
import { halfStarSVG, fullStarSVG, emptyStarSVG } from './components/stars';

const list = document.querySelector('.card-list');

const apiMovie = new ApiMovie();

async function getTrendMovieOfWeek() {
  try {
    const response = await apiMovie.getTrend('week');
    const correctList = response.data.results.slice(0, 3);
    console.log(correctList);

    const infoFromCorr = correctList.map(async item => {
      const DetailedInformation = await apiMovie.getMovieInfo(item.id);
      return DetailedInformation;
    });

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
      <div class="card-list-rating">${getStar(vote_average)}</div>
      <div class="card-overlay"></div>
      <div class="text-wrapper">
        <div><h2 class="text-wrapper-filmName">${original_title}</h2>
        <p class="text-wrapper-nameAndGenres">
          ${genres[1].name} | ${release_date.slice(0, 4)}
        </p></div>
      
      </div>
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

function getStar(params) {
  let rating = '';

  const averageCount = Math.round(params);
  switch (averageCount) {
    case 0:
      rating = `${emptyStarSVG.repeat(5)}`;
      break;
    case 1:
      rating = `${halfStarSVG}${emptyStarSVG.repeat(4)}`;
      break;
    case 2:
      rating = `${fullStarSVG}${emptyStarSVG.repeat(4)}`;
      break;
    case 3:
      rating = `${fullStarSVG}${halfStarSVG}${emptyStarSVG.repeat(3)}`;
      break;
    case 4:
      rating = `${fullStarSVG.repeat(2)}${emptyStarSVG.repeat(3)}`;
      break;
    case 5:
      rating = `${fullStarSVG.repeat(2)}${halfStarSVG}${emptyStarSVG.repeat(
        2
      )}`;
      break;
    case 6:
      rating = `${fullStarSVG.repeat(3)}${emptyStarSVG.repeat(2)}`;
      break;
    case 7:
      rating = `${fullStarSVG.repeat(3)}${halfStarSVG}${emptyStarSVG}`;
      break;
    case 8:
      rating = `${fullStarSVG.repeat(4)}${emptyStarSVG}`;
      break;
    case 9:
      rating = `${fullStarSVG.repeat(4)}${halfStarSVG}`;
      break;
    case 10:
      rating = `${fullStarSVG.repeat(5)}`;
      break;
    default:
      throw new Error('Invalid rating');
  }

  return rating;
}
