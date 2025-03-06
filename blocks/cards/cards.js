import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
// import { createElement } from '../../scripts/scripts.js';
// import Swiper from '../swiper/swiper-bundle.min.js';
// import configObject from '../swiper/carousel-config.js';
// import embed from '../embed/embed.js';


export default function decorate(block) {
  /* change to ul, li */
  // console.log("print",block)
  const ul = document.createElement('div');
  ul.classList.add("swiper-wrapper-1");
  [...block.children].forEach((row) => {
    const li = document.createElement('div');
    li.classList.add("swiper-slide-item")
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt || "XCL World Academy");
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);


    // Define a media query for screens wider than 768px
    console.log("hello")
    const mediaQuery = window.matchMedia('(min-width: 768px)');
  
    // Check if the media query matches (i.e., desktop)
    if (mediaQuery.matches) {
      const form = document.querySelector(".form-wrapper");
      const fromdata = document.querySelector(".swiper-wrapper-1");
      fromdata.appendChild(form);
      // Ensure both elements exist before attempting to append
      // if (form && fromdata) {
       
      // }
    }

}
