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
    body.className = 'accordion-item-body';
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);
    row.replaceWith(details);
  });

  Array.from(block.querySelectorAll(".accordion-item-body p")).forEach((el) => {
    el.style.visibility = el.textContent.includes("-") ? 'hidden' : ""
  })
  Array.from(block.querySelectorAll(".accordion-item")).forEach((element) => {
    element.addEventListener("click", (event) => {
      Array.from(block.querySelectorAll(".accordion-item")).forEach((elem) => {
        elem.removeAttribute("open");
      })
      event.target.setAttribute('open', '')
    })
  })
}