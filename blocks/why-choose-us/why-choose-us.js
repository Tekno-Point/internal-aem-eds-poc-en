import {div} from "../../scripts/dom-helper";
import Swiper from "../why-choose-us/swiper-bundle.min.js";

export default function decorate(block) {
  const swiper = div({class: 'swiper'});
  const wrapper = div({class: 'swiper-wrapper'});
  [...block.children].forEach((child) => {
    child.classList.add('swiper-slide');
    wrapper.appendChild(child);
  });

  swiper.appendChild(wrapper);
  block.innerHTML = '';
  block.appendChild(swiper);
//   const pagination = document.createElement('div');
//   pagination.className = 'swiper-pagination';
//   swiper.appendChild(pagination);

//   const nextBtn = document.createElement('div');
//   nextBtn.className = 'swiper-button-next';
//   const prevBtn = document.createElement('div');
//   prevBtn.className = 'swiper-button-prev';
//   swiper.appendChild(nextBtn);
//   swiper.appendChild(prevBtn);

  // Replace block content with swiper
  block.innerHTML = '';
  block.appendChild(swiper);
  new Swiper(swiper, {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: pagination,
      clickable: true,
    },
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
  });

}