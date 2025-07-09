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
}

// const accordion = document.querySelector('.footer .accordion-wrapper .accordion');
// const children = accordion.querySelectorAll(':scope > div');

// let allEmpty = true;

// children.forEach(child => {
//   if (child.textContent.trim() !== '') {
//     allEmpty = false;
//   }
// });

// if (allEmpty) {
//   accordion.style.display = 'none';
// }
