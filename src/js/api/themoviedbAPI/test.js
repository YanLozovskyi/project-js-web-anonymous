import ApiMovie from './fetch-movie';
const apiMovie = new ApiMovie();

// --------------------------ТЕСТ - Трендові фільми дня та тижня
// async function getTrendMovieOfDay() {
//   try {
//     const response = await apiMovie.getTrend('day');
//     console.log('Трендові фільми дня:', response.data.results);
//   } catch (error) {
//     console.log('Error:', error);
//   }
// }
// getTrendMovieOfDay();

// async function getTrendMovieOfWeek() {
//   try {
//     const response = await apiMovie.getTrend('week');
//     console.log('Трендові фільми тижня :', response.data.results);
//   } catch (error) {
//     console.log('Error:', error);
//   }
// }
// getTrendMovieOfWeek();

// --------------------------ТЕСТ - Нові фільми

//  async function getNewFilms() {
//    try {
//      const response = await apiMovie.getNewFilms();
//      console.log('Нові фільми', response.data.results);
//    } catch (error) {
//      console.log('Error:', error);
//    }
//  }
//  getNewFilms();

// --------------------------ТЕСТ - Фільми за ключовим словом + за роком

// apiMovie
//   .searchByQueryYear('John Wick', 2023)
//   .then(movies => {
//     console.log(`Пошук результата:`, movies);
//   })
//   .catch(error => {
//     console.log('Error:', error);
//   });
// async function getNewFilms() {
//   try {
//     const response = await apiMovie.getNewFilms(2);
//     console.log('Нові фільми', response.data.results);
//   } catch (error) {
//     console.log('Error:', error);
//   }
// }
// getNewFilms();

// --------------------------ТЕСТ - Фільми за ключовим словом + за роком

// async function searchByQueryYear() {
//   try {
//     if (true) {
//       apiMovie.query = 'John Wick';
//       const response = await apiMovie.searchByQueryYear(1);
//       console.log('Пошук фільмів по назві:', response.data.results);
//     } else {
//       apiMovie.query = 'John Wick';
//       const response = await apiMovie.searchByQueryYear(1);
//       const filteredResults = response.data.results.filter(movie =>
//         movie.release_date.includes(2023)
//       );
//       console.log('Пошук фільмів по назві + фільтр по року:', filteredResults);
//     }
//   } catch (error) {
//     console.log('Error:', error);
//   }
// }

// searchByQueryYear();

// try to refactor

// async function searchByQueryYear(year) {
//   try {
//     const response = await apiMovie.searchByQueryYear('John Wick');
//     console.log(`Пошук результата:`, response);
//     const filteredResults = response.data.results.filter(
//       movie => movie.release_date && movie.release_date.includes(year)
//     );
//     return filteredResults;
//   } catch (error) {
//     console.log('Error:', error);
//   }
// }
// console.log(searchByQueryYear(2023));

//--------------------------ТЕСТ- Детальна інформація про фільм

// const movieId = 245891;

// async function getMovieInfo() {
//   try {
//     const response = await apiMovie.getMovieInfo(movieId);
//     console.log('Детальна інформація про фільм:', response.data);
//   } catch (error) {
//     console.log('Error:', error);
//   }
// }

// getMovieInfo();

//--------------------------ТЕСТ - Повна інформація про можливий трейлер фільма на ютубі

// const movieId = 245891;
// async function getTrailer() {
//   try {
//     const response = await apiMovie.getTrailer(movieId);
//     console.log('Movie Trailer:', response.data.results[0]);
//   } catch (error) {
//     console.log('Error:', error);
//   }
// }
// getTrailer();

//--------------------------ТЕСТ - Перелік жанрів

// async function getGenres() {
//   try {
//     const response = await apiMovie.getGenresList();
//     console.log('Перелік жанрів:', response.data.genres);
//   } catch (error) {
//     console.log('Error:', error);
//   }
// }

// getGenres();
