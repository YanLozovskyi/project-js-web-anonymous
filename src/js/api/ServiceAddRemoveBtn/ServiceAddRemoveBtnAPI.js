import Storage from '../localStorageAPI/localStorageAPI';
import { STORAGE_KEY } from '../../localStorageKey/localStorageKey';

export class ServiceAddRemoveBtn {
  constructor(addRemoveBtn, movie) {
    this.addRemoveBtn = addRemoveBtn;
    this.movie = movie;
  }

  setButtonName() {
    const dataLocalStorage = Storage.load(STORAGE_KEY.myLibraryMoviesList);
    if (dataLocalStorage?.length === 0 || !dataLocalStorage) {
      Storage.save(STORAGE_KEY.myLibraryMoviesList, []);
      this.addRemoveBtn.textContent = 'Add to my library';
    } else {
      if (dataLocalStorage.some(({ id }) => id === this.movie.data.id)) {
        this.addRemoveBtn.textContent = 'Remove from my library';
      } else {
        this.addRemoveBtn.textContent = 'Add to my library';
      }
    }

    this.addRemoveBtn.addEventListener('click', () => {
      if (this.addRemoveBtn.textContent === 'Add to my library') {
        this.onAddMovieBtnClick();
      } else {
        this.onRemoveBtnClick();
      }
    });
  }

  onRemoveBtnClick() {
    this.addRemoveBtn.blur();
    const localStorageData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
    const index = localStorageData.findIndex(
      ({ id }) => id === this.movie.data.id
    );
    const updateData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
    updateData.splice(index, 1);

    Storage.save(STORAGE_KEY.myLibraryMoviesList, updateData);
    this.addRemoveBtn.textContent = 'Add to my library';
    this.addRemoveBtn.removeEventListener('click', this.onRemoveBtnClick);
    this.addRemoveBtn.addEventListener('click', this.onAddMovieBtnClick);
  }

  onAddMovieBtnClick() {
    this.addRemoveBtn.blur();
    const localStorageData = Storage.load(STORAGE_KEY.myLibraryMoviesList);
    const updateData = [...localStorageData, this.movie.data];
    Storage.save(STORAGE_KEY.myLibraryMoviesList, updateData);
    this.addRemoveBtn.textContent = 'Remove from my library';
    this.addRemoveBtn.removeEventListener('click', this.onAddMovieBtnClick);
    this.addRemoveBtn.addEventListener('click', this.onRemoveBtnClick);
  }
}
