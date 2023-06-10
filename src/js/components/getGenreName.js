import ApiMovie from '../api/themoviedbAPI/fetch-movie';

const apiMovie = new ApiMovie();

let genresList = {};

async function getGenreName(ids) {
  genresList = await apiMovie.getGenresList();
  return ids.map(id => {
    const genre = genresList.data.genres.find(genre => genre.id === id);
    return genre ? genre.name : null;
  });
}
