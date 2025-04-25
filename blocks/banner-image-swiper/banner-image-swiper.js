import { div, form, label, input, button } from "../../scripts/dom-helper.js";
import Swiper from "../banner-image-swiper/swiper-min.js";

export default function decorate(block) {
  console.log(block);
//   const bannerFormContainer = document.querySelector(".banner-form-container");
  const bannerFormContainer = block.closest(".banner-form-container");
  bannerFormContainer
    .querySelector(".banner-image-swiper-wrapper")
    .classList.add("swiper");
  bannerFormContainer
    .querySelector(".banner-image-swiper")
    .classList.add("swiper-wrapper");
  bannerFormContainer
    .querySelectorAll(".banner-image-swiper>div")
    .forEach((e) => {
      e.classList.add("swiper-slide");
    });
  const paginationDiv = div({ class: "swiper-pagination" });
  bannerFormContainer
    .querySelector(".banner-image-swiper-wrapper")
    .appendChild(paginationDiv);

    new Swiper(block.closest('.swiper'), {
      // Optional parameters
      direction: "horizontal",
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 2000,
      },

      pagination: {
        el: ".swiper-pagination",
      },
    });

    //   Form creation
    const mainForm = form({ class: "form-content" });

  const formTitle = block
    .closest(".banner-form-container")
    .querySelector(".banner-form>div>div h3");
  formTitle.insertAdjacentElement("afterend", mainForm);

    //   Name Field
    const nameField = div({ class: "form-field name-field" });
    mainForm.appendChild(nameField);
    const nameLabel = label({ for: 'name' }, "Name");
    nameField.appendChild(nameLabel);
    const nameInp = input({ id: 'name', placeholder: "anurag pandey" });
    nameField.appendChild(nameInp);

    //   Phone Number Field
    const phoneField = div({ class: "form-field phone-field" });
    mainForm.appendChild(phoneField);
    const phoneLabel = label({ for: 'phone' }, "Your phone number");
    phoneField.appendChild(phoneLabel);
    const phoneInpDiv = div();
    const phoneCode = input({
        type: "text",
        value: "+91",
        readonly: true
    });

    const phoneNumber = input({ type: "number", id: 'phone', placeholder: '8989898989' });

    phoneInpDiv.appendChild(phoneCode);
    phoneInpDiv.appendChild(phoneNumber);
    phoneField.appendChild(phoneInpDiv);

    //   Email Field
    const emailField = div({ class: "form-field email-field" });
    mainForm.appendChild(emailField);
    const emailLabel = label({ for: 'email' }, "Email");
    emailField.appendChild(emailLabel);
    const emailInp = input({ type: 'email', id: 'email', placeholder: 'anurag@gmail.com' });
    emailField.appendChild(emailInp);

    //  Pincode Field
    const pincodeField = div({ class: "form-field pincode-field" });
    mainForm.appendChild(pincodeField);
    const pincodeLabel = label('Pincode');
    pincodeField.appendChild(pincodeLabel);
    const pinInpDiv = div();
    const inpone = input({ type: 'number', placeholder: '0' });
    const inptwo = input({ type: 'number', placeholder: '0' });
    const inpthree = input({ type: 'number', placeholder: '0' });
    const inpfour = input({ type: 'number', placeholder: '0' });
    const inpfive = input({ type: 'number', placeholder: '0' });
    const inpsix = input({ type: 'number', placeholder: '0' });
    pinInpDiv.append(inpone, inptwo, inpthree, inpfour, inpfive, inpsix);
    pincodeField.appendChild(pinInpDiv);

    // Create Button
    const bannerFormDiv = block.closest(".banner-form-container").querySelector(".banner-form>div>div");
    const formBtn = button({ class: 'form-btn' }, "Get Started");
    bannerFormDiv.appendChild(formBtn);
}

