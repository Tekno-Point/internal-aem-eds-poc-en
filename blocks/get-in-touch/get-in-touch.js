import { div, input, button, label, select, option, p, h2 } from "../../scripts/dom-helpers.js";

export default async function decorate(block) {
    block.textContent = '';
    const formDiv = div(
        { class: "form-maindiv" },
        div({ class: "heading" }, h2("Get in touch"), p("Drop your query and we will contact you")),
        div({ class: "form-div" },
            label({ class: "form-label" }, "Name *"),
            input({ class: "form-input" }),
            label({ class: "form-label" }, "Your phone number *"),
            input({ class: "form-input" }),
            input({ class: "form-input" }),
            label({ class: "form-label" }, "Email*"),
            input({ class: "form-input" }),
            label({ class: "form-label" }, "Pincode*"),
            input({ class: "form-input" }),
            label({ class: "form-label" }, "Query*"),
            select({ class: "form-select", }, (option({ class: "form-option" }, "select"))),
            label({ class: "form-label" }, "Your comment*"),
            input({ class: "form-input", }),
            button({ class: "submit" }, "Get Started")
        )
    );
    block.append(formDiv)
    console.log(block, "getintouch")
    setTimeout(() => {
        document.querySelector('.header').style.display = "none"
        document.querySelector('.footer').style.display = "none"

    }, 700);

}

