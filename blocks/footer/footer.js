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

  // Add class names to columns inside the footer-columns wrapper
  const columnsWrapper = footer.querySelector('.columns-wrapper.footer-columns');
  if (columnsWrapper) {
    const columnsBlock = columnsWrapper.querySelector('.columns.block.columns-2-cols');
    if (columnsBlock) {
      const colDivs = columnsBlock.querySelectorAll(':scope > div > div');
      if (colDivs[0]) {
        colDivs[0].classList.add('footer-col-left');
        const leftPs = colDivs[0].querySelectorAll('p');
        if (leftPs[0]) leftPs[0].classList.add('p1');
        if (leftPs[1]) leftPs[1].classList.add('p2');
      }
      if (colDivs[1]) {
        colDivs[1].classList.add('footer-col-right');
        // Add class names to li elements inside the first ul in footer-col-right
        const rightUl = colDivs[1].querySelector('ul');
        if (rightUl) {
          const rightLis = rightUl.querySelectorAll(':scope > li');
          // Add class names to nested li elements in li1 (copyright, privacy, acknowledge)
          if (rightLis[0]) {
            rightLis[0].classList.add('li1');
            const nestedUl1 = rightLis[0].querySelector('ul');
            if (nestedUl1) {
              const nestedLis1 = nestedUl1.querySelectorAll(':scope > li');
              if (nestedLis1[0]) nestedLis1[0].classList.add('footer-copyright-li');
              if (nestedLis1[1]) nestedLis1[1].classList.add('footer-privacy-li');
              if (nestedLis1[2]) nestedLis1[2].classList.add('footer-acknowledge-li');
            }
          }
          // Add class names to nested li elements in li2 (social icons)
          if (rightLis[1]) {
            rightLis[1].classList.add('li2');
            const nestedUl2 = rightLis[1].querySelector('ul');
            if (nestedUl2) {
              const nestedLis2 = nestedUl2.querySelectorAll(':scope > li');
              if (nestedLis2[0]) nestedLis2[0].classList.add('facebook');
              if (nestedLis2[1]) nestedLis2[1].classList.add('instagram');
              if (nestedLis2[2]) nestedLis2[2].classList.add('youtube');
              if (nestedLis2[3]) nestedLis2[3].classList.add('linkedin');
            }
          }
        }
      }
    }
  }
}
