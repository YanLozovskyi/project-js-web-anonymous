const allGenres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Abenteuer',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Komödie',
  },
  {
    id: 80,
    name: 'Krimi',
  },
  {
    id: 99,
    name: 'Dokumentarfilm',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Familie',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'Historie',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Musik',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Liebesfilm',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV-Film',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'Kriegsfilm',
  },
  {
    id: 37,
    name: 'Western',
  },
];

function getGenreName(ids) {
  return ids.map(id => {
    const genre = allGenres.find(genre => genre.id === id);
    return genre ? genre.name : null;
  });
}

import { getStar } from './getStar';

export function createMarkupFilmCard({
  poster_path,
  genres,
  genre_ids,
  original_title,
  release_date,
  vote_average,
}) {
  let genre = '';
  if (genre_ids) {
    genre = getGenreName(genre_ids).slice(0, 2).join(' ');
  }
  if (genres) {
    genre = [genres[0]?.name, genres[1]?.name].join(' ');
  }
  return `<li class="card-list-item">
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
    </li>`;
}
