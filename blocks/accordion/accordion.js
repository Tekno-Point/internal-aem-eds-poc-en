/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

export default function decorate(block) {
  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    // decorate accordion item body
    const body = row.children[1];
    body?.classList.add('accordion-item-body');
    // decorate accordion item
    const details = document.createElement('details');
    details.classList.add('accordion-item');
    details.append(summary, body);
    row.append(details);
  });

  // Hide paragraphs containing just hyphens
  Array.from(block.querySelectorAll(".accordion-item-body p")).forEach((el) => {
    el.style.visibility = el.textContent.includes("-") ? 'hidden' : "";
  });

  // Ensure only one accordion is open at a time
  block.querySelectorAll(".accordion-item").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        block.querySelectorAll(".accordion-item").forEach((otherItem) => {
          if (otherItem !== item) otherItem.removeAttribute("open");
        });
      }
    });
  });
}
