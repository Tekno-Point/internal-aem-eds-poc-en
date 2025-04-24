const oneSlideOnly = {
    loop: true,
    // slidesPerView: 1,
    // grabCursor: true,
    // loop: true,
    // autoplay: {
    //     delay: 5000, // 5 seconds
    //     disableOnInteraction: false,
    // },
    slidesPerView: "auto",
    spaceBetween: 16,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    // navigation: {
    //     nextEl: swiperButtonNext,
    //     prevEl: swiperButtonPrev,
    // },
    // pagination: {
    //     // el: swiperPagination,
    //     clickable: true,
    // },
    // breakpoints: {
    //     300: {
    //         slidesPerView: 1,
    //     },
    //     780: {
    //         slidesPerView: 1,
    //     },
    //     992: {
    //         slidesPerView: 1,
    //     },
    //     1199: {
    //         slidesPerView: 1,
    //     },
    // },
};

const twoSlidesOnly = {
    loop: true,
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: 16,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    // loop: true,
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    // },
    navigation: {
        // nextEl: swiperButtonNext,
        // prevEl: swiperButtonPrev,
    },
    pagination: {
        // el: swiperPagination,
        clickable: true,
    },
    // breakpoints: {
    //     300: {
    //         slidesPerView: 1,
    //         grabCursor: true,
    //     },
    //     780: {
    //         slidesPerView: 1,
    //         grabCursor: true,
    //     },
    //     992: {
    //         slidesPerView: 2,
    //     },
    //     1199: {
    //         slidesPerView: 2,
    //     },
    // },
};

const threeSlidesOnly = {
    loop: true,
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: 16,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    // loop: true,
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
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
            spaceBetween: 16,
        },
        780: {
            spaceBetween: 24,
        },
        992: {
            spaceBetween: 32,
        },
        1199: {
            spaceBetween: 32,
        },
    },
};

// const threeSlidesOnly = {
//     slidesPerView: "auto",
//     spaceBetween: 16,
//     slidesOffsetBefore: 24,
//     slidesOffsetAfter: 24,
//     loop: true,
//     speed: 1000,
//     autoplay: {
//         delay: 5000,
//         disableOnInteraction: false,
//     },
//     breakpoints: {
//         361: {
//             spaceBetween: 16,
//             slidesOffsetBefore: 24,
//             slidesOffsetAfter: 24,
//         },
//         769: {
//             spaceBetween: 24,
//             slidesOffsetBefore: 24,
//             slidesOffsetAfter: 40,
//         },
//         1025: {
//             spaceBetween: 40,
//             slidesOffsetBefore: 80,
//             slidesOffsetAfter: 80,
//         },
//         1367: {
//             spaceBetween: 40,
//             slidesOffsetBefore: 80,
//             slidesOffsetAfter: 80,
//         },
//         1683: {
//             spaceBetween: 40,
//             slidesOffsetBefore: 80,
//             slidesOffsetAfter: 80,
//         },
//         1921: {
//             spaceBetween: 48,
//             slidesOffsetBefore: 79,
//             slidesOffsetAfter: 90,
//         },
//     },
// }
export default {
    'one-slide-only': oneSlideOnly,
    'two-slides-only': twoSlidesOnly,
    'three-slides-only': threeSlidesOnly,
    default: threeSlidesOnly,
};
