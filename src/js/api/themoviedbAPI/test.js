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
// getMovie();

// async function getTrendMovieOfWeek() {
//   try {
//     const response = await apiMovie.getTrend('week');
//     console.log('Трендові фільми тижня :', response.data.results);
//   } catch (error) {
//     console.log('Error:', error);
//   }
// }
// getNewFilms();

// --------------------------ТЕСТ - Нові фільми

 async function getNewFilms() {
   try {
     const response = await apiMovie.getNewFilms();
     console.log('Нові фільми', response.data.results);
   } catch (error) {
     console.log('Error:', error);
   }
 }
 getNewFilms();

// --------------------------ТЕСТ - Фільми за ключовим словом + за роком

apiMovie
  .searchByQueryYear('John Wick', 2023)
  .then(movies => {
    console.log(`Пошук результата:`, movies);
  })
  .catch(error => {
    console.log('Error:', error);
  });

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
// apiMovie.getMovieInfo(movieId)
// .then((movieInfo) => {
//     console.log('Детальна інформація про фільм:', movieInfo);
// })
// .catch((error) => {
//     console.log('Error:', error);
// });

//--------------------------ТЕСТ - Повна інформація про можливий трейлер фільма на ютубі

// const movieId = 245891;
// apiMovie.getTrailer(movieId)
// .then((trailer) => {
//     console.log('Movie Trailer:', trailer);
// })
// .catch((error) => {
//     console.log('Error:', error);
// });

//--------------------------ТЕСТ - Перелік жанрів

// apiMovie.getGenresList()
// .then((genres) => {
//     console.log('Перелік жанрів:', genres);
// })
