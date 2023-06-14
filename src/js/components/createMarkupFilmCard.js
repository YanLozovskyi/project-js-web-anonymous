import ApiMovie from '../api/themoviedbAPI/fetch-movie';
import { getStar } from './getStar';
import comingSoonImg from '../../images/team-photo/photo_yan.avif';
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
        const movieSrc = getImg(poster_path, original_title);
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
        ${movieSrc}
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

function getImg(poster, title) {
  if (poster === null || !poster) {
    return `src='${comingSoonImg}' alt='${title}'`;
  }

  return `
    srcset="
                https://image.tmdb.org/t/p/w500/${poster} 500w,
                https://image.tmdb.org/t/p/w300/${poster} 342w,
                https://image.tmdb.org/t/p/w185/${poster} 185w"
        src="https://image.tmdb.org/t/p/w500/${poster}"

        " sizes=" (min-width: 768px) 500px, (min-width: 480px) 342px, (min-width: 320px) 185px, 100vw"   
     alt='${title}'`;
}
