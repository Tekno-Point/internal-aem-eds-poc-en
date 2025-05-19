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

  // Find the div with data-section-status="loaded" and add classes to its child divs using nth-child
  const sectionDiv = footer.querySelector('div[data-section-status="loaded"]');
  if (sectionDiv) {
    const children = sectionDiv.children;
    if (children[0]) children[0].classList.add('footer-menu'); // 1st child
    if (children[1]) children[1].classList.add('footer-columns'); // 2nd child
    if (children[2]) children[2].classList.add('footer-contact'); // 3rd child
  }
}
