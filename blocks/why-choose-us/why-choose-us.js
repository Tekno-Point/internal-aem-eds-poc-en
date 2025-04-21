import {
  div
} from "../../scripts/dom-helper.js";
import SwiperInit from "../why-choose-us/swiper-bundle.min.js";

export default function decorate(block) {
  const swiper = div({
      class: "swiper"
    },
    div({
        class: "swiper-wrapper"
      },
      ...Array.from(block.children).map((child) => {
        child.classList.add('swiper-slide');
        return child;
      })
    )
  )
  block.textContent = '';
  block.append(swiper)
  SwiperInit(swiper, {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
  });

}