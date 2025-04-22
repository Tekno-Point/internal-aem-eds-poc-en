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
    tabs.forEach(tab => {
      const tabId = tab.getAttribute('aria-controls');
      // console.log('Tab controls panel ID:', tabId);
      const wrapper = document.createElement('div');
      wrapper.classList.add('tabs-wrapper');

      tab.parentNode.insertBefore(wrapper, tab);
      wrapper.appendChild(tab);



      tabPanels.forEach(panel => {
        const panelTabId = panel.id;

        if (tabId === panelTabId) {
          wrapper.appendChild(panel)
        }
      });
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
