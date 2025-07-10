import Swiper from "../swipper/swipper-bundle.min.js";

export default function decorate(block) {
  const innerDivs = Array.from(block.children);

  innerDivs.forEach((item) => {
    item.classList.add("prodCard");

    const [imgDiv, textDiv] = item.children;
    if (imgDiv) imgDiv.classList.add("prodImgDiv");
    if (textDiv) textDiv.classList.add("prodTextDiv");
  });

  const wrapper = document.createElement("div");
  wrapper.classList.add("swiper-wrapper");

  innerDivs.forEach((card) => {
    card.classList.add("swiper-slide");
    wrapper.appendChild(card);
  });

  const swiperContainer = document.createElement("div");
  swiperContainer.classList.add("swiper");
  swiperContainer.appendChild(wrapper);

  block.innerHTML = "";
  block.appendChild(swiperContainer);

  new Swiper(swiperContainer, {
    slidesPerView: 2.2,
    spaceBetween: 16,
    loop: true,
    grabCursor: true,
    allowTouchMove: true,
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 2.2,
        spaceBetween: 16,
      },
    },
  });
}
