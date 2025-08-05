export default function decorate(block) {
  // Helper function to create optimized picture elements
  function createOptimizedPicture(src, alt = '', eager = false, breakpoints = [{ media: '(min-width: 600px)', width: '2000' }, { width: '750' }]) {
    const url = new URL(src, window.location.href);
    const picture = document.createElement('picture');
    const { pathname } = url;
    const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

    // Create source elements for different breakpoints
    breakpoints.forEach((br) => {
      const source = document.createElement('source');
      if (br.media) source.setAttribute('media', br.media);
      source.setAttribute('srcset', `${pathname}?width=${br.width}&format=webply&optimize=medium`);
      picture.appendChild(source);
    });

    // Create the img element
    const img = document.createElement('img');
    img.setAttribute('loading', eager ? 'eager' : 'lazy');
    img.setAttribute('alt', alt);
    picture.appendChild(img);
    img.setAttribute('src', `${pathname}?width=750&format=webply&optimize=medium`);

    return picture;
  }

  // Helper function to create animation wrappers
  function createAnimationWrapper(element, animationClass) {
    const wrapper = document.createElement('div');
    wrapper.className = `animate ${animationClass}`;
    wrapper.appendChild(element);
    return wrapper;
  }

  // Parse the block's children to extract content
  const children = Array.from(block.children);
  const [
    leftTextDiv,
    leaderDiv,
    iconDiv,
    ccValueDiv,
    ccUnitDiv,
    centerTextDiv,
    centerSubTextDiv,
    centerImageDiv,
    centerMobileImageDiv,
    rightTextDiv,
    designDiv,
    rightImageDiv,
    rightMobileImageDiv,
    rightDescTextDiv,
    rightDescIconDiv,
    leftLowerTextDiv,
    comfortDiv,
    leftLowerIcon1Div,
    leftLowerText1Div,
    leftLowerIcon2Div,
    leftLowerText2Div,
    leftLowerImageDiv,
    leftLowerMobileImageDiv,
    rightLowerTextDiv,
    styleDiv,
    rightLowerIcon1Div,
    rightLowerText1Div,
    rightLowerIcon2Div,
    rightLowerText2Div,
    rightLowerImageDiv,
    rightLowerMobileImageDiv,
  ] = children;

  // Extract text content
  const leftText = leftTextDiv ? leftTextDiv.textContent.trim() : '';
  const leader = leaderDiv ? leaderDiv.textContent.trim() : '';
  const ccValue = ccValueDiv ? ccValueDiv.textContent.trim() : '';
  const ccUnit = ccUnitDiv ? ccUnitDiv.textContent.trim() : '';
  const centerText = centerTextDiv ? centerTextDiv.textContent.trim() : '';
  const centerSubText = centerSubTextDiv ? centerSubTextDiv.textContent.trim() : '';
  const rightText = rightTextDiv ? rightTextDiv.textContent.trim() : '';
  const design = designDiv ? designDiv.textContent.trim() : '';
  const rightDescText = rightDescTextDiv ? rightDescTextDiv.textContent.trim() : '';
  const leftLowerText = leftLowerTextDiv ? leftLowerTextDiv.textContent.trim() : '';
  const comfort = comfortDiv ? comfortDiv.textContent.trim() : '';
  const leftLowerText1 = leftLowerText1Div ? leftLowerText1Div.textContent.trim() : '';
  const leftLowerText2 = leftLowerText2Div ? leftLowerText2Div.textContent.trim() : '';
  const rightLowerText = rightLowerTextDiv ? rightLowerTextDiv.textContent.trim() : '';
  const style = styleDiv ? styleDiv.textContent.trim() : '';
  const rightLowerText1 = rightLowerText1Div ? rightLowerText1Div.textContent.trim() : '';
  const rightLowerText2 = rightLowerText2Div ? rightLowerText2Div.textContent.trim() : '';

  // Extract image sources and alt text
  const iconImg = iconDiv?.querySelector('img');
  const iconSrc = iconImg ? iconImg.src : '';
  const iconAlt = iconImg ? iconImg.alt : '';

  const centerImageImg = centerImageDiv?.querySelector('img');
  const centerImageSrc = centerImageImg ? centerImageImg.src : '';
  const centerImageAlt = centerImageImg ? centerImageImg.alt : '';

  const centerMobileImageImg = centerMobileImageDiv?.querySelector('img');
  const centerMobileImageSrc = centerMobileImageImg ? centerMobileImageImg.src : '';
  const centerMobileImageAlt = centerMobileImageImg ? centerMobileImageImg.alt : '';

  const rightImageImg = rightImageDiv?.querySelector('img');
  const rightImageSrc = rightImageImg ? rightImageImg.src : '';
  const rightImageAlt = rightImageImg ? rightImageImg.alt : '';

  const rightMobileImageImg = rightMobileImageDiv?.querySelector('img');
  const rightMobileImageSrc = rightMobileImageImg ? rightMobileImageImg.src : '';
  const rightMobileImageAlt = rightMobileImageImg ? rightMobileImageImg.alt : '';

  const rightDescIconImg = rightDescIconDiv?.querySelector('img');
  const rightDescIconSrc = rightDescIconImg ? rightDescIconImg.src : '';
  const rightDescIconAlt = rightDescIconImg ? rightDescIconImg.alt : '';

  const leftLowerIcon1Img = leftLowerIcon1Div?.querySelector('img');
  const leftLowerIcon1Src = leftLowerIcon1Img ? leftLowerIcon1Img.src : '';
  const leftLowerIcon1Alt = leftLowerIcon1Img ? leftLowerIcon1Img.alt : '';

  const leftLowerIcon2Img = leftLowerIcon2Div?.querySelector('img');
  const leftLowerIcon2Src = leftLowerIcon2Img ? leftLowerIcon2Img.src : '';
  const leftLowerIcon2Alt = leftLowerIcon2Img ? leftLowerIcon2Img.alt : '';

  const leftLowerImageImg = leftLowerImageDiv?.querySelector('img');
  const leftLowerImageSrc = leftLowerImageImg ? leftLowerImageImg.src : '';
  const leftLowerImageAlt = leftLowerImageImg ? leftLowerImageImg.alt : '';

  const leftLowerMobileImageImg = leftLowerMobileImageDiv?.querySelector('img');
  const leftLowerMobileImageSrc = leftLowerMobileImageImg ? leftLowerMobileImageImg.src : '';
  const leftLowerMobileImageAlt = leftLowerMobileImageImg ? leftLowerMobileImageImg.alt : '';

  const rightLowerIcon1Img = rightLowerIcon1Div?.querySelector('img');
  const rightLowerIcon1Src = rightLowerIcon1Img ? rightLowerIcon1Img.src : '';
  const rightLowerIcon1Alt = rightLowerIcon1Img ? rightLowerIcon1Img.alt : '';

  const rightLowerIcon2Img = rightLowerIcon2Div?.querySelector('img');
  const rightLowerIcon2Src = rightLowerIcon2Img ? rightLowerIcon2Img.src : '';
  const rightLowerIcon2Alt = rightLowerIcon2Img ? rightLowerIcon2Img.alt : '';

  const rightLowerImageImg = rightLowerImageDiv?.querySelector('img');
  const rightLowerImageSrc = rightLowerImageImg ? rightLowerImageImg.src : '';
  const rightLowerImageAlt = rightLowerImageImg ? rightLowerImageImg.alt : '';

  const rightLowerMobileImageImg = rightLowerMobileImageDiv?.querySelector('img');
  const rightLowerMobileImageSrc = rightLowerMobileImageImg ? rightLowerMobileImageImg.src : '';
  const rightLowerMobileImageAlt = rightLowerMobileImageImg ? rightLowerMobileImageImg.alt : '';

  // Create the new HTML structure
  const container = document.createElement('div');
  container.className = 'multicardspecs-container';

  // Upper wrap
  const upperWrap = document.createElement('div');
  upperWrap.className = 'standout-upper-wrap';

  // Left section
  const leftSection = document.createElement('div');
  leftSection.className = 'verticle-spacing upper-divs left animate second fadeInUpStand';

  const leftTextWrap = document.createElement('div');
  leftTextWrap.className = 'left-text-wrap';
  leftTextWrap.innerHTML = `<p>${leftText}</p><p><span class="leader">${leader}</span></p>`;
  leftSection.appendChild(leftTextWrap);

  const bottomSpecsWrap = document.createElement('div');
  bottomSpecsWrap.className = 'bottom-specs-wrap d-flex';

  // Icon boxes
  if (iconSrc && ccValue && ccUnit) {
    const iconBox1 = document.createElement('div');
    iconBox1.className = 'unique-boxes d-flex animate third fadeInUpStand';

    const iconBox1ImgWrap = document.createElement('div');
    iconBox1ImgWrap.className = 'box-img-wrap';
    iconBox1ImgWrap.appendChild(createOptimizedPicture(iconSrc, iconAlt));
    iconBox1.appendChild(iconBox1ImgWrap);

    const iconBox1TextContainer = document.createElement('div');
    iconBox1TextContainer.className = 'top-specs-cc-text-container count-up-parent';
    iconBox1TextContainer.innerHTML = `
      <span class="cc-unit-value-container d-block">
        <span class="cc-value count-up"></span>${ccValue}
        <span class="cc-unit d-block">${ccUnit}</span>
      </span>
    `;
    iconBox1.appendChild(iconBox1TextContainer);

    bottomSpecsWrap.appendChild(iconBox1);
  }

  if (iconSrc && ccValue && ccUnit) {
    const iconBox2 = document.createElement('div');
    iconBox2.className = 'unique-boxes d-flex animate third fadeInUpStand';

    const iconBox2ImgWrap = document.createElement('div');
    iconBox2ImgWrap.className = 'box-img-wrap';
    iconBox2ImgWrap.appendChild(createOptimizedPicture(iconSrc, iconAlt));
    iconBox2.appendChild(iconBox2ImgWrap);

    const iconBox2TextContainer = document.createElement('div');
    iconBox2TextContainer.className = 'top-specs-cc-text-container count-up-parent';
    iconBox2TextContainer.innerHTML = `
      <span class="cc-unit-value-container d-block">
        <span class="cc-value count-up"></span>${ccValue}
        <span class="cc-unit d-block">${ccUnit}</span>
      </span>
    `;
    iconBox2.appendChild(iconBox2TextContainer);

    bottomSpecsWrap.appendChild(iconBox2);
  }

  leftSection.appendChild(bottomSpecsWrap);
  upperWrap.appendChild(leftSection);

  // Center section
  const centerSection = document.createElement('div');
  centerSection.className = 'upper-divs center animate first shortenHeight';

  const textStandout = document.createElement('div');
  textStandout.className = 'text-standout';
  textStandout.innerHTML = `<p><span class="standout"><b></b>${centerText}</span></p><p>${centerSubText}</p>`;
  centerSection.appendChild(textStandout);

  if (centerImageSrc) {
    const imgStandout = document.createElement('div');
    imgStandout.className = 'img-standout';
    imgStandout.appendChild(createAnimationWrapper(createOptimizedPicture(centerImageSrc, centerImageAlt, true), 'first enhanceImg'));
    centerSection.appendChild(imgStandout);
  }

  if (centerMobileImageSrc) {
    const imgMobStandout = document.createElement('div');
    imgMobStandout.className = 'img-mob-standout';
    imgMobStandout.appendChild(createAnimationWrapper(createOptimizedPicture(centerMobileImageSrc, centerMobileImageAlt, true), 'first enhanceImg'));
    centerSection.appendChild(imgMobStandout);
  }

  upperWrap.appendChild(centerSection);

  // Right section
  const rightSection = document.createElement('div');
  rightSection.className = 'upper-divs right animate second fadeInUpStand';

  const rightTextWrap = document.createElement('div');
  rightTextWrap.className = 'right-text-wrap';
  rightTextWrap.innerHTML = `<p>${rightText}</p><p><span class="design">${design}</span></p>`;
  rightSection.appendChild(rightTextWrap);

  if (rightImageSrc) {
    rightSection.appendChild(createAnimationWrapper(createOptimizedPicture(rightImageSrc, rightImageAlt), 'bottom-mob-img-wrap animate third fadeInRight'));
  }

  if (rightDescText && rightDescIconSrc) {
    const rightDescWrap = document.createElement('div');
    rightDescWrap.className = 'd-flex right-desc-wrap animate fifth fadeInUpStand';

    const descInfo = document.createElement('div');
    descInfo.className = 'desc-info lower-width';
    descInfo.appendChild(createOptimizedPicture(rightDescIconSrc, rightDescIconAlt));
    const descText = document.createElement('div');
    descText.className = 'desc-text';
    descText.textContent = rightDescText;
    descInfo.appendChild(descText);

    rightDescWrap.appendChild(descInfo);
    rightSection.appendChild(rightDescWrap);
  }

  if (rightImageSrc) {
    rightSection.appendChild(createAnimationWrapper(createOptimizedPicture(rightImageSrc, rightImageAlt), 'bottom-img-wrap animate third fadeInRight'));
  }

  upperWrap.appendChild(rightSection);
  container.appendChild(upperWrap);

  // Lower wrap
  const lowerWrap = document.createElement('div');
  lowerWrap.className = 'standout-lower-wrap animate fourth fadeInUpStand';

  // Left lower section
  const leftLowerSection = document.createElement('div');
  leftLowerSection.className = 'lower-divs left';

  const leftLowerTextWrap = document.createElement('div');
  leftLowerTextWrap.className = 'left-text-wrap';
  leftLowerTextWrap.innerHTML = `<p>${leftLowerText}</p><p><span class="comfort">${comfort}</span></p>`;
  leftLowerSection.appendChild(leftLowerTextWrap);

  const leftDescWrap = document.createElement('div');
  leftDescWrap.className = 'd-flex left-desc-wrap animate fifth fadeInUpStand';

  if (leftLowerIcon1Src && leftLowerText1) {
    const descInfo1 = document.createElement('div');
    descInfo1.className = 'desc-info lower-width';
    descInfo1.appendChild(createOptimizedPicture(leftLowerIcon1Src, leftLowerIcon1Alt));
    const descText1 = document.createElement('div');
    descText1.className = 'desc-text';
    descText1.textContent = leftLowerText1;
    descInfo1.appendChild(descText1);
    leftDescWrap.appendChild(descInfo1);
  }

  if (leftLowerIcon2Src && leftLowerText2) {
    const descInfo2 = document.createElement('div');
    descInfo2.className = 'desc-info lower-width';
    descInfo2.appendChild(createOptimizedPicture(leftLowerIcon2Src, leftLowerIcon2Alt));
    const descText2 = document.createElement('div');
    descText2.className = 'desc-text';
    descText2.textContent = leftLowerText2;
    descInfo2.appendChild(descText2);
    leftDescWrap.appendChild(descInfo2);
  }

  leftLowerSection.appendChild(leftDescWrap);

  if (leftLowerMobileImageSrc) {
    leftLowerSection.appendChild(createAnimationWrapper(createOptimizedPicture(leftLowerMobileImageSrc, leftLowerMobileImageAlt), 'img-mob-wrap-animation animate fifth fadeInRightAlt'));
  }

  if (leftLowerImageSrc) {
    leftLowerSection.appendChild(createAnimationWrapper(createOptimizedPicture(leftLowerImageSrc, leftLowerImageAlt), 'img-wrap-animation animate fifth fadeInRightAlt'));
  }

  lowerWrap.appendChild(leftLowerSection);

  // Right lower section
  const rightLowerSection = document.createElement('div');
  rightLowerSection.className = 'lower-divs right';

  const rightLowerTextWrap = document.createElement('div');
  rightLowerTextWrap.className = 'left-text-wrap';
  rightLowerTextWrap.innerHTML = `<p>${rightLowerText}</p><p><span class="style">${style}</span></p>`;
  rightLowerSection.appendChild(rightLowerTextWrap);

  const rightLowerDescWrap = document.createElement('div');
  rightLowerDescWrap.className = 'd-flex left-desc-wrap animate fifth fadeInUpStand';

  if (rightLowerIcon1Src && rightLowerText1) {
    const rightDescInfo1 = document.createElement('div');
    rightDescInfo1.className = 'desc-info lower-width';
    rightDescInfo1.appendChild(createOptimizedPicture(rightLowerIcon1Src, rightLowerIcon1Alt));
    const rightDescText1 = document.createElement('div');
    rightDescText1.className = 'desc-text';
    rightDescText1.textContent = rightLowerText1;
    rightDescInfo1.appendChild(rightDescText1);
    rightLowerDescWrap.appendChild(rightDescInfo1);
  }

  if (rightLowerIcon2Src && rightLowerText2) {
    const rightDescInfo2 = document.createElement('div');
    rightDescInfo2.className = 'desc-info lower-width';
    rightDescInfo2.appendChild(createOptimizedPicture(rightLowerIcon2Src, rightLowerIcon2Alt));
    const rightDescText2 = document.createElement('div');
    rightDescText2.className = 'desc-text';
    rightDescText2.textContent = rightLowerText2;
    rightDescInfo2.appendChild(rightDescText2);
    rightLowerDescWrap.appendChild(rightDescInfo2);
  }

  rightLowerSection.appendChild(rightLowerDescWrap);

  if (rightLowerMobileImageSrc) {
    rightLowerSection.appendChild(createAnimationWrapper(createOptimizedPicture(rightLowerMobileImageSrc, rightLowerMobileImageAlt), 'img-mob-wrap-animation animate fifth fadeInRightAlt'));
  }

  if (rightLowerImageSrc) {
    rightLowerSection.appendChild(createAnimationWrapper(createOptimizedPicture(rightLowerImageSrc, rightLowerImageAlt), 'img-wrap-animation animate fifth fadeInRightAlt'));
  }

  lowerWrap.appendChild(rightLowerSection);
  container.appendChild(lowerWrap);

  // Replace the block's content
  block.innerHTML = '';
  block.appendChild(container);

  // Add loaded class for CSS transitions
  setTimeout(() => {
    block.classList.add('loaded');
  }, 100);
}