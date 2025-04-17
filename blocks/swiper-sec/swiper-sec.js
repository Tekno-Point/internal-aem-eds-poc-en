// import { createElement } from '../../scripts/scripts.js';
// import configObject from './carousel-config.js';
// import Swiper1 from './swiper-bundle.min.js';
import Swiper from '../testimonial/swiper-bundle.min.js';

export default function decorate(block) {
    block.classList.add('swiper');

    const swiperWrapper = document.createElement('div');
    const swiperPagination = document.createElement('div');
    swiperPagination.classList.add('swiper-pagination');
    swiperWrapper.classList.add('swiper-wrapper');

    Array.from(block.children).forEach((row, index) => {
        row.classList.add('swiper-slide');
        
        // Find <section> in the slide and modify its child <div>s
        const section = row.querySelector('section');
        if (section) {
            const divs = section.querySelectorAll('div');
            divs.forEach((div, i) => {
                div.classList.add(`slide-${index + 1}-cards-${i + 1}`);
            });
        }

        swiperWrapper.appendChild(row);
    });

    block.appendChild(swiperWrapper);
    block.appendChild(swiperPagination);

    Swiper(block, {
        slidesPerView: "auto",
        spaceBetween: 32,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: swiperPagination,
            clickable: true,
        },
    });
}
