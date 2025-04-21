import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import accordion from "../accordion/accordion.js"
import { div, input, button} from "../../scripts/dom-helper.js";

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
  const maindiv = div(
    { class: "footer-top footer-section" },
    input({ class: "footer-inp", placeholder: "Notify me with new updates" }),
    button({ class: "footer-btn" }, "Subscribe")
  );
  const footer = document.createElement('div');
  footer.append(maindiv);
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  accordion(footer.querySelector(".footer-accordion"));
  block.append(footer);
}
