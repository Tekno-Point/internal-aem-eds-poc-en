import Swiper from '../carousel/swiper-bundle.min.js'

export default function decorate(block) {
    const rows = Array.from(block.children);

    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');

    const swiperPagination = document.createElement('div');
    swiperPagination.classList.add('swiper-pagination');

    rows.forEach((row) => {
        const contentWrapper = document.createElement('div');
        const content = row.children[1];
        contentWrapper.classList.add('content-wrapper');

        contentWrapper.append(content)
        row.append(contentWrapper)

        row.classList.add('swiper-slide')
        swiperWrapper.append(row);
    })

    block.append(swiperWrapper, swiperPagination);

    swiperInit();
}

function swiperInit() {
    new Swiper('.carousel.block', {
        // effect: "fade", 
        // loop: true,
        // autoplay: {
        //     delay: 3000,
        // },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    })
}
