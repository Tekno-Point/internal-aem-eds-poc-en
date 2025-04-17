/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */
import { div, ul, li, a } from "../../scripts/dom-helpers.js"

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

        //
        const p = document.createElement('p')
        p.className = 'accordion-item-p'
        p.textContent = "Heyeyyeye"
        body.prepend(p)
        //
        // decorate accordion item
        const details = document.createElement('details');
        details.className = 'accordion-item';
        details.append(summary, body);
        row.replaceWith(details);


    });

    // const des1 = div({ class: "col1" },
    //     div(ul(li("testone"))),
    //     div(ul(li(
    //         ...Array.from(block.children).map((child) => {
    //             return a({ href: child.querySelector(".accordion-item-body a").textContent.trim() }, child.querySelector(".accordion-item-body a").textContent.trim())
    //         })
    //     ))),

    // )

    // hide footer
    setTimeout(() => {
        document.querySelector('.nav-wrapper').style.display = "none"
    }, 500);

    // mobile view or desktop view
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }

    if (isMobileDevice()) {
        console.log("Mobile view");
    } else {
        console.log("Desktop view");
    }


    block.append(des1)
}