
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
  const deskWrapper = document.createElement('div');
  deskWrapper.classList.add('desk-car');
  deskWrapper.classList.add('product-event-shorts');

  const mobWrapper = document.createElement('div');
  mobWrapper.classList.add('mob-car');
  mobWrapper.classList.add('product-event-shorts');

  const children = [...block.children];
  const heading = children[0];

  children.slice(1).forEach((slide) => {
    slide.classList.add('evts-slider');

    // Get a static list of children BEFORE any DOM changes
    const childDivs = [...slide.children];
    const desktopVideo = childDivs[0];
    const mobileVideo = childDivs[1];
    const description = childDivs[2];

    if (desktopVideo) desktopVideo.classList.add('desktop-video');
    if (mobileVideo) mobileVideo.classList.add('mobile-video');
    if (description) description.classList.add('video-det');

    deskWrapper.append(slide); // Move after all processing
    mobWrapper.append(slide.cloneNode(true)); // Move after all processing
  });

  block.textContent = '';
  block.append(heading, deskWrapper, mobWrapper);

  // 2. Handle Dependencies
  await loadSlickAssets();

  // 3. Initialize Slick
  // eslint-disable-next-line no-undef, no-new
  $(deskWrapper).slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
  });

  // eslint-disable-next-line no-undef, no-new
  $(mobWrapper).slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
  });
}
