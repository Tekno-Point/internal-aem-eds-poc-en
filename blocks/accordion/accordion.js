export default function decorate(block) {
    // Add structure classes to child rows
    Array.from(block.children).forEach((row) => {
        row.classList.add("accordion-sec-container");

        Array.from(row.children).forEach((column, index) => {
            column.classList.add("accordion-sec-container-column");
            column.classList.add(`column-${index + 1}`);
        });
    });

    // Add class to default-content-wrapper if exists
    const heading = block.querySelector('.accordion-container > div');
    if (heading) {
        heading.classList.add('new-class'); // No dot when using classList.add
    }

    // Add class to accordion-wrapper
    const accordionWrapper = block.querySelector('.accordion-wrapper');
    if (accordionWrapper) {
        accordionWrapper.classList.add('accordion-content-wrapper');
    }

    // Accordion behavior
    const accordionItems = block.querySelectorAll('.accordion-sec-container');

    accordionItems.forEach((item, i) => {
        const question = item.querySelector('.column-1');
        const answer = item.querySelector('.column-2');

        if (question && answer) {
            // Wrap question in button
            const button = document.createElement('button');
            button.classList.add('accordion-question');
            button.innerHTML = question.innerHTML;
            question.innerHTML = '';
            question.appendChild(button);

            // Style answer
            answer.classList.add('accordion-answer');

            // Default state
            if (i === 0) {
                answer.style.display = 'block'; // Open first
                button.classList.add('open');
            } else {
                answer.style.display = 'none';
            }

            // Click handler for single-open behavior
            button.addEventListener('click', () => {
                accordionItems.forEach((otherItem, j) => {
                    const otherAnswer = otherItem.querySelector('.column-2');
                    const otherButton = otherItem.querySelector('.accordion-question');
                    if (i === j) {
                        const isOpen = otherAnswer.style.display === 'block';
                        otherAnswer.style.display = isOpen ? 'none' : 'block';
                        otherButton.classList.toggle('open', !isOpen);
                    } else {
                        otherAnswer.style.display = 'none';
                        otherButton.classList.remove('open');
                    }
                });
            });
        }
    });


}
// const container = section.querySelector('.accordion-container');
// if (container) {
//   const ul = container.querySelector('ul');
//   if (ul) {
//     ul.classList.add('accordion-heading-list'); // Add custom class to <ul>

//     const lis = ul.querySelectorAll('li');
//     lis.forEach((li, index) => {
//       li.classList.add('accordion-heading-item');
//       li.classList.add(`heading-item-${index + 1}`); // Optional: index-based class
//     });
//   }
// }

// /*
//  * Accordion Block
//  * Recreate an accordion
//  * https://www.hlx.live/developer/block-collection/accordion
//  */
// import { div, ul, li, a, p } from "../../scripts/dom-helpers.js"

// export default function decorate(block) {
//     [...block.children].forEach((row) => {
//         // decorate accordion item label
//         const label = row.children[0];
//         const summary = document.createElement('summary');
//         summary.className = 'accordion-item-label';
//         summary.append(...label.childNodes);
//         // decorate accordion item body
//         const body = row.children[1];
//         body.className = 'accordion-item-body';
//         const details = document.createElement('details');
//         details.className = 'accordion-item';
//         details.append(summary, body);
//         row.replaceWith(details);
//     });


//     // mobile view or desktop view
//     function isMobileDevice() {
//         return window.innerWidth <= 768;
//     }


//     if (!isMobileDevice()) {
//         const destContainer = div({ class: "accordian-container" },
//             div({ class: "left-container" },
//                 ul({ class: "left-container-items" },
//                     ...Array.from(block.children).map((element, uindex) => {
//                         return li({
//                             class: (uindex ? "left-container-item" : "left-container-item active"),
//                             id: uindex,
//                             onclick: ((event) => {
//                                 const myid = `left-${event.target.id}`;
//                                 // document.getElementById(event.target.id).classList.add('active')
//                                 document.querySelectorAll('.left-container-item').forEach(function (item, index) {
//                                     if (event.target.id == index) {
//                                         item.classList.add('active');
//                                     } else {
//                                         item.classList.remove('active');
//                                     }
//                                 })
//                                 destContainer.querySelectorAll('.left-container-subitem').forEach(function (each) {
//                                     if (each.dataset.targetId == myid) {
//                                         each.classList.remove('dsp-none');
//                                     } else {
//                                         each.classList.add('dsp-none');
//                                     }
//                                 })
//                             })
//                         }, element.querySelector(".accordion-item-label").textContent.trim());
//                     })
//                 )
//             ),
//             div({ class: "right-container" },
//                 div({ class: "right-container-element" },
//                     ...Array.from(block.children).map((element, index) => {
//                         return div({ class: (index ? "left-container-subitem dsp-none" : "left-container-subitem"), 'data-target-id': `left-${index}` }, element.querySelector(".accordion-item-body"))
//                     })
//                 )
//             )
//         )
//         block.parentElement.append(destContainer)
//         document.querySelector('.accordion').style.display = "none"
//     }
// }
