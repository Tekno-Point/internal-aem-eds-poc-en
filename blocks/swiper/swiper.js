import Swiper from "../swiper/swiper-bundle.min.js"

export default function decorate(block) {
    block.classList.add('swiper')
    const Div = document.createElement('div')
    Div.classList.add('swiper-wrapper')
    Array.from(block.children).forEach((item) => {
        item.classList.add('swiper-slide')
        Div.append(item)
    })
    block.append(Div)
    Swiper(block, {
        direction: 'horizontal',
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 1000,
        }
    })
    Array.from(document.querySelectorAll('.col1-div2 .swiper-container')).forEach(function (item, index) {
        if (index !== 0) {
            item.style.display = "none"
        } else {
            item.style.display = "block"
        }
    })
}