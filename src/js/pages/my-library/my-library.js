import ApiMovie from '../../api/themoviedbAPI/fetch-movie';
import Storage from '../../api/localStorageAPI/localStorageAPI';
import { STORAGE_KEY } from '../../localStorageKey/localStorageKey';
import { refs } from './refs';
// import { movies } from './ls';
import { createMarkupFilmCard } from '../../components/createMarkupFilmCard';
import { markupContentTextMessage } from './markupContentTextMessage';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const PER_PAGE = 3;

let correctGenre = 'All';
let totalPage;
let page = 0;
let startIndex = 0;
let endIndex = 0;
let correctGenreMovieList = [];

createlocalStorage();

//? якщо у localStorage масив об'єктів фільмів
const dataStorage = Storage.load(STORAGE_KEY.myLibraryMoviesList);

renderContentBasedOnConditions();

function renderContentBasedOnConditions() {
  if (dataStorage) {
    //? Отримую унікальні ID жанрів фільмів, які є у localStorage і за допомогою функції createSelectOptionMarkup отримую розмітку з жанром, і вставляю у select
    const allGenres = dataStorage
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
    refs.moviesList.innerHTML = createMarkupFilmsCards(movieList);
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

    refs.moviesList.insertAdjacentHTML(
      'beforeend',
      createMarkupFilmsCards(pagination)
    );
  } else {
    const pagination = data.slice(start, end);
    refs.moviesList.insertAdjacentHTML(
      'beforeend',
      createMarkupFilmsCards(pagination)
    );

    refs.loadMoreButton.style.display = 'none';
  }
}

function createMarkupFilmsCards(movieList) {
  return movieList.map(film => createMarkupFilmCard(film)).join('');
}

// console.log('createMarkupFilmsCards(movies):', createMarkupFilmsCards(movies));

//! заглушки

function createlocalStorage() {
  const apiMovie = new ApiMovie();
  const arrIds = [
    569094, 840326, 667538, 842675, 298618, 980078, 943788, 869626, 455476,
    985617, 842544, 976573, 1016084, 614479, 335977, 884605, 994128, 942199,
    747188, 717930, 31343,
  ];
  const arrLS = [];
  arrIds.forEach(async id => {
    const DetailedInformation = await apiMovie.getMovieInfo(id);
    arrLS.push(DetailedInformation.data);
    Storage.save(STORAGE_KEY.myLibraryMoviesList, arrLS);
  });
}

// //? якщо у localStorage масив IDs фільмів
// const dataStorage = name();
// console.log('dataStorage:', dataStorage);

// async function name() {
//   return await Promise.allSettled(
//     Storage.load(STORAGE_KEY.myLibraryMoviesList).map(async id => {
//       return await apiMovie.getMovieInfo(id).data;
//     })
//   );
// }

//     if (dataStorage) {
//   try {
//     //? Отримую унікальні ID жанрів фільмів, які є у localStorage
//     const uniqueIdGenres = dataStorage
//       .reduce((acc, el) => [...acc, ...el.genre_ids], [])
//       .filter((id, i, array) => array.indexOf(id) === i);

//     const response = await apiMovie.getGenresList();

//     //? За допомогою функції createSelectOptionMarkup отримую розмітку з жанром, і вставляю у розмітку
//     response.data.genres
//       .filter(el => uniqueIdGenres.includes(el.id))
//       .forEach(el =>
//         refs.genreList.insertAdjacentHTML(
//           'beforeend',
//           createSelectOptionMarkup(el)
//         )
//       );

//     refs.genreList.addEventListener('change', onSelectGenreListChange);
//     renderLibraryCards(dataStorage);
//   } catch (error) {
//     console.log(error);
//   }
// } else {
//   refs.genreList.removeEventListener('change', onSelectGenreListChange);
//   refs.libraryContent.innerHTML = markupContentTextMessage();
// }
