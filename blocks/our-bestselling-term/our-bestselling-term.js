import Swiper from '../term-insurance-carousel/swiper-bundle.min.js';

export default function decorate(block) {
    block.classList.add('swiper');

    const swiperWrapper = document.createElement('div');
    const swiperPagination = document.createElement('div');
    swiperPagination.classList.add('swiper-pagination');
    swiperWrapper.classList.add('swiper-wrapper');

    Array.from(block.children).forEach((row, index) => {
        row.classList.add('swiper-slide');

        // Add unique class to each direct <div> inside .swiper-slide
        const divs = row.querySelectorAll(':scope > div');
        divs.forEach((div, divIndex) => {
            div.classList.add(`swiper-slide-cards-${divIndex + 1}`);
        });

        swiperWrapper.appendChild(row);
    });

    block.appendChild(swiperWrapper);
    block.appendChild(swiperPagination);

    Swiper(block, {
        loop: true,
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false,
        // },
        pagination: {
            el: swiperPagination,
            clickable: true,
        },
        slidesPerView: 1.1, // Default for small screens (can scroll more than 1)
        spaceBetween: 25,
        slidesOffsetBefore: 5,
        slidesOffsetAfter: -1,
        breakpoints: {
            480: {
                slidesPerView: 1.1,
                spaceBetween: 25,
                slidesOffsetBefore: 5,
                slidesOffsetAfter: -1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
                slidesOffsetBefore: 5,
                slidesOffsetAfter: -1,
            },
            1024: {
                slidesPerView: 3.2,
                spaceBetween: 32,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 40,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
            },
        },
    });
}
