// import BlocksSwiper from "../swiper/swiper.min.js";
// export default function decorate(block) {
//   // Add Swiper container class
//   block.classList.add("swiper");

//   // Create Swiper wrapper
//   const swiperWrapper = document.createElement("div");
//   swiperWrapper.classList.add("swiper-wrapper");

//   // Optional: store bullet content (if you want custom bullets later)
//   const paginationTexts = [];

//   // Convert each child to a slide
//   Array.from(block.children).forEach((element) => {
//     paginationTexts.push(element?.firstElementChild?.firstElementChild); // e.g. img or h3
//     element.classList.add("swiper-slide");
//     swiperWrapper.appendChild(element);
//   });

//   // Clear the block and rebuild it
//   block.innerHTML = '';
//   block.appendChild(swiperWrapper);

//   // Add pagination element
//   const paginationEl = document.createElement("div");
//   paginationEl.classList.add("swiper-pagination");
//   block.appendChild(paginationEl);

//   // Initialize Swiper
//   BlocksSwiper(block, {
//     slidesPerView: 3,
//     spaceBetween: 30,
//     loop: true,
//     pagination: {
//       el: paginationEl,
//       clickable: true,
//     },
//     grabCursor: true,
//   });
// }





// import BlocksSwiper from "../swiper/swiper.min.js";

// export default function decorate(block) {
//   // Add Swiper base class
//   block.classList.add("swiper");

//   // Create Swiper wrapper
//   const swiperWrapper = document.createElement("div");
//   swiperWrapper.classList.add("swiper-wrapper");

//   // Convert each child into a slide
//   Array.from(block.children).forEach((element) => {
//     element.classList.add("swiper-slide");
//     swiperWrapper.appendChild(element);
//   });

//   // Clear and rebuild block
//   block.innerHTML = '';
//   block.appendChild(swiperWrapper);

//   // Create pagination
//   const paginationEl = document.createElement("div");
//   paginationEl.classList.add("swiper-pagination");
//   block.appendChild(paginationEl);

//   // Init Swiper with 'auto' slide width
//   BlocksSwiper(block, {
//     loop: true,
//     grabCursor: true,
//     spaceBetween: 20,
//     slidesPerView: 'auto',
//     pagination: {
//       el: paginationEl,
//       clickable: true,
//     },
//   });
// }



import BlocksSwiper from "../swiper/swiper.min.js";

export default function decorate(block) {
  block.classList.add("swiper");

  const swiperWrapper = document.createElement("div");
  swiperWrapper.classList.add("swiper-wrapper");

  Array.from(block.children).forEach((element) => {
    element.classList.add("swiper-slide");
    swiperWrapper.appendChild(element);
  });

  block.innerHTML = '';
  block.appendChild(swiperWrapper);

  const paginationEl = document.createElement("div");
  paginationEl.classList.add("swiper-pagination");
  block.appendChild(paginationEl);

  BlocksSwiper(block, {
    loop: true,
    grabCursor: true,
    spaceBetween: 10,
    pagination: {
      el: paginationEl,
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}
