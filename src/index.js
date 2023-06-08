// styles scss
import './sass/main.scss';

import './js/api/themoviedbAPI/test';

const buttonAddLibrary = document.querySelector(".button")

// addEventListener("click", buttonAddLibrary)


  function createCard(movies) {
     const markup = movies
         .map(movie => {
             const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image
     return `
         <a class="gallery__link" href="${largeImageURL}">
           <div class="gallery-item" id="${id}">
             <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
             <div class="info">
               <p class="info-item"><b>Likes</b>${likes}</p>
               <p class="info-item"><b>Views</b>${views}</p>
               <p class="info-item"><b>Comments</b>${comments}
               {comments}</p>
               <p class="info-item"><b>Downloads</b>${downloads}</p>
             </div>
           </div>
         </a>
       `
 })
         .join('')
    
    button.insertAdjacentHTML("beforeend", markup)
 }
  
  
export default class ApiMovie {
  #API_KEY = '28909b5df6d6afd9591e6fc0c7cef11e';
  #BASE_URL = 'https://api.themoviedb.org/3/';
  constructor() {
    this.page = 0;
  }
  resetPage() {
    this.page = 0;
  }


  getNewFilms() {
    return axios.get(
      `${this.#BASE_URL}movie/upcoming?api_key=${this.#API_KEY}`
    );
  }
  
  

  

//   async function getNewFilms() {
//     try {
//         const response = await apiMovie.getNewFilms();
//         console.log('Нові фільми', response.data.results);
//       } catch (error) {
//          console.log('Error:', error);
//        }
//     }
//     getNewFilms();

// }

