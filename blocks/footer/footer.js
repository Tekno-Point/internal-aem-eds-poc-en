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
// console.log(block)
// console.log(footer)
  block.append(footer);


if (window.innerWidth <= 776) {

if (footer && footer.querySelector(".button-container")) {
  const buttons = document.querySelectorAll(".button-container");

  // Step 1: Add class to all buttons on load
  buttons.forEach((button) => {
    button.classList.add("dropdown-border-bottom");
  });

  // Step 2: Setup click handlers for buttons
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isOpen = content?.classList.contains("open");

      // Step 3: Close all other dropdowns and reset classes
      buttons.forEach((otherButton) => {
        const otherContent = otherButton.nextElementSibling;
        if (otherButton !== button) {
          otherContent?.classList.remove("open");
          otherButton.classList.add("dropdown-border-bottom");
          otherButton.classList.remove("active");
        }
      });

      // Step 4: Toggle clicked dropdown and update button style
      if (!isOpen) {
        content?.classList.add("open");
        button.classList.remove("dropdown-border-bottom");
        button.classList.add("active");
      } else {
        content?.classList.remove("open");
        button.classList.add("dropdown-border-bottom");
        button.classList.remove("active");
      }
    });
  });

  // ✅ Step 5: Close dropdowns when a specific footer <li> is clicked
  document.querySelectorAll(
    ".footer-wrapper .footer .columns-container .columns-wrapper .columns > div div:last-child ul li"
  ).forEach((li) => {
    li.addEventListener("click", () => {
      buttons.forEach((button) => {
        const content = button.nextElementSibling;
        content?.classList.remove("open");
        button.classList.add("dropdown-border-bottom");
        button.classList.remove("active");
      });
    });
  });
}

}

}

