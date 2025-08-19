
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
  const heading = block.querySelector('div:nth-child(1)').innerHTML;
  const videoItems = Array.from(block.children).slice(1);

  const desktopVideos = videoItems.map(item => item.querySelector('div:nth-child(1)').innerHTML);
  const mobileVideos = videoItems.map(item => item.querySelector('div:nth-child(3)').innerHTML);
  const videoDescriptions = videoItems.map(item => item.querySelector('div:nth-child(5)').innerHTML);

  const wrapper = document.createElement('div');
  wrapper.classList.add('short-videos-product');
  wrapper.innerHTML = `
    <section data-component="short-videos-product">
      <div class="desk-car">
        <div class="product-event-shorts">
          <div class="f-header">
            ${heading}
          </div>
          ${desktopVideos.map((video, index) => `
            <div class="evts-slider">
              <video playsinline="" muted="">
                <source src="${video}" type="video/mp4">
              </video>
              <div class="video-det">
                ${videoDescriptions[index]}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="mob-car">
        <div class="m-header">
          ${heading}
        </div>
        <div class="product-event-shorts">
          ${mobileVideos.map((video, index) => `
            <div class="evts-slider">
              <video playsinline="" muted="">
                <source src="${video}" type="video/mp4">
              </video>
              <div class="video-det">
                ${videoDescriptions[index]}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  // 2. Handle Dependencies
  await loadSlickAssets();

  // 3. Initialize Slick
  $(wrapper).find('.product-event-shorts').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // 4. Replace the original block content with the new, structured list.
  block.textContent = '';
  block.append(wrapper);
}
    