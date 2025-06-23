import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {

  Array.from(block.children).forEach((row, rowIndex) => {
    row.classList.add("footer-content");
    row.classList.add(`sec-${rowIndex + 1}`);
    Array.from(row.children).forEach((column, colIndex) => {
      column.classList.add("footer-content-column");
      column.classList.add(`sebtxt-${colIndex + 1}`);
    });
  });
  const listBlocks = block.querySelectorAll(".footer-content-column ul");
  listBlocks.forEach((ul, index) => {
    ul.classList.add(`footer-content-ul-${index + 1}`);
  });

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
