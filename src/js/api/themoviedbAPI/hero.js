import ApiMovie from './fetch-movie';
const apiMovie = new ApiMovie();
const IMG_URL = 'https://image.tmdb.org/t/p/original/';

const contentPath = document.querySelector('.hero-content');

// --------------------------ТЕСТ - Трендові фільми дня та тижня

async function getTrendMovieOfDay() {
  try {
    const response = await apiMovie.getTrend('day');

    const randomFilm = randomElement(response.data.results);
    console.log(response);

    if ([].length === 0) {
      createDefaultMarkup(contentPath);

      DefaultMarkupTextContent();
    } else {
      createMarkupFilm(randomFilm, contentPath);
    }

    createDefaultMarkup(response.data.results, contentPath);
  } catch (error) {
    console.log('Error:', error);
  }
}

getTrendMovieOfDay();

export function createMarkupFilm(response, path) {
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

function createDefaultMarkup(path) {
  const markup = `
  
  <h1 class="hero-title-default">Let’s Make Your Own Cinema</h1>
    <p class="hero-description-default">Is a guide to creating a personalized movie theater experience. You'll need a projector,
      screen, and speakers.</p>

    <a class="hero-link" href="./catalog.html">Get Started</a>
    
    <div class="hero-picture-default">

</div>
`;
  path.innerHTML = markup;
}

export function randomElement(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand]];
}

function DefaultMarkupTextContent() {
  const heroDescription = document.querySelector('.hero-description-default');
  const heroContent = document.querySelector('.hero-content');

  heroContent.classList.add('hero-content-default');
  heroContent.classList.remove('hero-content');
  const screenSize = window.innerWidth;

  if (screenSize > 768) {
    heroDescription.textContent =
      "Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.";
  } else {
    heroDescription.textContent =
      "Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. ";
  }
}
