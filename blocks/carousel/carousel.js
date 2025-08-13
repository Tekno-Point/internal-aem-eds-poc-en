import { createElement, isMobile } from '../../scripts/scripts.js';
import Swiper from '../carousel/swiper-bundle.min.js';
// import configObject from '../carousel/carousel-config.js';
import { isDesktop } from '../header/header.js';

export default function decorate(block) {
    const rows = Array.from(block.children);
    const props = rows.slice(4);
    let configString = block?.children[3]?.innerText.trim();
    const configData = configString ? JSON.parse(configString) : '';
    // let configData = configObject.default;
    // Array.from(block.classList).forEach((cls) => {
    //     if (configObject[cls]) configData = configObject[cls];
    // });
    const swiperWrapper = createElement('div', { classes: ['swiper-wrapper'] });
    const swiperButtonPrev = createElement('div', { classes: ['swiper-button-prev'] });
    const swiperButtonNext = createElement('div', { classes: ['swiper-button-next'] });
    const swiperPagination = createElement('div', { classes: ['swiper-pagination'] });
    // config.remove();
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
    block.innerHTML = '';
    props.forEach((eachProps) => {
        // eslint-disable-next-line max-len
        const [classes, imageDesktop, imageMobile, imgLink, heading, description] = Array.from(eachProps.children);
        const swiperSlide = createElement('div', { classes: ['swiper-slide'] });
        classes.textContent.trim().split(',').forEach((eachClass) => {
            swiperSlide.classList.add(eachClass.trim());
        });
        const embedDiv = createElement('div', { classes: ['video-component'] });
        const textWrapper = createElement('div', { classes: ['text-wrapper'] });
        let anchorTag = imgLink?.children[0]?.children[0];
        imageDesktop.classList.add('image-desktop');
        imageMobile.classList.add('image-mobile');
        textWrapper.append(heading);
        if (anchorTag) {
            anchorTag.textContent = '';
            anchorTag.append(imageDesktop, imageMobile)
            swiperSlide.append(anchorTag);
        }
        else {
            swiperSlide.append(imageDesktop, imageMobile);
        }
        swiperSlide.append(textWrapper)
        swiperSlide.append(description);
        swiperWrapper.append(swiperSlide);
        classes.remove();
    });
    if (configData) {
        configData.slidesPerView = 1; // default for mobile
        configData.breakpoints = {
            320:{ slidesPerView:2},
            768: { slidesPerView: 2 }, // tablets
            1024: { slidesPerView: 4 } // desktop
        };
        configData.navigation.nextEl = swiperButtonNext || '';
        configData.navigation.prevEl = swiperButtonPrev || '';
        configData.pagination.el = swiperPagination || '';
    }
    block.classList.add('swiper', 'my-swiper');
    block.append(swiperWrapper, swiperButtonNext, swiperButtonPrev, swiperPagination);

    if (!block.closest(".section.mob-carousel") ) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        Swiper(block, configData);
                    }
                });
            },
        );
        observer.observe(block);
    }
    else if(block.closest(".section.mob-carousel") && isMobile.matches){
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        Swiper(block, configData);
                    }
                });
            },
        );
        observer.observe(block);
    }

}