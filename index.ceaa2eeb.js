!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=n.parcelRequirecf35;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){o[e]=n},n.parcelRequirecf35=r);new(0,(c=r("9IVsr")).default);var a=r("bpxeT"),i=r("2TvXO"),c=r("9IVsr"),s=r("2IWo3"),l=new(0,c.default),u=document.querySelector(".movieDescription");function d(){return(d=e(a)(e(i).mark((function n(){var t,o,r,a;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.getNewFilms();case 3:return t=e.sent,o=p(t.data.results),e.next=7,l.getMovieInfo(o.id);case 7:r=e.sent,u.innerHTML=v(r.data),a=document.querySelector(".add-remove-btn"),new(0,s.ServiceAddRemoveBtn)(a,r).setButtonName(),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.log(e.t0);case 17:case"end":return e.stop()}}),n,null,[[0,14]])})))).apply(this,arguments)}function p(e){return e[Math.floor(Math.random()*e.length)]}function v(e){var n=e.id,t=e.backdrop_path,o=e.original_title,r=e.release_date,a=e.vote_average,i=e.vote_count,c=e.popularity,s=e.genres,l=e.overview,u=s.map((function(e){return e.name})).join(", ");return'\n    <div class="image-upcoming">  \n      <img\n        class="gallery-item_img"\n        src="'.concat("https://image.tmdb.org/t/p/original/").concat(t,'"\n        alt="movie"\n        loading="lazy"\n      />\n    </div>\n    <div class="gallery-item" id="').concat(n,'">\n      <h3 class="info-item-title">').concat(o,'</h3>\n      <div class="info">\n        <ul class="info-item-one-part">\n          <li class="info-item">Release date</li>\n          <li class="info-item">Vote / Votes</li>\n        </ul>\n        <ul class="info-item-two-part">\n          <li class="info-item-two info-item-second">').concat(r,'</li>\n          <li class="info-item-two">\n            <span class="info-item-fourth vote-text">').concat(a,'</span> / <span class="info-item-fourth vote-text">').concat(i,'</span>\n          </li>\n        </ul>\n        <ul class="info-item-one-part">\n          <li class="info-item">Popularity</li>\n          <li class="info-item">Genre</li>\n        </ul>\n        <ul class="info-item-two-part">\n          <li class="info-item-two">').concat(c,'</li>\n          <li class="info-item-two">').concat(u,'</li>\n        </ul>\n      </div>\n      <div class="info-item-about">\n        <h4 class="info-item-thirty">About</h4>\n        <p class="info-item-about-movie">').concat(l,'</p>\n      </div>\n      <button type="button" class="add-remove-btn button-accent" id="fix"></button>\n    </div>')}!function(){d.apply(this,arguments)}();a=r("bpxeT"),i=r("2TvXO");r("eeTeS");c=r("9IVsr");var f=r("h7PvK"),m=r("dyT35"),h=(s=r("2IWo3"),new(0,r("jGrRV").ScrollService)),b=new(0,c.default),w="https://image.tmdb.org/t/p/original/",g=document.querySelector(".hero-content"),y=document.querySelector(".hero-default");function k(){return(k=e(a)(e(i).mark((function n(){var t,o;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.getTrend("day");case 3:t=e.sent,o=E(t.data.results),0===t.data.results.length?(S(y),L()):_(o.slice(0,5),g),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("Error:",e.t0);case 11:case"end":return e.stop()}}),n,null,[[0,8]])})))).apply(this,arguments)}function _(e,n){return x.apply(this,arguments)}function x(){return(x=e(a)(e(i).mark((function n(t,o){var r;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.map((function(e){var n=e.original_title,t=e.overview,o=e.backdrop_path,r=e.vote_average,a=e.id;return'\n      <swiper-slide class="hero-film_background hero-wrap"\n        style="background-image: url('.concat(w).concat(o,')"\n        data-movie-id="').concat(a,'"\n      >\n        <div class="hero-wrap">\n          <h1 class="hero-title">').concat(n,'</h1>\n          <div class="hero-stars">').concat((0,f.getStar)(r),'</div>\n          <p class="hero-description-js">').concat(t,'</p>\n          <div class="hero-buttons">\n            <button class="hero-button-trailer ">\n              Watch trailer\n            </button>\n            <button class="hero-button-moredetails\n          ">\n              More details\n            </button>\n          </div>\n        </div>\n      </swiper-slide>\n    ')})).join(""),o.innerHTML=r,T(t),j(t);case 4:case"end":return e.stop()}}),n)})))).apply(this,arguments)}function S(e){e.innerHTML='\n  <div class="hero-content">\n  <h1 class="hero-title-default">Let’s Make Your Own Cinema</h1>\n    <p class="hero-description-default">Is a guide to creating a personalized movie theater experience. You\'ll need a projector, screen, and speakers.</p>\n    <a class="hero-link" href="./catalog.html">Get Started</a>\n    \n    <div class="hero-picture-default">\n</div>\n</div>\n'}function E(e){return e=e.sort((function(){return Math.random()-.5}))}function L(){var e=document.querySelector(".hero-description-default"),n=document.querySelector(".hero-content");n.classList.add("hero-content-default"),n.classList.add("container"),n.classList.remove("hero-content");var t=window.innerWidth;e.textContent=t>768?"Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.":"Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. "}function T(e){return M.apply(this,arguments)}function M(){return M=e(a)(e(i).mark((function n(t){var o,r;return e(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:o=function(e){return r.apply(this,arguments)},r=function(){return(r=e(a)(e(i).mark((function n(t){var o,r,a;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.getTrailer(t);case 3:if(o=e.sent,r=o.data.results.find((function(e){return"Trailer"===e.type||"Official Trailer"===e.name}))){e.next=7;break}throw new Error("Trailer not found");case 7:(a=m.create('\n        <iframe class="iframe" src="https://www.youtube.com/embed/'.concat(r.key,'" width="560" height="315" frameborder="0"></iframe>\n      '),{handlerEscape:null,onShow:function(){h.blockScroll(),this.handlerEscape=q.bind(a),document.addEventListener("keydown",this.handlerEscape)},onClose:function(){h.restoreScroll(),document.removeEventListener("keydown",this.handlerEscape)}})).show(),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),I().show(),console.log("Error:",e.t0);case 15:case"end":return e.stop()}}),n,null,[[0,11]])})))).apply(this,arguments)},document.querySelectorAll(".hero-button-trailer").forEach((function(e,n){e.addEventListener("click",(function(){o(t[n].id)}))}));case 6:case"end":return n.stop()}}),n)}))),M.apply(this,arguments)}function q(e){"Escape"===e.code&&this.close()}function O(){this.close()}function I(){var e=m.create('\n  <div class="trailer-fail">\n  <p class="trailer-fail-text">OOPS...<br/> We are very sorry!<br /> But we couldn’t find the trailer.</p>\n  <button type="button" class="btn-close"><svg class="btn-close--svg">\n  <use href=\'/sprite.a5e5e87b.svg#icon-close\'></use>\n  </svg>\n  </button>\n  <div class="bg-box"></div>\n  </div>\n  '),n=e.element().querySelector(".btn-close");return n.addEventListener("click",(function t(){e.close(),n.removeEventListener("click",t)})),e}
//! modal------------------
function j(n){function t(){return(t=e(a)(e(i).mark((function n(t){var o;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.getMovieInfo(t);case 3:o=e.sent,m.create(C(o.data),{handlerEscape:null,handlerBtnClose:null,onShow:function(e){h.blockScroll();var n=e.element().querySelector('button[data-action="add-remove-to-my-library"]');new(0,s.ServiceAddRemoveBtn)(n,o).setButtonName();var t=q.bind(e);document.addEventListener("keydown",t);var r=e.element().querySelector("#closeModalPopUp"),a=O.bind(e);r.addEventListener("click",a)},onClose:function(){h.restoreScroll(),document.removeEventListener("keydown",this.handlerEscape),document.removeEventListener("click",this.handlerBtnClose)}}).show(),T(o),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),n,null,[[0,9]])})))).apply(this,arguments)}document.querySelectorAll(".hero-button-moredetails").forEach((function(e,o){e.addEventListener("click",(function(){!function(e){t.apply(this,arguments)}(n[o].id)}))}))}function C(e){var n=e.id,t=e.poster_path,o=e.original_title,r=e.vote_average,a=e.vote_count,i=e.popularity,c=e.genres,s=e.overview,l=c.map((function(e){return e.name})).join(", ");return'\n<div class="pop-up-modal visual" id="modalPopUp">\n  <button class="pop-up-modal__close" id="closeModalPopUp">\n    '.concat('<svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path class="svg-close-icon" d="M11.25 11.25L0.75 0.75M11.25 0.75L0.75 11.25" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>','\n  </button>\n  <div class="pop-up-modal__container">\n    <img src="').concat(w).concat(t,'" alt="image.png" class="pop-up-modal__img" />\n    <div class="pop-card" id="').concat(n,'">\n      <h2 class="pop-up-modal__title">').concat(o,'</h2>\n      <div class="pop-up-modal__blok">\n        <ul class="pop-up-modal__list">\n          <li class="pop-up-modal__link">Vote / Votes</li>\n          <li class="pop-up-modal__link">Popularity</li>\n          <li class="pop-up-modal__link">Genre</li>\n          <li class="pop-up-modal__link">ABOUT</li>\n        </ul>\n        <ul class="pop-up-modal__list">\n          <li class="pop-up-modal__link-item item-votes">\n            <div class="vote">').concat(r,'</div>\n            &nbsp;/&nbsp;\n            <div class="votes">').concat(a,'</div>\n          </li>\n          <li class="pop-up-modal__link-item popularity">').concat(i,'</li>\n          <li class="pop-up-modal__link-item genres">').concat(l,'</li>\n        </ul>\n      </div>\n      <div class="pop-up-modal__about">\n        <p class="pop-up-modal__about-txt">').concat(s,'</p>\n      </div>\n        <div class="pop-up-modal-wrap-btn">\n          <button\n            class="add-remove-btn button-accent"\n            type="button"\n            data-action="add-remove-to-my-library"\n          ></button>\n        </div>\n    </div>\n  </div>\n</div>\n')}!function(){k.apply(this,arguments)}(),r("cs7FV");a=r("bpxeT"),i=r("2TvXO"),c=r("9IVsr");var V=r("bxNz7"),B=r("kvC6y"),A=document.querySelector(".card-list"),N=new(0,c.default),P=new(0,B.Loader);function U(){return(U=e(a)(e(i).mark((function n(){var t,o;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,P.onShow(),e.next=4,N.getTrend("week");case 4:return t=e.sent,o=t.data.results.slice(0,3),e.next=8,(0,V.createMarkupFilmsCards)(o);case 8:A.innerHTML=e.sent,e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log("Error:",e.t0);case 14:P.onClose();case 15:case"end":return e.stop()}}),n,null,[[0,11]])})))).apply(this,arguments)}!function(){U.apply(this,arguments)}(),r("2jzSA"),r("4F07H"),r("8e9SS"),r("hkeON"),r("etUX2")}();
//# sourceMappingURL=index.ceaa2eeb.js.map