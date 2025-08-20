
// /**
//  * Dynamically loads Slick's CSS and JS assets and waits for them to load.
//  */
// async function loadSlickAssets() {
//   const css = document.createElement('link');
//   css.rel = 'stylesheet';
//   css.href = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css';
//   document.head.appendChild(css);

//   await new Promise((resolve) => {
//     const script = document.createElement('script');
//     script.src = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';
//     script.onload = resolve;
//     document.head.appendChild(script);
//   });
// }

// export default async function decorate(block) {
//   // 1. Restructure the DOM
//   const children = Array.from(block.children);

//   // Extract headers
//   const deskCarHeader = children[0].querySelector('div:nth-child(1)');
//   const mobCarHeader = children[1].querySelector('div:nth-child(1)');

//   // Create desk-car and mob-car containers
//   const deskCarContainer = document.createElement('div');
//   deskCarContainer.className = 'desk-car';
//   const mobCarContainer = document.createElement('div');
//   mobCarContainer.className = 'mob-car';

//   // Create slick containers
//   const deskSlickContainer = document.createElement('div');
//   deskSlickContainer.className = 'product-event-shorts';
//   const mobSlickContainer = document.createElement('div');
//   mobSlickContainer.className = 'product-event-shorts';

//   // Move headers
//   deskCarContainer.appendChild(deskCarHeader);
//   mobCarContainer.appendChild(mobCarHeader);

//   // Move slick items
//   children.slice(2).forEach((child, index) => {
//     const deskVideo = child.querySelector('div:nth-child(1)');
//     const mobVideo = child.querySelector('div:nth-child(2)');

//     // Create slick slide structure
//     const deskSlickSlide = document.createElement('div');
//     deskSlickSlide.className = 'evts-slider';
//     deskSlickSlide.style.width = '100%';
//     deskSlickSlide.style.display = 'inline-block';

//     const mobSlickSlide = document.createElement('div');
//     mobSlickSlide.className = 'evts-slider';
//     mobSlickSlide.style.width = '100%';
//     mobSlickSlide.style.display = 'inline-block';

//     // Append video containers
//     deskSlickSlide.appendChild(deskVideo);
//     mobSlickSlide.appendChild(mobVideo);

//     // Append to correct slick container
//     deskSlickContainer.appendChild(deskSlickSlide);
//     mobSlickContainer.appendChild(mobSlickSlide);
//   });

//   // Append slick containers to car containers
//   deskCarContainer.appendChild(deskSlickContainer);
//   mobCarContainer.appendChild(mobSlickContainer);

//   // Clear block and append new structure
//   block.innerHTML = '';
//   block.appendChild(deskCarContainer);
//   block.appendChild(mobCarContainer);

//   // 2. Handle Dependencies
//   await loadSlickAssets();

//   // 3. Initialize Slick
//   $(deskSlickContainer).slick({
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     arrows: true,
//     prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
//     nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   });

//   $(mobSlickContainer).slick({
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
//     nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>'
//   });
// }
    