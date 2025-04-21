/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */
import { div, ul, li, a, p } from "../../scripts/dom-helpers.js"
import newSwiper from "../swiper/swiper-bundle.min.js"

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

        // const p = document.createElement('p')
        // p.className = 'accordion-item-p'
        // p.textContent = "Heyeyyeye"
        // body.prepend(p)
        //
        // decorate accordion item
        const details = document.createElement('details');
        details.className = 'accordion-item';
        details.append(summary, body);
        row.replaceWith(details);


    });


    // hide footer
    // setTimeout(() => {
    //     document.querySelector('.nav-wrapper').style.display = "none"
    // }, 500);

    // mobile view or desktop view
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }


    if (!isMobileDevice()) {


        const destContainer = div({ class: "accordian-container" },
            div({ class: "left-container" },
                ul({ class: "left-container-items" },
                    ...Array.from(block.children).map((element, uindex) => {
                        return li({
                            class: "left-container-item",
                            id: uindex,
                            onclick: ((event) => {
                                const tempBody = Array.from(block.children)[event.target.id].querySelector(".accordion-item-body").cloneNode(true);
                                block.nextElementSibling.querySelector(".left-container-subitem").innerHTML = ""
                                block.nextElementSibling.querySelector(".left-container-subitem").append(tempBody);

                            })
                        }, element.querySelector(".accordion-item-label").textContent.trim());
                    })
                )
            ),
            div({ class: "right-container" },
                div({ class: "right-container-element" },
                    ...Array.from(block.children).map((element, index) => {
                        return index === 0 ? div({ class: "left-container-subitem" }, element.querySelector(".accordion-item-body").cloneNode(true)) : "";
                    })
                )
            )
        )
        block.parentElement.append(destContainer)
    }


    newSwiper(document.querySelector('.left-container-subitem .swiper'), {
        direction: 'horizontal',
        slidesPerView: "auto",
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 1000,
        }
    })

    // if (isMobileDevice()) {
    //     console.log("Mobile view");
    // } else {
    //     console.log("Desktop view");
    //     const des1 = div({ class: "col1" },
    //         div({ class: "col1-div1" }, ul(
    //             ...Array.from(block.children).map((child, index) => {
    //                 return li({ class: `col1-tab-${index + 1}` }, child.getElementsByTagName('p')[0].textContent)
    //             })
    //         )),
    //         div({ class: "col1-div2" }, ul(li(
    //             // p({ class: "col1-p" },
    //             //     ...Array.from(block.children).map((child) => {
    //             //         return child.querySelector(".accordion-item-body p").textContent.trim()
    //             //     })
    //             // ),
    //             ...Array.from(block.children).map((child) => {
    //                 return a({ href: child.querySelector(".accordion-item-body a").textContent.trim() }, child.querySelector(".accordion-item-body a").textContent.trim())
    //             })
    //         ))),

    //     )
    //     block.append(des1)
    //     Array.from(document.querySelectorAll('.accordion details')).forEach(function (item) {
    //         item.style.display = "none"
    //     })
    // }


    // document.querySelector('.col1-div1').addEventListener('click', function (e) {
    //     const currrID = +e.target.classList.value.split('-').slice(-1).join() - 1
    //     Array.from(document.querySelectorAll('.col1-div2 .swiper-container')).forEach(function (item, index) {
    //         console.log("in")
    //         if (index !== currrID) {
    //             item.style.display = "none"
    //         } else {
    //             item.style.display = "block"
    //             item.style.display = "flex"
    //         }
    //     })
    // })

    setTimeout(() => {
        hideonLoad()
    }, 800);

    function hideonLoad() {
        const currrID = 0
        Array.from(document.querySelectorAll('.col1-div2 .swiper-container')).forEach(function (item, index) {
            console.log("in")
            if (index !== currrID) {
                item.style.display = "none"
            } else {
                item.style.display = "block"
                item.style.display = "flex"
            }
        })
    }


    // block.append(des1)
}