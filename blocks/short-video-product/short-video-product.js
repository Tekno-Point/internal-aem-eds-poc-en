
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
//   const heading = block.querySelector('div:nth-child(1)');
//   heading.classList.add('f-header');

//   const deskCar = document.createElement('div');
//   deskCar.classList.add('desk-car');

//   const productEventShorts = document.createElement('div');
//   productEventShorts.classList.add('product-event-shorts');

//   const slickWrapper = document.createElement('div');
//   slickWrapper.classList.add('slick-wrapper');

//   const slickTrack = document.createElement('div');
//   slickTrack.classList.add('slick-track');

//   Array.from(block.children).slice(1).forEach((slide) => {
//     const slickSlide = document.createElement('div');
//     slickSlide.classList.add('slick-slide');

//     const evtsSlider = document.createElement('div');
//     evtsSlider.classList.add('evts-slider');

//     const desktopVideo = slide.querySelector('div:nth-child(1)');
//     desktopVideo.classList.add('desktop-video');
//     evtsSlider.appendChild(desktopVideo);

//     const mobileVideo = slide.querySelector('div:nth-child(2)');
//     mobileVideo.classList.add('mobile-video');
//     evtsSlider.appendChild(mobileVideo);

//     const description = slide.querySelector('div:nth-child(3)');
//     description.classList.add('video-det');
//     evtsSlider.appendChild(description);

//     slickSlide.appendChild(evtsSlider);
//     slickTrack.appendChild(slickSlide);
//   });

//   slickWrapper.appendChild(slickTrack);
//   productEventShorts.appendChild(slickWrapper);
//   deskCar.appendChild(productEventShorts);

//   const mobCar = document.createElement('div');
//   mobCar.classList.add('mob-car');

//   const mHeader = document.createElement('div');
//   mHeader.classList.add('m-header');
//   mHeader.innerHTML = heading.innerHTML;
//   mobCar.appendChild(mHeader);

//   const mobProductEventShorts = document.createElement('div');
//   mobProductEventShorts.classList.add('product-event-shorts');

//   const mobSlickWrapper = document.createElement('div');
//   mobSlickWrapper.classList.add('slick-wrapper');

//   const mobSlickTrack = document.createElement('div');
//   mobSlickTrack.classList.add('slick-track');

//   Array.from(slickTrack.children).forEach((slide) => {
//     const mobSlide = slide.cloneNode(true);
//     mobSlide.classList.add('mob-slide');
//     mobSlickTrack.appendChild(mobSlide);
//   });

//   mobSlickWrapper.appendChild(mobSlickTrack);
//   mobProductEventShorts.appendChild(mobSlickWrapper);
//   mobCar.appendChild(mobProductEventShorts);

//   block.innerHTML = '';
//   block.appendChild(heading);
//   block.appendChild(deskCar);
//   block.appendChild(mobCar);

//   // 2. Handle Dependencies
//   await loadSlickAssets();

//   // 3. Initialize Slick
//   $(productEventShorts).slick({
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     arrows: true,
//     dots: false,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           arrows: true,
//           dots: false,
//         }
//       }
//     ]
//   });

//   $(mobProductEventShorts).slick({
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     dots: false,
//   });
// }
