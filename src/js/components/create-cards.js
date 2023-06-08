////////// ФУНКЦІЯ ОЧІКУЄ ПРОМІСИ ПІСЛЯ ВИКЛИКУ ФУНКЦІЇ apiMovie.getMovieInfo(id) //////////

async function createMarkup(responsData) {
  const moviCard = await Promise.allSettled(responsData);
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
      //   console.log(markup);
      return markup;
    })
    .join('');

  return createCardMarkup;
}

export { createMarkup };
