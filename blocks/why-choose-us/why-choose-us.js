import Swiper from '../testimonial/swiper-bundle.min.js';

export default function decorate(block) {
    const slides = Array.from(block.children);

    // Only apply Swiper if there are more than 4 slides
    if (slides.length <= 4) return;

    // Create Swiper container elements
    const swiperWrapper = document.createElement('div');
    const swiperPagination = document.createElement('div');

    swiperWrapper.classList.add('swiper-wrapper');
    swiperPagination.classList.add('swiper-pagination');
    block.classList.add('swiper');

    // Prepare each slide
    slides.forEach((slide, slideIndex) => {
        slide.classList.add('swiper-slide');

        // Add unique class to each direct <div> inside the slide
        const innerDivs = slide.querySelectorAll(':scope > div');
        innerDivs.forEach((div, divIndex) => {
            div.classList.add(`swiper-slide-cards-${divIndex + 1}`);
        });

        swiperWrapper.appendChild(slide);
    });

    // Assemble the Swiper DOM structure
    block.appendChild(swiperWrapper);
    block.appendChild(swiperPagination);

    // Define Swiper initialization
    const initializeSwiper = () => {
        Swiper(block, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            pagination: {
                el: swiperPagination,
                clickable: true,
            },
        });
    };

    // Check viewport for mobile
    const isMobileView = window.matchMedia('(max-width: 768px)').matches;

    // Only initialize Swiper if:
    // - Desktop/tablet view, OR
    // - Mobile view AND more than one slide
    if (!isMobileView || slides.length > 1) {
        initializeSwiper();
    }
}
