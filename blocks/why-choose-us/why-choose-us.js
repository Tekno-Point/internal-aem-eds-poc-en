import Swiper from '../testimonial/swiper-bundle.min.js';

export default function decorate(block) {
  const slides = Array.from(block.children);
  const swiperWrapper = document.createElement('div');
  const swiperPagination = document.createElement('div');

  swiperWrapper.classList.add('swiper-wrapper');
  swiperPagination.classList.add('swiper-pagination');
  block.classList.add('swiper');

  slides.forEach((slide, slideIndex) => {
    slide.classList.add('swiper-slide');

    const innerDivs = slide.querySelectorAll(':scope > div');
    innerDivs.forEach((div, divIndex) => {
      div.classList.add(`swiper-slide-cards-${divIndex + 1}`);
    });

    swiperWrapper.appendChild(slide);
  });

  block.appendChild(swiperWrapper);
  block.appendChild(swiperPagination);

  const isMobileView = window.matchMedia('(max-width: 768px)').matches;
  const shouldInitSwiper = slides.length > 4 || (isMobileView && slides.length > 1);

  if (shouldInitSwiper) {
    Swiper(block, {
      slidesPerView: 'auto',
      spaceBetween: 12,
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
      breakpoints: {
        361: {
          spaceBetween: 12,
          slidesOffsetBefore: -0.1,
          slidesOffsetAfter: -0.1,
        },
        769: {
          spaceBetween: 14,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
        1025: {
          spaceBetween: 16,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
        1367: {
          spaceBetween: 16,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        }
      },
    });
  }
}
