import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
  // Array.from(document.querySelector(".footer div").children).forEach((el,index) => {
  //   el.classList.add("subSection"+(index+1))
  // })
  // const isMobile = window.matchMedia('(max-width: 767px)').matches;
  // if (!isMobile) {
  //   [...document.querySelectorAll(".subSection1.accordion-container details")].forEach((el,index) => {
  //     el.setAttribute('open',"")
  //   })
  // }

}

