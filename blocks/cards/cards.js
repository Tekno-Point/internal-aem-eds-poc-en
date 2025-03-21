import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import Swiper from '../swiper/swiper.min.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('div');
  ul.classList.add("swiper-wrapper");
  [...block.children].forEach((row) => {
    const li = document.createElement('div');
    li.classList.add("swiper-slide")
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);

  const swiperPagination = document.createElement('div');
  const swiperButtonPrev = document.createElement('div');
  const swiperButtonNext = document.createElement('div');
  swiperPagination.classList.add("swiper-pagination")
  swiperButtonPrev.classList.add("swiper-button-next")
  swiperButtonNext.classList.add("swiper-button-prev")
  

  block.append(swiperPagination);
  block.append(swiperButtonNext);
  block.append(swiperButtonPrev);
  // block.append(swiperPagination);

  var swiper = new Swiper(block, {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      
    },
    breakpoints: {
      300: {
        slidesPerView: 1.4,
      },
      780: {
        slidesPerView: 4,
      }
      
    },
  });
}