
// import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

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
//   // Load Slick assets
//   await loadSlickAssets();

//   // Create main container
//   const mainContainer = document.createElement('div');
//   mainContainer.className = 'desk-car';

//   // Create slick slider container
//   const slickContainer = document.createElement('div');
//   slickContainer.className = 'product-event-shorts';

//   // Iterate over each row div, which represents a video item.
//   [...block.children].forEach((row, index) => {
//     if (index === 0) {
//       // First row is the heading
//       const headingDiv = row.querySelector('div');
//       if (headingDiv) {
//         const heading = headingDiv.textContent.trim();
//         const headingType = headingDiv.nextElementSibling ? headingDiv.nextElementSibling.textContent.trim() : 'h2';
//         const headingElement = document.createElement(headingType);
//         headingElement.textContent = heading;
//         headingElement.className = 'f-header';
//         mainContainer.appendChild(headingElement);
//       }
//     } else {
//       // Other rows are video items
//       const videoDiv = row.querySelector('div');
//       const videoDescriptionDiv = row.querySelector('div:nth-child(2)');
//       if (videoDiv && videoDescriptionDiv) {
//         const videoSrc = videoDiv.querySelector('a')?.href;
//         const videoAlt = videoDiv.nextElementSibling ? videoDiv.nextElementSibling.textContent.trim() : '';
//         const videoDescription = videoDescriptionDiv.textContent.trim();

//         const slide = document.createElement('div');
//         slide.className = 'evts-slider';

//         if (videoSrc) {
//           const video = document.createElement('video');
//           video.setAttribute('playsinline', '');
//           video.setAttribute('muted', '');
//           const source = document.createElement('source');
//           source.src = videoSrc;
//           source.type = 'video/mp4';
//           video.appendChild(source);
//           slide.appendChild(video);
//         }

//         const videoDet = document.createElement('div');
//         videoDet.className = 'video-det';
//         const description = document.createElement('p');
//         description.textContent = videoDescription;
//         videoDet.appendChild(description);
//         slide.appendChild(videoDet);

//         slickContainer.appendChild(slide);
//       }
//     }
//   });

//   mainContainer.appendChild(slickContainer);
//   block.textContent = '';
//   block.appendChild(mainContainer);

//   // Initialize Slick carousel
//   $(slickContainer).slick({
//     dots: false,
//     infinite: true,
//     speed: 300,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: false
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   });
// }
  