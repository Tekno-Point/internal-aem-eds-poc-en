import buildtabblock from "../tabs/tabs.js";
import Swiper from '../testimonial/swiper-bundle.min.js';

export default function decorate(block) {
  buildtabblock(block);

  const tabPanels = block.querySelectorAll('.tabs-panel');

  const tabs = block.querySelectorAll('.tabs-tab');

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

  if (window.innerWidth < 768) {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');
  
    tabs.forEach(tab => {
      const tabId = tab.getAttribute('aria-controls');
      const panel = document.getElementById(tabId);
  
      if (panel) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('tabs-wrapper');
  
        // Insert wrapper before the tab, then move tab and panel into it
        tab.parentNode.insertBefore(wrapper, tab);
        wrapper.appendChild(tab);
        wrapper.appendChild(panel);
      }
    });
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
