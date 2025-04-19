import Swiper from '../testimonial/swiper-bundle.min.js';

export default function decorate(block) {
  const slides = Array.from(block.children);

  // Create Swiper DOM structure regardless of slide count
  const swiperWrapper = document.createElement('div');
  const swiperPagination = document.createElement('div');

  swiperWrapper.classList.add('swiper-wrapper');
  swiperPagination.classList.add('swiper-pagination');
  block.classList.add('swiper');

  // Prepare and move slides into Swiper wrapper
  slides.forEach((slide, slideIndex) => {
    slide.classList.add('swiper-slide');

    const innerDivs = slide.querySelectorAll(':scope > div');
    innerDivs.forEach((div, divIndex) => {
      div.classList.add(`swiper-slide-cards-${divIndex + 1}`);
    });

    swiperWrapper.appendChild(slide);
  });

  // Append Swiper structure to the block
  block.appendChild(swiperWrapper);
  block.appendChild(swiperPagination);

  // Only initialize Swiper if more than 4 slides (desktop) or more than 1 (mobile)
  const isMobileView = window.matchMedia('(max-width: 768px)').matches;
  const shouldInitSwiper = slides.length > 4 || (isMobileView && slides.length > 1);

  if (shouldInitSwiper) {
    Swiper(block, {
      slidesPerView: 'auto',
      spaceBetween: 32,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      pagination: {
        el: swiperPagination,
        clickable: true,
      },
    });
  }
}
