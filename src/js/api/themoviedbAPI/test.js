import ApiMovie from './fetch-movie';
const apiMovie = new ApiMovie();

// --------------------------ТЕСТ - Трендові фільми дня та тижня 

// apiMovie.getTrend('day')
// .then((trendingMovies) => {
//     console.log('Трендові фільми дня:', trendingMovies);
// })
// .catch((error) => {
//     console.log('Error:', error);
// });

// apiMovie.getTrend('week')
// .then((trendingMovies) => {
//     console.log('Трендові фільми тижня :', trendingMovies);
// })
// .catch((error) => {
//     console.log('Error:', error);
// });



// --------------------------ТЕСТ - Нові фільми

// apiMovie.getNewFilms()
// .then((upcomingMovies) => {
//     console.log('Нові фільми', upcomingMovies);
// })
// .catch((error) => {
//     console.log('Error:', error);
// });



// --------------------------ТЕСТ - Фільми за ключовим словом + за роком


// apiMovie.earchByQueryYear('John Wick', 2023)
// .then((movies) => {
//     console.log(`Пошук результата:`, movies);
// })
// .catch((error) => {
//     console.log('Error:', error);
// });




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
