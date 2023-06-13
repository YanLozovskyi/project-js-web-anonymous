const IMAGE_URL = 'https://image.tmdb.org/t/p/original/';

const svgCloseIcon = `<svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="svg-close-icon" d="M11.25 11.25L0.75 0.75M11.25 0.75L0.75 11.25" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export function markupMovieCard({
  id,
  poster_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
}) {
  const allGenres = genres.map(({ name }) => name).join(', ');
  return `
<div class="pop-up-modal visual" id="modalPopUp">
  <button class="pop-up-modal__close" id="closeModalPopUp">
    ${svgCloseIcon}
  </button>
  <div class="pop-up-modal__container">
    <img src="${IMAGE_URL}${poster_path}" alt="image.png" class="pop-up-modal__img" />
    <div class="pop-card" id="${id}">
      <h2 class="pop-up-modal__title">${original_title}</h2>
      <div class="pop-up-modal__blok">
        <ul class="pop-up-modal__list">
          <li class="pop-up-modal__link">Vote / Votes</li>
          <li class="pop-up-modal__link">Popularity</li>
          <li class="pop-up-modal__link">Genre</li>
          <li class="pop-up-modal__link">ABOUT</li>
        </ul>
        <ul class="pop-up-modal__list">
          <li class="pop-up-modal__link-item item-votes">
            <div class="vote">${vote_average}</div>
            &nbsp;/&nbsp;
            <div class="votes">${vote_count}</div>
          </li>
          <li class="pop-up-modal__link-item popularity">${popularity}</li>
          <li class="pop-up-modal__link-item genres">${allGenres}</li>
        </ul>
      </div>
      <div class="pop-up-modal__about">
        <p class="pop-up-modal__about-txt">${overview}</p>
      </div>
        <button
          class="add-remove-btn button-accent"
          type="button"
          data-type="action"
          data-action="add-to-my-library"
          >
        </button>
    </div>
  </div>
</div>
`;
}
