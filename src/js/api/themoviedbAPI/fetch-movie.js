import axios from 'axios';

export default class ApiMovie {
  #API_KEY = '28909b5df6d6afd9591e6fc0c7cef11e';
  #BASE_URL = 'https://api.themoviedb.org/3/';
  constructor() {
    this.page = 0;
  }
  resetPage() {
    this.page = 0;
  }

  // Трендові фільми дня та тижня
  getTrend(param, page) {
    if (arguments.length < 2) {
      this.page += 1;
      return axios.get(
        `${this.#BASE_URL}trending/movie/${param}?api_key=${
          this.#API_KEY
        }&page=${this.page}`
      );
    } else {
      return axios.get(
        `${this.#BASE_URL}trending/movie/${param}?api_key=${
          this.#API_KEY
        }&page=${page}`
      );
    }
  }

  // Нові фільми
  getNewFilms() {
    return axios.get(
      `${this.#BASE_URL}movie/upcoming?api_key=${this.#API_KEY}`
    );
  }

  // Фільми за ключовим словом + за роком
  async searchByQueryYear(query, year, page) {
    if (arguments.length < 3) {
      try {
        this.page += 1;
        const response = await axios.get(
          `${this.#BASE_URL}search/movie?api_key=${
            this.#API_KEY
          }&query=${query}&page=${this.page}`
        );
        const filteredResults = response.data.results.filter(
          movie => movie.release_date && movie.release_date.includes(year)
        );
        return filteredResults;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(
          `${this.#BASE_URL}search/movie?api_key=${
            this.#API_KEY
          }&query=${query}&page=${page}`
        );
        const filteredResults = response.data.results.filter(
          movie => movie.release_date && movie.release_date.includes(year)
        );
        return filteredResults;
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Детальна інформація про фільм
  getMovieInfo(id) {
    
      return axios.get(
        `${this.#BASE_URL}movie/${id}?api_key=${this.#API_KEY}`
      );
      
  }

  // Повна інформація про можливий трейлер фільма на ютубі
  getTrailer(id) {
    try {
      const response = axios.get(
        `${this.#BASE_URL}movie/${id}/videos?api_key=${this.#API_KEY}`
      );
      return response.data.results[0];
    } catch (error) {
      console.log(error);
    }
  }

  // Перелік жанрів
  getGenresList() {
    try {
      const response = axios.get(
        `${this.#BASE_URL}genre/movie/list?api_key=${this.#API_KEY}`
      );
      return response.data.genres;
    } catch (error) {
      console.log(error);
    }
  }
}
