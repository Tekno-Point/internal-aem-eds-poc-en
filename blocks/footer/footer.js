import { getMetadata } from "../../scripts/aem.js";
import accordionBlock from "../accordion/accordion.js";
import { select, option, div, p, a, input } from "../../scripts/dom-helpers.js";
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
  if (window.innerWidth < 786) {
    Array.from(
      document.querySelector(".footer-sec2 .default-content-wrapper").children
    ).forEach((element) => {
      accordionBlock(element);
    });
  }

  // footer show and hide

  function footerShowHide() {
    document
      .querySelector(".footer-sec3 div")
      .childNodes.forEach(function (item, index) {
        console.log(item);
        item.classList.add(`sec3-${index}`);
        if (index < 2) {
          item.classList.add(`sec3-ul-show`);
        } else {
          item.classList.add(`sec3-ul-hide`);
        }
      });
  }

  footerShowHide();
  const button = document.createElement("button");
  button.textContent = "View More";
  button.className = "view-more-btn";
  document.querySelector(".footer-sec3 div").appendChild(button);

  document
    .querySelector(".view-more-btn")
    .addEventListener("click", function () {
      console.log("inn");
      document
        .querySelector(".footer-sec3 div")
        .childNodes.forEach(function (item, index) {
          if (!item.classList.contains("sec3-ul-show")) {
            item.classList.add(`sec3-ul-show`);
            item.classList.remove(`sec3-ul-hide`);
          } else {
            if (index < 2) {
              item.classList.add(`sec3-ul-show`);
            } else {
              item.classList.add(`sec3-ul-hide`);
              item.classList.remove(`sec3-ul-show`);
            }
          }
        });
      document.querySelector(".view-more-btn").classList.remove(`sec3-ul-hide`);
      if (document.querySelector(".view-more-btn").textContent == "View More") {
        document.querySelector(".view-more-btn").textContent = "View Less";
      } else if (
        document.querySelector(".view-more-btn").textContent == "View Less"
      ) {
        document.querySelector(".view-more-btn").textContent = "View More";
      }
      console.log("out");
    });

  // domhelper
  const optionPart = div(
    { class: "OpstionContainer" },
    div(
      { class: "option1" },
      select(
        { class: "inp" },
        option({class:"active"},a({href:"#"}),"HDFC Group Websites"),
        option(a({href:"#"}),"HDFC Securities"),
        option(a({href:"#"}),"HDFC Mutual Fund"),
        option(a({href:"#"}),"HDFC Life"),
        option(a({href:"#"}),"HDFC ERGO"),
        option(a({href:"#"}),"HDFC Pension"),
        option(a({href:"#"}),"HDFC Financial Services"),
        option(a({href:"#"}),"HDFC Sales"),
        option(a({href:"#"}),"HDFC Capital")
      )
    ),
    div(
      { class: "option2" },
      select(
        { class: "inp" },
        option({class:"active"},a({ href: "#" }), "HDFC Bank Offshore Branches "),
        option(a({ href: "#" }), "HDFC Bank Bahrain Branches "),
        option(a({ href: "#" }), "HDFC Bank Gift City Branches "),
        option(a({ href: "#" }), "HDFC Bank IDFC Branches "),
        option(a({ href: "#" }), "HDFC Bank Honk Kong Branches "),
        option(a({ href: "#" }), "HDFC Bank OFFSHORE Representative Branches ")
      )
    )
  );


  const opstioncontainers = block.querySelector('.footer-sec6 columns-wrapper ')
  Array.from(document.querySelector(".footer-sec6 .columns-2-cols").children).forEach((el)=>{
    Array.from(el.children).forEach((subel,index)=>{
      subel.classList.add("footer-sec6-"+(index+1))
    })
  })

  document.querySelector(".footer-sec6-1").append(optionPart)
}
