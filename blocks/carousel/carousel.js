import Swiper from '../carousel/swiper-bundle.min.js'

export default function decorate(block) {
    const rows = Array.from(block.children);

    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');

    rows.forEach(row => {
        row.classList.add('swiper-slide');
        swiperWrapper.append(row);
    });
    block.append(swiperWrapper);

    swiperInit(block);
}


function swiperInit(block) {
    const swiperConfig = {}

    if (block.classList.contains('pagination')) {
        const swiperPagination = document.createElement('div');
        swiperPagination.classList.add('swiper-pagination');
        block.append(swiperPagination);
        swiperConfig.pagination = {
            el: '.carousel.block.pagination .swiper-pagination',
            clickable: true,
        }
    }
    new Swiper(block, swiperConfig)
}