const swiperone = {
  // loop: true,
  slidesPerView: 1,
  grabCursor: true,
  autoplay: {
    delay: 50000000,
    disableOnInteraction: false,
  },
  navigation: {
    // nextEl: swiperButtonNext,
    // prevEl: swiperButtonPrev,
  },
  pagination: {
    // el: swiperPagination,
    clickable: true,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    780: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: 1,
    },
    1199: {
      slidesPerView: 1,
    },
  },
};
const twoSlidesOnly = {
  loop: true,
  slidesPerView: 2,
  grabCursor: true,
  // autoplay: {
  //   // delay: 5000,
  //   // disableOnInteraction: false,
  // },
  navigation: {
    // nextEl: swiperButtonNext,
    // prevEl: swiperButtonPrev,
  },
  pagination: {
    // el: swiperPagination,
    clickable: true,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
      grabCursor: true,
    },
    780: {
      slidesPerView: 1,
      grabCursor: true,
    },
    992: {
      slidesPerView: 2,
    },
    1199: {
      slidesPerView: 2,
    },
  },
};
const threeSlidesOnly = {
  loop: true,
  slidesPerView: 3,
  grabCursor: true,
  autoplay: false,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  navigation: {
    // nextEl: swiperButtonNext,
    // prevEl: swiperButtonPrev,
  },
  pagination: {
    // el: swiperPagination,
    clickable: true,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    780: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1199: {
      slidesPerView: 3,
    },
  },
};
export default {
  'swiper-one': swiperone,
  'two-slides-only': twoSlidesOnly,
  'three-slides-only': threeSlidesOnly,
  default: threeSlidesOnly,
};
