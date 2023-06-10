import ApiMovie from './api/themoviedbAPI/fetch-movie';

const apiMovie = new ApiMovie()
     
// const apiMovie = new ApiMovie({
// id:569094,
// popularity: 2860.755,
// poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
// release_date: 2023-05-31,
// title: 'Spider-Man: Across the Spider-Verse',
// vote_average: 8.8,
// vote_count: 925
// });
// const response = await axios.get(`${BASE_URL}/?${params}`);
//     return response

const buttonAddLibrary = document.querySelector(".button")


async function getNewFilms() {
    try {
        const response = await apiMovie.getNewFilms()
        console.log(response)
        const example = await apiMovie.getMovieInfo(569094)
        console.log(example)
        getNewFilm(example.data)
    } catch (error) {
        console.log(error)
    }
    
 }
  
getNewFilms()
 
// console.log(apiMovie.getNewFilms())


//   addEventListener.buttonAddLibrary("click", getMovieInfo)

 const movieDescription = document.querySelector(".movieDescription")
  
function getNewFilm({ id, backdrop_path, original_title, release_date, vote_average, vote_count, popularity, genres, overview }) {
    const allGenres = genres.map(genre => {
        return genre.name
    })
    const markup = 
        
           
        `
              <a class="gallery__link" href="${backdrop_path}">
            
              <div class="gallery-item" id="${id}">
                
                             <div class="info"
    <p class="info-item title-movie"><b></b>${original_title}</p>
                <p class="info-item"><b>Release date</b>${release_date}</p>
                 <p class="info-item"><b>Vote</b>${vote_average}</p>
                   <p class="info-item"><b>Popularity</b>${popularity}</p>
     <p class="info-item"><b>Genre</b>${allGenres}</p >
      <p class="info-item"><b>About</b>${overview}</p>
                 </div>
               </div>
            </a> `
            
        movieDescription.innerHTML = markup
                 
    }

   // <img class="gallery-item__img" src="${backdrop_path.jpg
// }" alt="${tags}" loading="lazy" /> //  
    
//     getNewFilms() 
    

         //   <img class="gallery-item__img" src="${backdrop_path}" alt="${tags}" loading="lazy" />          
       
          
   
// <img class="gallery-item__img" src="${}" alt="${tags}" loading="lazy"