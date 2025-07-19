// changes for slide over 

import Swiper from "./swiper.js";

export default function decorate(block) {
  console.log("Carousel block detected");

  // Add unique class names to children
  Array.from(block.children).forEach((element, index) => {
    element.classList.add("inner-" + (index + 1));
    Array.from(element.children).forEach((child, subIndex) => {
      child.classList.add("inner-innerSub-" + (subIndex + 1));
    });
  });

  const paginationTexts = [];
  block.classList.add("swiper");

  // Create swiper-wrapper
  const swiperWrapper = document.createElement("div");
  swiperWrapper.classList.add("swiper-wrapper");

  Array.from(block.children).forEach((element) => {
    const paginationContent = element?.firstElementChild?.firstElementChild;
    if (paginationContent) paginationTexts.push(paginationContent);
    element.classList.add("swiper-slide");
    swiperWrapper.appendChild(element);
  });

  Array.from(swiperWrapper.querySelectorAll(".inner-innerSub-1 h3")).forEach((i) => i.remove());

  // Clear block and append new structure
  block.innerHTML = "";
  block.appendChild(swiperWrapper);

  // Navigation & pagination UI
  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("btnWrapper");

  const divPagination = document.createElement("div");
  divPagination.classList.add("swiper-pagination");
  btnWrapper.appendChild(divPagination);

  const leftArrow = document.createElement("div");
  leftArrow.classList.add("swiper-button-prev");
//   leftArrow.textContent = "<";
  btnWrapper.appendChild(leftArrow);

  const rightArrow = document.createElement("div");
  rightArrow.classList.add("swiper-button-next");
//   rightArrow.textContent = ">";
  btnWrapper.appendChild(rightArrow);

  block.appendChild(btnWrapper);

  const prevBtn = leftArrow;
  const nextBtn = rightArrow;

  // Initialize and store Swiper instance
  const swiperInstance = new Swiper(block, {
    loop: false,
    slidesPerView: 3,
    spaceBetween: 20,
  //   autoplay: {
  //   delay: 3000, // 3 seconds between slides
  //   disableOnInteraction: false, // continues autoplay after user interaction
  // },
    pagination: {
      el: divPagination,
      clickable: true,
    },
    freeMode: true,
    scrollOnFocus: true,
    breakpoints: {
    0: {
      slidesPerView: 1, // Mobile
    },
    768: {
      slidesPerView: 2, // Tablet (optional)
    },
    1024: {
      slidesPerView: 3, // Desktop
    }
  }
  });


  // Update button states
  function updateNavButtons(swiper) {
    if (swiper.isBeginning) {
      prevBtn.classList.add("disabled");
    } else {
      prevBtn.classList.remove("disabled");
    }

    if (swiper.isEnd) {
      nextBtn.classList.add("disabled");
    } else {
      nextBtn.classList.remove("disabled");
    }
  }
}

