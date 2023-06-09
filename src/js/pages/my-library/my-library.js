import ApiMovie from '../../api/themoviedbAPI/fetch-movie';
import Storage from '../../api/localStorageAPI/localStorageAPI';
import { STORAGE_KEY } from '../../localStorageKey/localStorageKey';
import { refs } from './refs';
import { markupContentTextMessage } from './markupContentTextMessage';

import { movies } from './ds'; //!
Storage.save(STORAGE_KEY.myLibraryMoviesList, movies);

// import { moviesNull } from './ds'; //!
// Storage.save(STORAGE_KEY.myLibraryMoviesList, moviesNull);

const apiMovie = new ApiMovie();

const PER_PAGE = 3;

let correctGenre = 'All';
let totalPage;
let page = 0;
let startIndex = 0;
let endIndex = 0;
let correctGenreMovieList = [];

const dataStorage = Storage.load(STORAGE_KEY.myLibraryMoviesList);

renderContentBasedOnConditions();
//! замінити на компонентний клас який створює картку
function createLi() {
  return `<li class="my-library-item"></li>`;
}

function markupCards(arr) {
  return arr.map(() => createLi()).join('');
}

async function renderContentBasedOnConditions() {
  if (dataStorage) {
    try {
      //? Отримую унікальні ID жанрів фільмів, які є у localStorage
      const uniqueIdGenres = dataStorage
        .reduce((acc, el) => [...acc, ...el.genre_ids], [])
        .filter((id, i, array) => array.indexOf(id) === i);

      const response = await apiMovie.getGenresList();

      //? За допомогою функції createSelectOptionMarkup отримую розмітку з жанром, і вставляю у розмітку
      response.data.genres
        .filter(el => uniqueIdGenres.includes(el.id))
        .forEach(el =>
          refs.genreList.insertAdjacentHTML(
            'beforeend',
            createSelectOptionMarkup(el)
          )
        );

      refs.genreList.addEventListener('change', onSelectGenreListChange);
      renderLibraryCards(dataStorage);
    } catch (error) {
      console.log(error);
    }
  } else {
    refs.genreList.removeEventListener('change', onSelectGenreListChange);
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
    return el.genre_ids.includes(correctGenre);
  });
  renderLibraryCards(correctGenreMovieList);
}

function renderLibraryCards(movieList) {
  startIndex = 0;
  endIndex = PER_PAGE;
  refs.moviesList.innerHTML = '';
  refs.loadMoreButton.style.display = 'none';
  if (movieList.length > PER_PAGE) {
    refs.loadMoreButton.style.display = 'block';
    refs.loadMoreButton.addEventListener('click', onloadMoreButtonClick);
    localStoragePagination(startIndex, endIndex, movieList);
  } else {
    refs.moviesList.innerHTML = markupCards(movieList);
  }
}

function onloadMoreButtonClick() {
  startIndex += PER_PAGE;
  endIndex += PER_PAGE;

  if (correctGenre === 'All') {
    localStoragePagination(startIndex, endIndex, dataStorage);
  } else {
    localStoragePagination(startIndex, endIndex, correctGenreMovieList);
  }
}

function localStoragePagination(start, end, data) {
  page += 1;

  totalPage = data.length / PER_PAGE;

  if (totalPage > page) {
    const pagination = data.slice(start, end);

    refs.moviesList.insertAdjacentHTML('beforeend', markupCards(pagination));
  } else {
    const pagination = data.slice(start, end);
    refs.moviesList.insertAdjacentHTML('beforeend', markupCards(pagination));

    refs.loadMoreButton.style.display = 'none';
  }
}

// class LocalStoragePagination {

// }
