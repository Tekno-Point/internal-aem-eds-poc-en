import {div} from "../../scripts/dom-helper.js";
import Swiper from '../banner-image-swiper/swiper-min.js'

export default function decorate (block){
    console.log(block);
    const bannerFormContainer = document.querySelector('.banner-form-container');
    bannerFormContainer.querySelector(".banner-image-swiper-wrapper").classList.add('swiper');
    bannerFormContainer.querySelector(".banner-image-swiper").classList.add('swiper-wrapper');
    bannerFormContainer.querySelectorAll(".banner-image-swiper>div").forEach((e)=>{
        e.classList.add('swiper-slide')
    });
    const paginationDiv = div({ class: "swiper-pagination" });
    bannerFormContainer.querySelector(".banner-image-swiper-wrapper").appendChild(paginationDiv);
    
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  speed: 2000,
  autoplay: {
    delay: 2000,
  },

  pagination: {
    el: ".swiper-pagination",
  },
});

}