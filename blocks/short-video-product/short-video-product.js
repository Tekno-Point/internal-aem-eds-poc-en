
/**
 * Dynamically loads Slick's CSS and JS assets and waits for them to load.
 */
async function loadSlickAssets() {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css';
  document.head.appendChild(css);

  await new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

export default async function decorate(block) {
  // 1. Restructure the DOM
  const wrapper = document.createElement('div');
  wrapper.classList.add('product-event-shorts');

  const heading = block.querySelector('div:nth-child(1) > div > div');
  const subHeading = block.querySelector('div:nth-child(2) > div > div');

  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('f-header');
  headingWrapper.appendChild(heading);

  const subHeadingWrapper = document.createElement('div');
  subHeadingWrapper.classList.add('m-header');
  subHeadingWrapper.appendChild(subHeading);

  const deskCar = document.createElement('div');
  deskCar.classList.add('desk-car');
  deskCar.appendChild(headingWrapper);

  const mobCar = document.createElement('div');
  mobCar.classList.add('mob-car');
  mobCar.appendChild(subHeadingWrapper);

  const slickWrapper = document.createElement('div');
  slickWrapper.classList.add('slick-list');
  slickWrapper.innerHTML = '<div class="slick-track"></div>';

  const slickTrack = slickWrapper.querySelector('.slick-track');

  Array.from(block.children).slice(2).forEach((slide) => {
    const video = slide.querySelector('div:nth-child(1) > div > div > video');
    const videoDescription = slide.querySelector('div:nth-child(2) > div > div');

    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('slick-slide');

    const evtsSlider = document.createElement('div');
    evtsSlider.classList.add('evts-slider');
    evtsSlider.style.width = '100%';
    evtsSlider.style.display = 'inline-block';

    if (video) {
      evtsSlider.appendChild(video);
    }

    const videoDet = document.createElement('div');
    videoDet.classList.add('video-det');
    videoDet.appendChild(videoDescription);

    evtsSlider.appendChild(videoDet);
    slideWrapper.appendChild(evtsSlider);
    slickTrack.appendChild(slideWrapper);
  });

  deskCar.appendChild(slickWrapper.cloneNode(true));
  mobCar.appendChild(slickWrapper.cloneNode(true));

  block.innerHTML = '';
  block.appendChild(deskCar);
  block.appendChild(mobCar);

  // 2. Handle Dependencies
  await loadSlickAssets();

  // 3. Initialize Slick
  // eslint-disable-next-line no-undef, no-new
  $(block.querySelector('.desk-car .product-event-shorts')).slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // eslint-disable-next-line no-undef, no-new
  $(block.querySelector('.mob-car .product-event-shorts')).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
  });
}
