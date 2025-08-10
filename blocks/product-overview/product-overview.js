
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  console.log(block);
    debugger;
  // Parse the main block configuration fields
  const children = [...block.children];
  const configDivs = children.slice(0, 7);
  const variantDivs = children.slice(7);
  const colorDivs = children.slice(7);

  // Extract configuration fields
  const activeColorText = configDivs[0]?.textContent.trim() || 'MATT GREY';
  const variant = configDivs[1]?.textContent.trim() || 'XOOM 125 VX OBD2B';
  const price = configDivs[2]?.textContent.trim() || '₹ 89,500';
  const priceNote = configDivs[3]?.innerHTML || '<span>(Ex-Showroom price)</span>';
  const bookNowLink = configDivs[4]?.querySelector('a')?.href || 'https://www.heromotocorp.com/en-in/scooters/xoom-125/order-booking.html';
  const bookNowText = configDivs[5]?.textContent.trim() || 'BOOK NOW';
  const bookNowLabel = configDivs[6]?.textContent.trim() || 'BOOK NOW';
  const bookNowModal = configDivs[6]?.textContent.trim() || 'book-now';

  // Create the main wrapper
  const mainWrapper = document.createElement('div');
  mainWrapper.className = 'product-overview__mainWrapper d-flex flex-lg-row flex-column';

  // Create the active color text elements
  const activeColorTextPrevMob = document.createElement('div');
  activeColorTextPrevMob.className = 'product-overview__ActiveColorText_Prev-mob mb-5';
  activeColorTextPrevMob.style.background = 'linear-gradient(rgb(95, 99, 112) 0%, rgb(243, 243, 243) 100%)';
  activeColorTextPrevMob.textContent = activeColorText;

  const activeColorTextMob = activeColorTextPrevMob.cloneNode(true);
  activeColorTextMob.className = 'product-overview__ActiveColorText-mob mb-5';

  const activeColorTextPrev = activeColorTextPrevMob.cloneNode(true);
  activeColorTextPrev.className = 'product-overview__ActiveColorText_Prev mb-5';

  const activeColorTextMain = activeColorTextPrevMob.cloneNode(true);
  activeColorTextMain.className = 'product-overview__ActiveColorText mb-5';

  // Create the 360 view section
  const view360Wrapper = document.createElement('div');
  view360Wrapper.className = 'product-overview__360View m-0 mw-100';
  view360Wrapper.style.height = 'auto';

  const hero360 = document.createElement('div');
  hero360.className = 'hero-360 w-100';

  const btnWrapperTop = document.createElement('div');
  btnWrapperTop.className = 'hero-360__btnWrapper d-flex justify-content-between';
  btnWrapperTop.innerHTML = '<i class="hero-icon heroicon-rotate-left icon-size-6 align-self-start"></i><i class="hero-icon heroicon-rotate-right icon-size-6 align-self-end"></i>';

  const canvasWrapper = document.createElement('div');
  canvasWrapper.className = 'hero-360__canvasWrapper m-auto spritespin-instance loading';
  canvasWrapper.setAttribute('unselectable', 'on');
  canvasWrapper.style.userSelect = 'none';
  canvasWrapper.style.overflow = 'hidden';
  canvasWrapper.style.position = 'relative';

  const stage = document.createElement('div');
  stage.className = 'spritespin-stage';
  stage.style.width = '526.667px';
  stage.style.height = '320px';
  stage.style.position = 'relative';
  stage.style.left = '0.166667px';
  stage.style.top = '0px';

  const canvas = document.createElement('canvas');
  canvas.className = 'spritespin-canvas';
  canvas.width = 658;
  canvas.height = 400;
  canvas.style.position = 'absolute';
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';

  stage.appendChild(canvas);
  canvasWrapper.appendChild(stage);

  const btnWrapperBottom = btnWrapperTop.cloneNode(true);

  hero360.appendChild(btnWrapperTop);
  hero360.appendChild(canvasWrapper);
  hero360.appendChild(btnWrapperBottom);

  const price360Wrap = document.createElement('div');
  price360Wrap.className = 'price-360-wrap';

  const rotateWrap = document.createElement('div');
  rotateWrap.className = 'rotate-wrap';
  rotateWrap.innerHTML = `<div class="rotate-text">360°</div><img class="rotate-img" src="/content/dam/hero-commerce/in/en/global/eclipse-rotate.png">`;

  const detailsPriceWrap = document.createElement('div');
  detailsPriceWrap.className = 'details-price-wrap';

  const detailsBox = document.createElement('div');
  detailsBox.className = 'details-box';
  detailsBox.innerHTML = `<div class="details-variant">Variant : ${variant}</div><div class="details-price">${price} ${priceNote}</div>`;

  const ctaWrap = document.createElement('div');
  ctaWrap.className = 'd-flex align-items-center gap-13';
  ctaWrap.innerHTML = `<a class="book-now-button button button--primary weight-heavy d-flex flex-row justify-content-center align-items-center text-uppercase rounded-2 cta-text py-4 px-12 py-lg-5 px-lg-16 text-white gradient-1 border-0 text-center align-items-center mt-sm-5" href="${bookNowLink}" label="${bookNowLabel}" aria-label="${bookNowLabel}" data-modal="${bookNowModal}" target="_blank">${bookNowText}</a>`;

  detailsPriceWrap.appendChild(detailsBox);
  detailsPriceWrap.appendChild(ctaWrap);

  price360Wrap.appendChild(rotateWrap);
  price360Wrap.appendChild(detailsPriceWrap);

  view360Wrapper.appendChild(hero360);
  view360Wrapper.appendChild(price360Wrap);

  // Create the right wrapper
  const rightWrapper = document.createElement('div');
  rightWrapper.className = 'product-overview__rightWrap';

  // Create the variant wrapper
  const variantWrapper = document.createElement('div');
  variantWrapper.className = 'product-overview__variantWrapper d-flex order-2 order-lg-0';

  const fieldset = document.createElement('fieldset');
  fieldset.className = 'my-lg-10 my-6 w-100';

  const radioGroup = document.createElement('div');
  radioGroup.className = 'radio-group position-relative flex-wrap flex-lg-nowrap custom-scrollbar';
  radioGroup.style.width = '32.375rem';

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'swiper swiper-initialized swiper-horizontal swiper-backface-hidden';

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';
  swiperWrapper.setAttribute('id', 'swiper-wrapper-' + Math.random().toString(36).substr(2, 9));
  swiperWrapper.setAttribute('aria-live', 'polite');

  // Parse variant items
  variantDivs.forEach((variantDiv, index) => {
    const variantImage = variantDiv.querySelector('img')?.src || 'https://via.placeholder.com/150';
    const variantImageAlt = variantDiv.querySelector('img')?.alt || 'Variant image';
    const variantName = variantDiv.querySelector('img')?.alt.replace('image', '') || 'Variant ' + (index + 1);

    const swiperSlide = document.createElement('div');
    swiperSlide.className = 'swiper-slide';
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', (index + 1) + ' / ' + variantDivs.length);
    swiperSlide.style.width = '130px';
    swiperSlide.style.marginRight = '32px';

    const formControl = document.createElement('div');
    formControl.className = 'form-control p-1';

    const body = document.createElement('div');
    body.className = 'body text-uppercase weight-' + (index === 0 ? 'heavy' : 'regular');

    const input = document.createElement('input');
    input.className = 'position-absolute';
    input.type = 'radio';
    input.id = 'variant-' + (index + 1);
    input.name = 'variants';
    input.value = variantName;
    if (index === 0) input.checked = true;

    const label = document.createElement('label');
    label.setAttribute('for', 'variant-' + (index + 1));
    label.className = 'd-flex';

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = variantImage;
    img.alt = variantImageAlt;
    img.className = 'variant-thumb-image';

    const nameVariant = document.createElement('span');
    nameVariant.className = 'name-variant';
    nameVariant.textContent = variantName;

    const activeBar = document.createElement('span');
    activeBar.className = 'active-bar';

    label.appendChild(img);
    label.appendChild(nameVariant);
    label.appendChild(activeBar);

    body.appendChild(input);
    body.appendChild(label);

    formControl.appendChild(body);
    swiperSlide.appendChild(formControl);
    swiperWrapper.appendChild(swiperSlide);
  });

  const swiperButtonPrev = document.createElement('div');
  swiperButtonPrev.className = 'swiper-button-prev swiper-button-disabled swiper-button-lock';
  swiperButtonPrev.setAttribute('tabindex', '-1');
  swiperButtonPrev.setAttribute('role', 'button');
  swiperButtonPrev.setAttribute('aria-label', 'Previous slide');
  swiperButtonPrev.setAttribute('aria-controls', swiperWrapper.id);
  swiperButtonPrev.setAttribute('aria-disabled', 'true');

  const swiperButtonNext = document.createElement('div');
  swiperButtonNext.className = 'swiper-button-next swiper-button-disabled swiper-button-lock';
  swiperButtonNext.setAttribute('tabindex', '-1');
  swiperButtonNext.setAttribute('role', 'button');
  swiperButtonNext.setAttribute('aria-label', 'Next slide');
  swiperButtonNext.setAttribute('aria-controls', swiperWrapper.id);
  swiperButtonNext.setAttribute('aria-disabled', 'true');

  const swiperNotification = document.createElement('span');
  swiperNotification.className = 'swiper-notification';
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');

  swiperContainer.appendChild(swiperWrapper);
  swiperContainer.appendChild(swiperButtonPrev);
  swiperContainer.appendChild(swiperButtonNext);
  swiperContainer.appendChild(swiperNotification);

  radioGroup.appendChild(swiperContainer);
  fieldset.appendChild(radioGroup);
  variantWrapper.appendChild(fieldset);

  // Create the color wrapper
  const colorWrapper = document.createElement('div');
  colorWrapper.className = 'product-overview__colorWrapper order-3 mb-5 my-lg-10';
  colorWrapper.setAttribute('tabindex', '0');

  const colorSwatchGroup = document.createElement('div');
  colorSwatchGroup.className = 'product-overview__colorWrapper--swatchgroup custom-scrollbar position-relative flex-wrap flex-lg-now';
  colorSwatchGroup.setAttribute('tabindex', '0');

  const colorSwiperContainer = document.createElement('div');
  colorSwiperContainer.className = 'swiper swiper-initialized swiper-horizontal swiper-backface-hidden';

  const colorSwiperWrapper = document.createElement('div');
  colorSwiperWrapper.className = 'swiper-wrapper';
  colorSwiperWrapper.setAttribute('id', 'swiper-wrapper-' + Math.random().toString(36).substr(2, 9));
  colorSwiperWrapper.setAttribute('aria-live', 'polite');

  // Parse color items
  colorDivs.forEach((colorDiv, index) => {
    const colorCode = colorDiv.textContent.trim() || '#000000';
    const colorName = colorDiv.textContent.trim() || 'Color ' + (index + 1);

    const swiperSlide = document.createElement('div');
    swiperSlide.className = 'swiper-slide';
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', (index + 1) + ' / ' + colorDivs.length);
    swiperSlide.style.width = '80.8333px';
    swiperSlide.style.marginRight = '16px';

    const colorOption = document.createElement('div');
    colorOption.className = 'color-option weight-' + (index === 0 ? 'heavy' : 'regular');
    if (index === 0) colorOption.classList.add('active');

    const outerSwatch = document.createElement('div');
    outerSwatch.className = 'outer-swatch-color ' + (index === 0 ? 'expandActiveColour' : '');
    outerSwatch.style.stroke = colorCode;
    outerSwatch.style.borderColor = colorCode;

    const innerSwatch = document.createElement('div');
    innerSwatch.className = 'inner-swatch-color';
    innerSwatch.style.backgroundColor = colorCode;

    outerSwatch.appendChild(innerSwatch);
    colorOption.appendChild(outerSwatch);
    swiperSlide.appendChild(colorOption);
    colorSwiperWrapper.appendChild(swiperSlide);
  });

  const colorSwiperButtonPrev = document.createElement('div');
  colorSwiperButtonPrev.className = 'swiper-button-prev swiper-button-disabled swiper-button-lock';
  colorSwiperButtonPrev.setAttribute('tabindex', '-1');
  colorSwiperButtonPrev.setAttribute('role', 'button');
  colorSwiperButtonPrev.setAttribute('aria-label', 'Previous slide');
  colorSwiperButtonPrev.setAttribute('aria-controls', colorSwiperWrapper.id);
  colorSwiperButtonPrev.setAttribute('aria-disabled', 'true');

  const colorSwiperButtonNext = document.createElement('div');
  colorSwiperButtonNext.className = 'swiper-button-next swiper-button-disabled swiper-button-lock';
  colorSwiperButtonNext.setAttribute('tabindex', '-1');
  colorSwiperButtonNext.setAttribute('role', 'button');
  colorSwiperButtonNext.setAttribute('aria-label', 'Next slide');
  colorSwiperButtonNext.setAttribute('aria-controls', colorSwiperWrapper.id);
  colorSwiperButtonNext.setAttribute('aria-disabled', 'true');

  const colorSwiperNotification = document.createElement('span');
  colorSwiperNotification.className = 'swiper-notification';
  colorSwiperNotification.setAttribute('aria-live', 'assertive');
  colorSwiperNotification.setAttribute('aria-atomic', 'true');

  colorSwiperContainer.appendChild(colorSwiperWrapper);
  colorSwiperContainer.appendChild(colorSwiperButtonPrev);
  colorSwiperContainer.appendChild(colorSwiperButtonNext);
  colorSwiperContainer.appendChild(colorSwiperNotification);

  colorSwatchGroup.appendChild(colorSwiperContainer);
  colorWrapper.appendChild(colorSwatchGroup);

  // Create the mobile details wrap
  const detailsPriceWrapMob = document.createElement('div');
  detailsPriceWrapMob.className = 'details-price-wrap-mob';

  const detailsBoxMob = document.createElement('div');
  detailsBoxMob.className = 'details-box';
  detailsBoxMob.innerHTML = `<div class="details-variant">Variant : ${variant}</div><div class="details-price">${price} ${priceNote}</div>`;

  const ctaWrapMob = document.createElement('div');
  ctaWrapMob.className = 'd-flex align-items-center justify-content-center w-100 px-3';
  ctaWrapMob.innerHTML = `<a class="book-now-button button button--primary weight-heavy d-flex flex-row justify-content-center align-items-center text-uppercase rounded-2 cta-text py-4 px-12 py-lg-5 px-lg-16 text-white gradient-1 border-0 text-center align-items-center mt-sm-5" href="${bookNowLink}" label="${bookNowLabel}" aria-label="${bookNowLabel}" data-modal="${bookNowModal}" target="_blank">${bookNowText}</a>`;

  detailsPriceWrapMob.appendChild(detailsBoxMob);
  detailsPriceWrapMob.appendChild(ctaWrapMob);

  // Append all elements to the right wrapper
  rightWrapper.appendChild(activeColorTextPrev);
  rightWrapper.appendChild(activeColorTextMain);
  rightWrapper.appendChild(variantWrapper);
  rightWrapper.appendChild(colorWrapper);
  rightWrapper.appendChild(detailsPriceWrapMob);

  // Append all elements to the main wrapper
  mainWrapper.appendChild(activeColorTextPrevMob);
  mainWrapper.appendChild(activeColorTextMob);
  mainWrapper.appendChild(view360Wrapper);
  mainWrapper.appendChild(rightWrapper);

  // Clear the original block content and append the reconstructed elements
  block.textContent = '';
  block.appendChild(mainWrapper);

  // Initialize Swiper for variants and colors
  new Swiper(swiperContainer, {
    slidesPerView: 'auto',
    spaceBetween: 32,
    navigation: {
      nextEl: swiperButtonNext,
      prevEl: swiperButtonPrev,
    },
    breakpoints: {
      992: {
        spaceBetween: 16,
      },
    },
  });

  new Swiper(colorSwiperContainer, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    navigation: {
      nextEl: colorSwiperButtonNext,
      prevEl: colorSwiperButtonPrev,
    },
    breakpoints: {
      992: {
        spaceBetween: 16,
      },
    },
  });

  // Add event listeners for variant and color selection
  const variantInputs = swiperWrapper.querySelectorAll('input[type="radio"]');
  variantInputs.forEach(input => {
    input.addEventListener('change', () => {
      const selectedSlide = input.closest('.swiper-slide');
      swiperWrapper.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.querySelector('.form-control').className = 'form-control p-1';
        slide.querySelector('.body').className = 'body text-uppercase weight-regular';
      });
      selectedSlide.querySelector('.form-control').className = 'form-control p-1';
      selectedSlide.querySelector('.body').className = 'body text-uppercase weight-heavy';
      // Update variant details and 360 view based on selection
      const variantName = input.value;
      const variantDetails = detailsBox.querySelector('.details-variant');
      variantDetails.textContent = `Variant : ${variantName}`;
      // Trigger 360 view update (placeholder for actual 360 functionality)
      console.log('Update 360 view for variant:', variantName);
    });
  });

  const colorOptions = colorSwiperWrapper.querySelectorAll('.color-option');
  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      colorSwiperWrapper.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.remove('active');
        opt.classList.remove('weight-heavy');
        opt.classList.add('weight-regular');
      });
      option.classList.add('active');
      option.classList.remove('weight-regular');
      option.classList.add('weight-heavy');
      // Update active color text and 360 view based on selection
      const colorCode = option.querySelector('.inner-swatch-color').style.backgroundColor;
      activeColorTextPrevMob.textContent = colorCode;
      activeColorTextMob.textContent = colorCode;
      activeColorTextPrev.textContent = colorCode;
      activeColorTextMain.textContent = colorCode;
      // Trigger 360 view update (placeholder for actual 360 functionality)
      console.log('Update 360 view for color:', colorCode);
    });
  });

  // Add loading class for CSS transitions
  setTimeout(() => {
    block.classList.add('loaded');
  }, 100);
}
  