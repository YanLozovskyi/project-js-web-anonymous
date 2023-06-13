import Storage from '../../api/localStorageAPI/localStorageAPI';
import { STORAGE_KEY } from '../../localStorageKey/localStorageKey';
import { refs } from './refs';
import { createMarkupFilmsCards } from '../../components/createMarkupFilmCard';
import { markupContentTextMessage } from './markupContentTextMessage';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const PER_PAGE = 6;

let correctGenre = 'All';
let totalPage;
let page = 0;
let startIndex = 0;
let endIndex = 0;
let correctGenreMovieList = [];

const dataStorage = Storage.load(STORAGE_KEY.myLibraryMoviesList);

renderContentBasedOnConditions();

document.addEventListener('click', function (e) {
  if (e.target.dataset.action === 'add-remove-to-my-library') {
    const dataStorage = Storage.load(STORAGE_KEY.myLibraryMoviesList);
    renderLibraryCards(dataStorage);
  }
});

function renderContentBasedOnConditions() {
  if (dataStorage?.length === 0) {
    refs.genreList.removeEventListener('change', onSelectGenreListChange);
    refs.myLibrarySection.classList.add(
      'my-library-content-text-message-section'
    );
    refs.libraryContent.innerHTML = markupContentTextMessage();
  } else if (dataStorage) {
    //? Отримую унікальні ID жанрів фільмів, які є у localStorage і за допомогою функції createSelectOptionMarkup отримую розмітку з жанром, і вставляю у select
    dataStorage
      .reduce((acc, el) => [...acc, ...el.genres], [])
      .filter(
        (genre, index, self) =>
          index ===
          self.findIndex(g => g.id === genre.id && g.name === genre.name)
      )
      .forEach(el =>
        refs.genreList.insertAdjacentHTML(
          'beforeend',
          createSelectOptionMarkup(el)
        )
      );

    new SlimSelect({
      select: '#my-library-genre-list',
      settings: {
        // showSearch: false, //? Приберає поле пошуку
        searchText: 'No genre',
      },
    });

    refs.genreList.addEventListener('change', onSelectGenreListChange);
    renderLibraryCards(dataStorage);
  } else {
    refs.genreList.removeEventListener('change', onSelectGenreListChange);
    refs.myLibrarySection.classList.add(
      'my-library-content-text-message-section'
    );
    refs.libraryContent.innerHTML = markupContentTextMessage();
  }
}

function createSelectOptionMarkup({ id, name }) {
  return ` <option value="${id}">${name}</option>`;
}

function onSelectGenreListChange(e) {
  page = 0;
  correctGenre = Number(e.currentTarget.value);

  if (!correctGenre) {
    correctGenre = 'All';
    renderLibraryCards(dataStorage);
    return;
  }
  correctGenreMovieList = dataStorage.filter(el => {
    return el.genres.some(genre => genre.id === correctGenre);
  });
  renderLibraryCards(correctGenreMovieList);
}

async function renderLibraryCards(movieList) {
  startIndex = 0;
  endIndex = PER_PAGE;
  refs.moviesList.innerHTML = '';
  refs.loadMoreButton.style.display = 'none';
  if (movieList.length > PER_PAGE) {
    refs.loadMoreButton.style.display = 'block';
    refs.loadMoreButton.addEventListener('click', onloadMoreButtonClick);
    localStoragePagination(startIndex, endIndex, movieList);
  } else {
    refs.moviesList.innerHTML = await createMarkupFilmsCards(movieList);
  }
}

function onloadMoreButtonClick() {
  refs.loadMoreButton.blur();

  startIndex += PER_PAGE;
  endIndex += PER_PAGE;

  if (correctGenre === 'All') {
    localStoragePagination(startIndex, endIndex, dataStorage);
  } else {
    localStoragePagination(startIndex, endIndex, correctGenreMovieList);
  }
}

async function localStoragePagination(start, end, data) {
  page += 1;

  totalPage = data.length / PER_PAGE;

  if (totalPage > page) {
    const pagination = data.slice(start, end);

    refs.moviesList.insertAdjacentHTML(
      'beforeend',
      await createMarkupFilmsCards(pagination)
    );
  } else {
    const pagination = data.slice(start, end);
    refs.moviesList.insertAdjacentHTML(
      'beforeend',
      await createMarkupFilmsCards(pagination)
    );

    refs.loadMoreButton.style.display = 'none';
  }
}
