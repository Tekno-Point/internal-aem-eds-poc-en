import { createElement } from '../../scripts/scripts.js';
import Swiper from '../testimonial/swiper-bundle.min.js';
import configObject from '.carousel-config.js';
import { loadEmbed } from '../embed/embed.js';
import { isDesktop } from '../header/header.js';

export default function decorate(block) {
  const rows = Array.from(block.children);
  const config = rows[0];
  let configData = configObject.default;
  Array.from(block.classList).forEach((cls) => {
    if (configObject[cls]) configData = configObject[cls];
  });
  const props = rows.slice(3);
  const swiperWrapper = createElement('div', { classes: ['swiper-wrapper'] });
  const swiperButtonPrev = createElement('div', { classes: ['swiper-button-prev'] });
  const swiperButtonNext = createElement('div', { classes: ['swiper-button-next'] });
  const swiperPagination = createElement('div', { classes: ['swiper-pagination'] });
  config.remove();
  const prevArrow = Array.from(rows.slice(1, 2));
  const nextArrow = Array.from(rows.slice(2, 3));
  prevArrow.forEach((arrow) => {
    Array.from(arrow.children).forEach((child) => {
      swiperButtonPrev.appendChild(child);
    });
  });
  nextArrow.forEach((arrow) => {
    Array.from(arrow.children).forEach((child) => {
      swiperButtonNext.appendChild(child);
    });
  });
  props.forEach((eachProps) => {
    // eslint-disable-next-line max-len
    const [classes, imageDesktop, imageMobile, heading, description, embedLink] = Array.from(eachProps.children);
    const swiperSlide = createElement('div', { classes: ['swiper-slide'] });
    classes.textContent.trim().split(',').forEach((eachClass) => {
      swiperSlide.classList.add(eachClass.trim());
    });
    const embedDiv = createElement('div', { classes: ['video-component'] });
    const textWrapper = createElement('div', { classes: ['text-wrapper'] });
    imageDesktop.classList.add('image-desktop');
    imageMobile.classList.add('image-mobile');
    textWrapper.append(heading, description);
    if (isDesktop.matches) {
      swiperSlide.append(textWrapper, imageDesktop, embedDiv);
      imageMobile.remove();
    }
    else {
      swiperSlide.append(textWrapper, imageMobile, embedDiv);
      imageDesktop.remove();
    }
    try {
      loadEmbed(embedDiv, embedLink.textContent.trim());
    } catch (error) {
      console.log('Invalid URL:', error.message);
    }
    swiperWrapper.append(swiperSlide);
    classes.remove();
    embedLink.remove();
  });
  configData.navigation.nextEl = swiperButtonNext;
  configData.navigation.prevEl = swiperButtonPrev;
  configData.pagination.el = swiperPagination;
  block.classList.add('swiper', 'mySwiper');
  block.append(swiperWrapper, swiperButtonNext, swiperButtonPrev, swiperPagination);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          Swiper(block, {
            // Default parameters
            slidesPerView: 1,
            spaceBetween: 10,
            // Responsive breakpoints
            breakpoints: {
              // when window width is >= 320px
              320: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 3,
                spaceBetween: 30
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 4,
                spaceBetween: 40
              }
            }
          });
        }
      });
    },
  );

  observer.observe(block);
}