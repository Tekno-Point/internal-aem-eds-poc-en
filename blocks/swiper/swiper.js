import SwiperText from "../swiper/swiper-bundle.min.js"
export default function decorate(block){
    block.classList.add("swiper");
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    Array.from(block.children).forEach((element)=>{
        element.classList.add("swiper-slide");
        swiperWrapper.append(element)
    })
}