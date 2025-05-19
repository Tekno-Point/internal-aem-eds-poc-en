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

  // Find the div with data-section-status="loaded" and add classes to its child divs using :nth-of-type selector
  const sectionDiv = footer.querySelector('div[data-section-status="loaded"]');
  if (sectionDiv) {
    const firstDiv = sectionDiv.querySelector(':scope > div:nth-of-type(1)');
    if (firstDiv) firstDiv.classList.add('footer-menu');
    const secondDiv = sectionDiv.querySelector(':scope > div:nth-of-type(2)');
    if (secondDiv) secondDiv.classList.add('footer-columns');
    const thirdDiv = sectionDiv.querySelector(':scope > div:nth-of-type(3)');
    if (thirdDiv) thirdDiv.classList.add('footer-contact');
  }
}
