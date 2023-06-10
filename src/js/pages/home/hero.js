import ApiMovie from '../../api/themoviedbAPI/fetch-movie';
const apiMovie = new ApiMovie();
const IMG_URL = 'https://image.tmdb.org/t/p/original/';

const contentPath = document.querySelector('.hero-content');

// --------------------------ТЕСТ - Трендові фільми дня та тижня

async function getTrendMovieOfDay() {
  try {
    const response = await apiMovie.getTrend('day');

    const randomFilm = randomElement(response.data.results);

    createMarkup(randomFilm, contentPath);
  } catch (error) {
    console.log('Error:', error);
  }
}

getTrendMovieOfDay();

export function createMarkup(response, path) {
  const markup = response
    .map(({ original_title, overview, backdrop_path }) => {
      return `<div class="hero-film_background" style="background-image: url(${IMG_URL}${backdrop_path})""></div>
        
        <div class=" hero-wrap">

  <h1 class="hero-title">${original_title}</h1>
  <p class="hero-description-js">${overview}</p>
  <div class="hero-buttons">

    <button class="hero-button-trailer">
      Watch trailer
    </button>

    <button class="hero-button-moredetails">
      More details
    </button>
  </div>
</div>`;
    })
    .join('');
  path.innerHTML = markup;
}

export function randomElement(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand]];
}
