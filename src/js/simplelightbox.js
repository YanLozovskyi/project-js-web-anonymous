import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.team-list');

let gallery = `
    <li class="team-item">
      <a
        href="./images/team-photo/photo_2023-06-12_21-01-38.avif"
        class="simple-lightbox"
      >
        <img
          class="team-img"
          src="./images/team-photo/photo_2023-06-12_21-01-38.avif"
          alt="Yan
          Lozovskiy"
          width="200px"
          height="180px"
          loading="lazy"
        />
      </a>
      <div class="team__box">
        <h2 class="team__member">Yan Lozovskyi</h2>
        <p class="team__role">Team Lead</p>
        <a
          class="team__link-linkedin team__link-linkedin--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.linkedin.com/in/yan-lozovskyi-ba9170271/"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-linkedin"></use>
          </svg>
        </a>
        <a
          class="team__link-github team__link-github--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://github.com/YanLozovskyi"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-github"></use>
          </svg>
        </a>
      </div>
    </li>
    <li class="team-item">
      <a
        href="./images/team-photo/IMG_20220429_123018.avif"
        class="simple-lightbox"
      >
        <img
          class="team-img"
          src="./images/team-photo/IMG_20220429_123018.avif"
          alt="Ivanna Mykhalova"
          width="200px"
          height="180px"
          loading="lazy"
        />
      </a>
      <div class="team__box">
        <h2 class="team__member">Ivanna Mykhalova</h2>
        <p class="team__role">Scrum Master</p>
        <a
          class="team__link-linkedin team__link-linkedin--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.linkedin.com/in/%D1%96%D0%B2%D0%B0%D0%BD%D0%BD%D0%B0-%D0%BC%D0%B8%D1%85%D0%B0%D0%BB%D1%8C%D0%BE%D0%B2%D0%B0-222a36267/"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-linkedin"></use>
          </svg>
        </a>
        <a
          class="team__link-github team__link-github--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://github.com/Ivano4ka8"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-github"></use>
          </svg>
        </a>
      </div>
    </li>
    <li class="team-item">
      <a href="./images/team-photo/IMG_0393.avif" class="simple-lightbox">
        <img
          class="team-img"
          src="./images/team-photo/IMG_0393.avif"
          alt="Taras Vasylkiv"
          width="200px"
          height="180px"
          loading="lazy"
        />
      </a>
      <div class="team__box">
        <h2 class="team__member">Taras Vasylkiv</h2>
        <p class="team__role">Tech Lead</p>
        <a
          class="team__link-linkedin team__link-linkedin--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.linkedin.com/in/taras-vasylkiv/"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-linkedin"></use>
          </svg>
        </a>
        <a
          class="team__link-github team__link-github--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://github.com/vasylkivt"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-github"></use>
          </svg>
        </a>
      </div>
    </li>
    <li class="team-item">
      <a href="./images/team-photo/IMG_2282.avif" class="simple-lightbox">
        <img
          class="team-img"
          src="./images/team-photo/IMG_2282.avif"
          alt="Sergiy"
          width="180px"
          height="180px"
          loading="lazy"
        />
      </a>
      <div class="team__box">
        <h2 class="team__member">Sergey Yasak</h2>
        <p class="team__role">Developer</p>
        <a
          class="team__link-linkedin team__link-linkedin--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.linkedin.com/in/sergeyyasak/"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-linkedin"></use>
          </svg>
        </a>
        <a
          class="team__link-github team__link-github--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://github.com/Sergey4857"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-github"></use>
          </svg>
        </a>
      </div>
    </li>
    <li class="team-item">
      <a href="./images/team-photo/IMG_3030.avif" class="simple-lightbox">
        <img
          class="team-img"
          src="./images/team-photo/IMG_3030.avif"
          alt="Olesia Kubska"
          width="200px"
          height="180px"
          loading="lazy"
        />
      </a>
      <div class="team__box">
        <h2 class="team__member">Olesia Kubska</h2>
        <p class="team__role">Developer</p>
        <a
          class="team__link-linkedin team__link-linkedin--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="#"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-linkedin"></use>
          </svg>
        </a>
        <a
          class="team__link-github team__link-github--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://github.com/OlesiaKubska"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-github"></use>
          </svg>
        </a>
      </div>
    </li>
    <li class="team-item">
      <a
        href="./images/team-photo/328278001_1828641447534600_7698199478400282315_n-removebg-preview.avif"
        class="simple-lightbox"
      >
        <img
          class="team-img"
          src="./images/team-photo/328278001_1828641447534600_7698199478400282315_n-removebg-preview.avif"
          alt="Olexandr"
          width="200px"
          height="180px"
          loading="lazy"
        />
      </a>
      <div class="team__box">
        <h2 class="team__member">Olexander Sirotov</h2>
        <p class="team__role">Developer</p>
        <a
          class="team__link-linkedin team__link-linkedin--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.linkedin.com/in/alexander-sirotov/"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-linkedin"></use>
          </svg>
        </a>
        <a
          class="team__link-github team__link-github--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://github.com/SirotovAlexander"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-github"></use>
          </svg>
        </a>
      </div>
    </li>
    <li class="team-item">
      <a href="./images/team-photo/1671019061767.avif" class="simple-lightbox">
        <img
          class="team-img"
          src="./images/team-photo/1671019061767.avif"
          alt="Anastasia"
          width="200px"
          height="180px"
          loading="lazy"
        />
      </a>
      <div class="team__box">
        <h2 class="team__member">Anastasia Tkachenko</h2>
        <p class="team__role">Developer</p>
        <a
          class="team__link-linkedin team__link-linkedin--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.linkedin.com/in/anastasiia-%D0%B0%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D1%81%D0%B8%D1%8F-00633a246/"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-linkedin"></use>
          </svg>
        </a>
        <a
          class="team__link-github team__link-github--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://github.com/Anastasiia008"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-github"></use>
          </svg>
        </a>
      </div>
    </li>
    <li class="team-item">
      <a
        href="./images/team-photo/IMG_20230306_173802_347_2.avif"
        class="simple-lightbox"
      >
        <img
          class="team-img"
          src="./images/team-photo/IMG_20230306_173802_347_2.avif"
          alt="Nosorog"
          width="200px"
          height="180px"
          loading="lazy"
        />
      </a>
      <div class="team__box">
        <h2 class="team__member">Ihor Nosenko</h2>
        <p class="team__role">Developer</p>
        <a
          class="team__link-linkedin team__link-linkedin--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://www.linkedin.com/in/ihor-nosenko/"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-linkedin"></use>
          </svg>
        </a>
        <a
          class="team__link-github team__link-github--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://github.com/nsihor"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-github"></use>
          </svg>
        </a>
      </div>
    </li>
    <li class="team-item">
      <a
        href="./images/team-photo/T04S1TL52NR-U04S80B1R35-e393e89beafd-512.avif"
        class="simple-lightbox"
      >
        <img
          class="team-img"
          src="./images/team-photo/T04S1TL52NR-U04S80B1R35-e393e89beafd-512.avif"
          alt="Victoria"
          width="200px"
          height="180px"
          loading="lazy"
        />
      </a>
      <div class="team__box">
        <h2 class="team__member">Victoria Nikitchenko</h2>
        <p class="team__role">Developer</p>
        <a
          class="team__link-linkedin team__link-linkedin--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="#"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-linkedin"></use>
          </svg>
        </a>
        <a
          class="team__link-github team__link-github--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://github.com/Vikki1312"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-github"></use>
          </svg>
        </a>
      </div>
    </li>
    <li class="team-item">
      <a
        href="./images/team-photo/photo_2023-06-11_20-03-56.avif"
        class="simple-lightbox"
      >
        <img
          class="team-img"
          src="./images/team-photo/photo_2023-06-11_20-03-56.avif"
          alt="Iryna Hodovanets"
          width="200px"
          height="180px"
          loading="lazy"
        />
      </a>
      <div class="team__box">
        <h2 class="team__member">Iryna Hodovanets</h2>
        <p class="team__role">Developer</p>
        <a
          class="team__link-linkedin team__link-linkedin--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="#"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-linkedin"></use>
          </svg>
        </a>
        <a
          class="team__link-github team__link-github--active"
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://github.com/UserIryna28"
        >
          <svg class="team__icon" width="25" height="25">
            <use href="./images/sprite/sprite.svg#icon-github"></use>
          </svg>
        </a>
      </div>
    </li>`;

galleryEl.insertAdjacentHTML('beforebegin', gallery);

gallery = new simpleLightbox('.team-list .simple-lightbox', {
  captionsData: 'alt',
  captionDelay: 250,
}); ///підключення сімплбокс
