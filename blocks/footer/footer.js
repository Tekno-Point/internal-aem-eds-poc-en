import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../../scripts/scripts.js';
/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata("footer");
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : "/footer";
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = "";
  const footer = document.createElement("div");
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);


  block.append(footer);
if (window.innerWidth <= 776) {

  if (footer && footer.querySelector(".button-container")) {
    document.querySelectorAll(".button-container").forEach((button) => {
      button.addEventListener("click", () => {
        const content = button.nextElementSibling;

        // Close all other dropdowns
        document.querySelectorAll(".button-container").forEach((otherButton) => {
          const otherContent = otherButton.nextElementSibling;
          if (otherButton !== button) {
            otherContent?.classList.remove("open");
            otherButton.classList.remove("dropdown-border-bottom");
          }
        });

        // Toggle the clicked one
        content?.classList.toggle("open");
        button.classList.toggle("dropdown-border-bottom");
      });
    });
  }
}

}

