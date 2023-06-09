import axios from 'axios';

export default class ApiMovie {
  #API_KEY = '28909b5df6d6afd9591e6fc0c7cef11e';
  #BASE_URL = 'https://api.themoviedb.org/3/';
  #query = '';

  // Трендові фільми дня та тижня
  getTrend(param) {
    return axios.get(
      `${this.#BASE_URL}trending/movie/${param}?api_key=${this.#API_KEY}`
    );
  }

  // Нові фільми
  getNewFilms() {
    return axios.get(
      `${this.#BASE_URL}movie/upcoming?api_key=${this.#API_KEY}`
    );
  }

  // Фільми за ключовим словом + за роком
  searchByQueryYear(page) {
    return axios.get(
      `${this.#BASE_URL}search/movie?api_key=${this.#API_KEY}&query=${
        this.query
      }&page=${page}`
    );
  }

  // async searchByQueryYear(query, year, page) {
  //   if (arguments.length < 3) {
  //     try {
  //       this.page += 1;
  //       const response = await axios.get(
  //         `${this.#BASE_URL}search/movie?api_key=${
  //           this.#API_KEY
  //         }&query=${query}&page=${this.page}`
  //       );
  //       const filteredResults = response.data.results.filter(
  //         movie => movie.release_date && movie.release_date.includes(year)
  //       );
  //       return filteredResults;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     try {
  //       const response = await axios.get(
  //         `${this.#BASE_URL}search/movie?api_key=${
  //           this.#API_KEY
  //         }&query=${query}&page=${page}`
  //       );
  //       const filteredResults = response.data.results.filter(
  //         movie => movie.release_date && movie.release_date.includes(year)
  //       );
  //       return filteredResults;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  // Детальна інформація про фільм
  getMovieInfo(id) {
    return axios.get(`${this.#BASE_URL}movie/${id}?api_key=${this.#API_KEY}`);
  }

  // Повна інформація про можливий трейлер фільма на ютубі
  getTrailer(id) {
    return axios.get(
      `${this.#BASE_URL}movie/${id}/videos?api_key=${this.#API_KEY}`
    );
  }

  // Перелік жанрів
  getGenresList() {
    return axios.get(
      `${this.#BASE_URL}genre/movie/list?api_key=${this.#API_KEY}`
    );
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
