import SwiperText from "../swiper/swiper.min.js"; 

export default function decorate(block) {
  const paginationTexts = [];
  console.log(block);

  block.classList.add("swiper");

  const swapperWapper = document.createElement("div");
  swapperWapper.classList.add("swiper-wrapper");

  Array.from(block.children).forEach((element) => {
    paginationTexts.push(element?.firstElementChild?.firstElementChild);
    element.classList.add("swiper-slide");
    swapperWapper.append(element);
  });

  block.append(swapperWapper);

  // Create button wrapper
  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("btnWrapper");

  // Pagination (optional)
  const divPagination = document.createElement("div");
  divPagination.classList.add("swiper-pagination");
  divPagination.style.display = "none";
  btnWrapper.append(divPagination);

  // Left Arrow with SVG
  const LeftArrow = document.createElement("div");
  LeftArrow.classList.add("swiper-button-prev");
  btnWrapper.appendChild(LeftArrow);

  // Right Arrow with SVG
  const RightArrow = document.createElement("div");
  RightArrow.classList.add("swiper-button-next");
  btnWrapper.appendChild(RightArrow);

  block.append(btnWrapper);

  // Initialize Swiper with fade effect
  const swiper = new SwiperText(block, {
    spaceBetween: 30,
    loop: true,
    effect: "fade", // 👈 fade effect enabled here
    fadeEffect: {
      crossFade: true, // optional: allows fading between slides instead of just fading in/out
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
