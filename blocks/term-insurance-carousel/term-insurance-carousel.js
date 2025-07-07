import Swiper from './swiper-bundle.min.js';

export default function decorate(block) {
    block.classList.add('swiper');

    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');

    const swiperButtonPrev = document.createElement('div');
    const swiperButtonNext = document.createElement('div');
    swiperButtonPrev.classList.add('swiper-button-prev');
    swiperButtonNext.classList.add('swiper-button-next');

    Array.from(block.children).forEach((row, index) => {
        row.classList.add('swiper-slide');

        const divs = row.querySelectorAll(':scope > div');
        divs.forEach((div, divIndex) => {
            div.classList.add(`swiper-slide-cards-${divIndex + 1}`);
        });

        swiperWrapper.appendChild(row);
    });

    block.appendChild(swiperWrapper);
    block.appendChild(swiperButtonPrev);
    block.appendChild(swiperButtonNext);

    Swiper(block, {
        slidesPerView: "auto",
        spaceBetween: 20,
        slidesOffsetBefore: 5,
        slidesOffsetAfter: 5,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: false,
        navigation: {
            nextEl: swiperButtonNext,
            prevEl: swiperButtonPrev,
        },
        breakpoints: {
            769: {
                spaceBetween: 20,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
            }
        },
    });
}
