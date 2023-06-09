import ApiMovie from './api/themoviedbAPI/fetch-movie';
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
const apiMovie = new ApiMovie
apiMovie.getNewFilms()
// async function getNewFilms() {
//     const apiMovie = new ApiMovie({
// id:"569094",
// popularity: "2860.755",
// poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
// release_date: "2023-05-31",
// title: 'Spider-Man: Across the Spider-Verse',
// vote_average: "8.8",
// vote_count: "925"
// });
//     const response = await apiMovie.getNewFilms()
//     console.log(response)
//      const example = await apiMovie.getMovieInfo(569094)
//      console.log(example)
// }
//  getNewFilms() 



 
// console.log(apiMovie.getNewFilms())


//   addEventListener.buttonAddLibrary("click", getMovieInfo)

//  const movieDescription = document.querySelector(".movieDescription")
  
//  function getNewFilms(movies) {
//     //    const markup = movies
//      return { id, original_title, release_date, vote_average, vote_count, popularity, genre_ids, overview } 
           
//         `
//              <a class="gallery__link" href="${backdrop_path}">
//               <div class="gallery-item" id="${ id }">
                
//                              <div class="info"
//                      <p class="info-item"><b>The lost city</b>${original_title}</p>
//                 <p class="info-item"><b>Release date</b>${release_date}</p>
//                  <p class="info-item"><b>Vote</b>${vote_average}
//    </p>
//                    <p class="info-item"><b>Popularity</b>${popularity}</p>
//      < p class="info-item" > <b>Genre</b>${ genre_ids }</p >
//       <p class="info-item"><b>About</b>${overview}</p>
//                  </div>
//                </div>
//             </a> `
//      .join('')
//           movieDescription.innerHTML = getNewFilms(movies)
                 
//         }
     
    
//     getNewFilms() 
    

                   
       
          
   
// <img class="gallery-item__img" src="${}" alt="${tags}" loading="lazy"