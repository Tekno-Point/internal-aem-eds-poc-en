import Swiper from "../swipper/swipper-bundle.min.js";

export default function decorate(block) {
  const innerDivs = Array.from(block.children);

  // Add classnames to structure
  innerDivs.forEach((item) => {
    item.classList.add("prodCard");

    const [imgDiv, textDiv] = item.children;
    if (imgDiv) imgDiv.classList.add("prodImgDiv");
    if (textDiv) textDiv.classList.add("prodTextDiv");
  });

  // Wrap prodCards in Swiper DOM structure
  const wrapper = document.createElement("div");
  wrapper.classList.add("swiper-wrapper");

  // Move all prodCards into the wrapper and give Swiper class
  innerDivs.forEach((card) => {
    card.classList.add("swiper-slide");
    wrapper.appendChild(card);
  });

  // Create swiper container and append wrapper
  const swiperContainer = document.createElement("div");
  swiperContainer.classList.add("swiper");
  swiperContainer.appendChild(wrapper);

  // Clear block and insert swiper structure
  block.innerHTML = "";
  block.appendChild(swiperContainer);

  // Initialize Swiper
  new Swiper(swiperContainer, {
    slidesPerView: 2.2,
    spaceBetween: 16,
    loop: true,
    grabCursor: true,
    allowTouchMove: true,
    breakpoints: {
      0: {
        slidesPerView: 1.3,
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 2.2,
        spaceBetween: 16,
      },
    },
  });
}
