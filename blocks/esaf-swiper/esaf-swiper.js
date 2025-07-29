// import SwiperText from "../swiper/swiper.min.js"
// export default function decorate(block) {
// //   const paginationTexts = ['Brakes', 'i3S Technology', 'Rear Suspension', 'Seat','Side Stand Indicator','xSENS FI Technology','Tyer','Warranty'];
//   const paginationTexts = [];
//   console.log(block);
//   block.classList.add("swiper");
//   const swapperWapper = document.createElement("div");
//   swapperWapper.classList.add("swiper-wrapper")
//   Array.from(block.children).forEach((element) => {
//     paginationTexts.push(element?.firstElementChild?.firstElementChild);
//     element.classList.add("swiper-slide")
//     swapperWapper.append(element);
//   })
// //   debugger;
//   block.append(swapperWapper)
//   // swiper-pagination
  

//   const btnWrapper = document.createElement("div");
//   btnWrapper.classList.add("btnWrapper");

//   const divPagination = document.createElement("div");
//   divPagination.classList.add("swiper-pagination");
//   divPagination.style.display = "none";
//   btnWrapper.append(divPagination);

//   const LeftArrow = document.createElement("div");
//   LeftArrow.classList.add("swiper-button-prev");
//   btnWrapper.appendChild(LeftArrow);

//   const RightArrow = document.createElement("div")
//   RightArrow.classList.add("swiper-button-next");
//   btnWrapper.appendChild(RightArrow);

//   block.append(btnWrapper)

//   var swiper = new SwiperText(block, {
//     spaceBetween: 30,
//     //  effect: "fade",
//     //   fadeEffect: {
//     //     crossFade: true
//     //   },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//   });
  
// }




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

  // Initialize Swiper
  const swiper = new SwiperText(block, {
  spaceBetween: 30,
  loop: true, // enables infinite loop
  autoplay: {
    delay: 3000, // ⏱ time in ms between slides (e.g., 3000 = 3 seconds)
    disableOnInteraction: false, // keeps autoplay running after user interactions
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
