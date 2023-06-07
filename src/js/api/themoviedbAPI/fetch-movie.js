import axios from 'axios';

export default class ApiMovie {
    constructor() {
        this.key = '28909b5df6d6afd9591e6fc0c7cef11e';
        this.baseURL = 'https://api.themoviedb.org/3/';
        this.page = 0;
    }
    resetPage() {
        this.page = 0;
    }

// Трендові фільми дня та тижня
async getTrend(param, page) {
    if (arguments.length < 2) {
        try {
            this.page += 1;
            const response = await axios.get(
                `${this.baseURL}trending/movie/${param}?api_key=${this.key}&page=${this.page}`
                );
                return response.data.results;
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axios.get(
                    `${this.baseURL}trending/movie/${param}?api_key=${this.key}&page=${page}`
                    );
                    return response.data;
                } catch (error) {
                    console.log(error);
                }
            }
        }

// Нові фільми
async getNewFilms() {
    try {
        const response = await axios.get(
            `${this.baseURL}movie/upcoming?api_key=${this.key}`
            );
            return response.data.results;
        } catch (error) {
            console.log(error);
        }
    }

// Фільми за ключовим словом + за роком
async searchByQueryYear(query, year, page) {
    if (arguments.length < 3) {
        try {
            this.page += 1;
            const response = await axios.get(
                `${this.baseURL}search/movie?api_key=${this.key}&query=${query}&page=${this.page}`
            );
            const filteredResults = response.data.results.filter(movie => movie.release_date && movie.release_date.includes(year));
            return filteredResults;
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            const response = await axios.get(
                `${this.baseURL}search/movie?api_key=${this.key}&query=${query}&page=${page}`
            );
            const filteredResults = response.data.results.filter(movie => movie.release_date && movie.release_date.includes(year));
            return filteredResults;
        } catch (error) {
            console.log(error);
        }
    }
}

// Детальна інформація про фільм
async getMovieInfo(id) {
    try {
        const response = await axios.get(
            `${this.baseURL}movie/${id}?api_key=${this.key}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

// Повна інформація про можливий трейлер фільма на ютубі
async getTrailer(id) {
    try {
        const response = await axios.get(
            `${this.baseURL}movie/${id}/videos?api_key=${this.key}`
            );
            return response.data.results[0];
        } catch (error) {
            console.log(error);
        }
    }

// Перелік жанрів
async getGenresList() {
    try {
        const response = await axios.get(
            `${this.baseURL}genre/movie/list?api_key=${this.key}`
            );
            return response.data.genres;
        } catch (error) {
            console.log(error);
        }
    }
}