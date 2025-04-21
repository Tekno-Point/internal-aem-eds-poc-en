import buildtabblock from "../tabs/tabs.js";
import Swiper from '../testimonial/swiper-bundle.min.js';

export default function decorate(block) {
  buildtabblock(block);

  const tabPanels = block.querySelectorAll('.tabs-panel');

  if (tabPanels.length > 0) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('tabs-panels-wrapper');

    tabPanels.forEach(panel => {
      wrapper.appendChild(panel);
    });

    const tabsList = block.querySelector('.tabs-list');
    if (tabsList && tabsList.parentNode) {
      tabsList.parentNode.insertBefore(wrapper, tabsList.nextSibling);
    }
  }

  const swiperEl = block.querySelector('.tabs-panel .swiper');
  if (swiperEl) {
    new Swiper(swiperEl, {
      slidesPerView: "auto",
      spaceBetween: 16,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    });
  }
}
