import { div, input, button } from "../../scripts/dom-helpers.js";

export default async function decorate(block) {
    block.textContent = '';

    const formDiv = div(
        { class: "form-maindiv" },
        input({ class: "form-input firstname", placeholder: "First Name" }),
        input({ class: "form-input lastName", placeholder: "last Name" }),
        button({ class: "submit" }, "Submit")
    );
    block.append(formDiv)
    // getintouch

}

