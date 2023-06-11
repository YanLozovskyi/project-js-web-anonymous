import ApiMovie from '../api/themoviedbAPI/fetch-movie';
import { getStar } from './getStar';
const apiMovie = new ApiMovie();

let genresList = [];

export async function createMarkupFilmsCards(movieList) {
  try {
    const response = await apiMovie.getGenresList();
    genresList = response.data.genres;
  } catch (error) {
    console.log(error);
  }

  return movieList
    .map(
      ({
        id,
        poster_path,
        genres,
        genre_ids,
        original_title,
        release_date,
        vote_average,
      }) => {
        let genre = '';
        if (genre_ids?.length === 0) {
          genre = 'Unknown Genre';
        } else if (genre_ids) {
          genre = getGenreName(genre_ids).slice(0, 1).join(' ');
        }
        if (genres?.length === 0) {
          genre = 'Unknown Genre';
        } else if (genres) {
          genre = [genres[0]?.name].join(' ');
        }
        return `<li data-movie_id="${id}" class="card-list-item">
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
          ${genre} | ${release_date.slice(0, 4)}
        </p>
      </div>
      <span class="card-list-rating">${getStar(vote_average)}</span>
    </li>
    `;
      }
    )
    .join('');
}

function getGenreName(ids) {
  try {
    return ids.map(id => {
      const genre = genresList.find(genre => genre.id === id);
      return genre ? genre.name : null;
    });
  } catch (error) {
    return ['Unknown Genre'];
  }
}
