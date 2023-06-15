import Storage from '../localStorageAPI/localStorageAPI';
import { STORAGE_KEY } from '../../localStorageKey/localStorageKey';

/**
 *? Клас, що забезпечує обробку кнопки додавання або видалення з бібліотеки фільмів.
 */
export class ServiceAddRemoveBtn {
  /**
   * Конструктор класу ServiceAddRemoveBtn.
   * @param {HTMLButtonElement} addRemoveBtn - Кнопка додавання або видалення.
   * @param {Object} movie - Об'єкт фільму.
   * @param {number} movie.data.id - Ідентифікатор фільму.
   */
  constructor(addRemoveBtn, movie) {
    const { data } = movie;
    this.addRemoveBtn = addRemoveBtn;
    this.movieData = data;
    this.removeBtn = null;
    this.addMovieBtn = null;
    this.localStorageData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
  }

  /**
   *? Встановлює текст кнопки та оброблює кліки на ній.
   */
  setButtonName() {
    if (!this.localStorageData || this.localStorageData.length === 0) {
      this.handleEmptyLibrary();
    } else {
      this.handleNonEmptyLibrary();
    }
  }

  /**
   *? Оброблює випадок, коли бібліотека фільмів порожня.
   */
  handleEmptyLibrary() {
    Storage.save(STORAGE_KEY.myLibraryMoviesList, []);
    this.addRemoveBtn.textContent = 'Add to my library';
    this.addMovieBtn = this.onAddMovieBtnClick.bind(this);
    this.addRemoveBtn.addEventListener('click', this.addMovieBtn);
  }

  /**
   *? Оброблює випадок, коли бібліотека фільмів не є порожньою.
   */
  handleNonEmptyLibrary() {
    const isMovieInLibrary = this.localStorageData.some(
      ({ id }) => id === this.movieData.id
    );
    this.addRemoveBtn.textContent = isMovieInLibrary
      ? 'Remove from my library'
      : 'Add to my library';

    if (isMovieInLibrary) {
      this.removeBtn = this.onRemoveBtnClick.bind(this);
      this.addRemoveBtn.addEventListener('click', this.removeBtn);
    } else {
      this.addMovieBtn = this.onAddMovieBtnClick.bind(this);
      this.addRemoveBtn.addEventListener('click', this.addMovieBtn);
    }
  }

  /**
   * Оброблює клік на кнопці видалення з бібліотеки.
   */
  onRemoveBtnClick() {
    this.addRemoveBtn.blur();
    const index = this.localStorageData.findIndex(
      ({ id }) => id === this.movieData.id
    );
    const updateData = [...this.localStorageData];
    updateData.splice(index, 1);
    Storage.save(STORAGE_KEY.myLibraryMoviesList, updateData);
    this.addRemoveBtn.textContent = 'Add to my library';
    this.addMovieBtn = this.onAddMovieBtnClick.bind(this);
    this.addRemoveBtn.removeEventListener('click', this.removeBtn);
    this.addRemoveBtn.addEventListener('click', this.addMovieBtn);
  }

  /**
   * Оброблює клік на кнопці додавання до бібліотеки.
   */
  onAddMovieBtnClick() {
    this.addRemoveBtn.blur();
    const localStorageData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
    const updateData = [...localStorageData, this.movieData];
    Storage.save(STORAGE_KEY.myLibraryMoviesList, updateData);
    this.addRemoveBtn.textContent = 'Remove from my library';
    this.removeBtn = this.onRemoveBtnClick.bind(this);
    this.addRemoveBtn.removeEventListener('click', this.addMovieBtn);
    this.addRemoveBtn.addEventListener('click', this.removeBtn);
  }
}

// import Storage from '../localStorageAPI/localStorageAPI';
// import { STORAGE_KEY } from '../../localStorageKey/localStorageKey';

// export class ServiceAddRemoveBtn {
//   constructor(addRemoveBtn, movie) {
//     this.addRemoveBtn = addRemoveBtn;
//     this.movie = movie;
//     this.removeBtn = null;
//     this.addMovieBtn = null;
//   }

//   setButtonName() {
//     const dataLocalStorage = Storage.load(STORAGE_KEY.myLibraryMoviesList);
//     if (dataLocalStorage?.length === 0 || !dataLocalStorage) {
//       Storage.save(STORAGE_KEY.myLibraryMoviesList, []);
//       this.addRemoveBtn.textContent = 'Add to my library';
//     } else {
//       if (dataLocalStorage.some(({ id }) => id === this.movie.data.id)) {
//         this.addRemoveBtn.textContent = 'Remove from my library';
//       } else {
//         this.addRemoveBtn.textContent = 'Add to my library';
//       }
//     }

//     if (this.addRemoveBtn.textContent === 'Add to my library') {
//       console.log('if');
//       this.addMovieBtn = onAddMovieBtnClick.bind(this);
//       this.addRemoveBtn.addEventListener('click', this.addMovieBtn);
//     } else {
//       this.removeBtn = onRemoveBtnClick.bind(this);
//       this.addRemoveBtn.addEventListener('click', this.removeBtn);
//       console.log('else');
//     }
//   }
// }

// function onRemoveBtnClick() {
//   this.addRemoveBtn.blur();
//   const localStorageData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
//   const index = localStorageData.findIndex(
//     ({ id }) => id === this.movie.data.id
//   );
//   const updateData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
//   updateData.splice(index, 1);

//   Storage.save(STORAGE_KEY.myLibraryMoviesList, updateData);
//   this.addRemoveBtn.textContent = 'Add to my library';

//   this.addMovieBtn = onAddMovieBtnClick.bind(this);

//   this.addRemoveBtn.removeEventListener('click', this.removeBtn);
//   this.addRemoveBtn.addEventListener('click', this.addMovieBtn);
// }

// function onAddMovieBtnClick() {
//   this.addRemoveBtn.blur();
//   const localStorageData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
//   const updateData = [...localStorageData, this.movie.data];
//   Storage.save(STORAGE_KEY.myLibraryMoviesList, updateData);
//   this.addRemoveBtn.textContent = 'Remove from my library';

//   this.removeBtn = onRemoveBtnClick.bind(this);
//   this.addRemoveBtn.removeEventListener('click', this.addMovieBtn);
//   this.addRemoveBtn.addEventListener('click', this.removeBtn);
// }
