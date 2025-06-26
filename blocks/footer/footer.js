import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";
import accordionBlock from "../accordion/accordion.js";

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

  // changes for class

  // function decorateFooterImages() {
  //   const section = document.querySelector(".footer-sec4");
  //   if (!section) return;

  //   const container = section.querySelector(".default-content-wrapper");
  //   if (!container) return;

  //   const paragraphs = container.querySelectorAll("p");
  //   if (paragraphs.length < 6) return;

  //   const header = container.querySelector("h3");

  //   // Create the wrapper div
  //   const wrapperDiv = document.createElement("div");
  //   wrapperDiv.classList.add("wrapper");

  //   // Move the first 4 <p> tags into the wrapper
  //   for (let i = 0; i < 5; i++) {
  //     if (i === 4) {
  //       paragraphs[i].appendChild(header);
  //     }
  //     wrapperDiv.appendChild(paragraphs[i]);
  //   }

  //   // Insert the wrapper before the first original <p>
  //   container.insertBefore(wrapperDiv, container.firstChild);
  // }

  // // Call it when DOM is ready
  // decorateFooterImages();


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

  footerShowHide()
    const button = document.createElement("button");
  button.textContent = "View More";
  button.className = "view-more-btn";
  document.querySelector(".footer-sec3 div").appendChild(button);


  document.querySelector('.view-more-btn').addEventListener('click' , function(){
    console.log("inn")
    document.querySelector('.footer-sec3 div').childNodes.forEach(function(item , index){
        if(!item.classList.contains('sec3-ul-show')){
            item.classList.add(`sec3-ul-show`)
            item.classList.remove(`sec3-ul-hide`)
        } else{
            if(index < 2){
                item.classList.add(`sec3-ul-show`)
            }else{
                item.classList.add(`sec3-ul-hide`)
                item.classList.remove(`sec3-ul-show`)
            }
        }
    })
    document.querySelector('.view-more-btn').classList.remove(`sec3-ul-hide`)
    if(document.querySelector('.view-more-btn').textContent == 'View More'){
                document.querySelector('.view-more-btn').textContent = 'View Less'
    }else if(document.querySelector('.view-more-btn').textContent == 'View Less'){
             document.querySelector('.view-more-btn').textContent = 'View More'
    }
    console.log("out")
})
}
