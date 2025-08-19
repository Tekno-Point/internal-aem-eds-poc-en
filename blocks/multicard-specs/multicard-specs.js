
import { moveInstrumentation } from '../../scripts/aem.js';
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Create the main structure
  const standoutUpperWrap = document.createElement('div');
  standoutUpperWrap.className = 'standout-upper-wrap';

  const standoutLowerWrap = document.createElement('div');
  standoutLowerWrap.className = 'standout-lower-wrap animate fourth fadeInUpStand';

  // Left Section
  const leftUpperDiv = document.createElement('div');
  leftUpperDiv.className = 'verticle-spacing upper-divs left animate second fadeInUpStand';

  const leftTextWrap = document.createElement('div');
  leftTextWrap.className = 'left-text-wrap';
  leftTextWrap.innerHTML = block.children[0].children[0].innerHTML;
  leftUpperDiv.appendChild(leftTextWrap);

  const bottomSpecsWrap = document.createElement('div');
  bottomSpecsWrap.className = 'bottom-specs-wrap d-flex';

  const leftSectionCards = block.children[0].children[2].querySelectorAll('li');
  leftSectionCards.forEach((card) => {
    const uniqueBoxes = document.createElement('div');
    uniqueBoxes.className = 'unique-boxes d-flex animate third fadeInUpStand';

    const boxImgWrap = document.createElement('div');
    boxImgWrap.className = 'box-img-wrap';
    const img = document.createElement('img');
    img.src = '/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/standout/Icon.svg';
    img.loading = 'lazy';
    boxImgWrap.appendChild(img);
    uniqueBoxes.appendChild(boxImgWrap);

    const topSpecsTextContainer = document.createElement('div');
    topSpecsTextContainer.className = 'top-specs-cc-text-container count-up-parent';

    const ccUnitValueContainer = document.createElement('span');
    ccUnitValueContainer.className = 'cc-unit-value-container d-block';
    ccUnitValueContainer.innerHTML = card.innerHTML.replace('<br>', ' ');
    topSpecsTextContainer.appendChild(ccUnitValueContainer);

    uniqueBoxes.appendChild(topSpecsTextContainer);
    bottomSpecsWrap.appendChild(uniqueBoxes);
  });

  leftUpperDiv.appendChild(bottomSpecsWrap);
  standoutUpperWrap.appendChild(leftUpperDiv);

  // Center Section
  const centerUpperDiv = document.createElement('div');
  centerUpperDiv.className = 'upper-divs center animate first shortenHeight';

  const textStandout = document.createElement('div');
  textStandout.className = 'text-standout';
  textStandout.innerHTML = block.children[1].children[0].innerHTML;
  centerUpperDiv.appendChild(textStandout);

  const imgStandout = document.createElement('div');
  imgStandout.className = 'img-standout';
  const img = document.createElement('img');
  img.src = block.children[1].children[1].querySelector('img').src;
  img.loading = 'lazy';
  img.className = 'animate first enhanceImg';
  imgStandout.appendChild(img);
  centerUpperDiv.appendChild(imgStandout);

  const imgMobStandout = document.createElement('div');
  imgMobStandout.className = 'img-mob-standout';
  const mobImg = document.createElement('img');
  mobImg.src = block.children[1].children[2].querySelector('img').src;
  mobImg.loading = 'lazy';
  mobImg.className = 'animate first enhanceImg';
  imgMobStandout.appendChild(mobImg);
  centerUpperDiv.appendChild(imgMobStandout);

  standoutUpperWrap.appendChild(centerUpperDiv);

  // Right Section
  const rightUpperDiv = document.createElement('div');
  rightUpperDiv.className = 'upper-divs right animate second fadeInUpStand';

  const rightTextWrap = document.createElement('div');
  rightTextWrap.className = 'right-text-wrap';
  rightTextWrap.innerHTML = block.children[2].children[0].innerHTML;
  rightUpperDiv.appendChild(rightTextWrap);

  const bottomMobImg = document.createElement('img');
  bottomMobImg.src = block.children[2].children[1].querySelector('img').src;
  bottomMobImg.loading = 'lazy';
  bottomMobImg.className = 'bottom-mob-img-wrap animate third fadeInRight';
  rightUpperDiv.appendChild(bottomMobImg);

  const rightDescWrap = document.createElement('div');
  rightDescWrap.className = 'd-flex right-desc-wrap animate fifth fadeInUpStand';

  const rightSectionCards = block.children[2].children[3].querySelectorAll('li');
  rightSectionCards.forEach((card) => {
    const descInfo = document.createElement('div');
    descInfo.className = 'desc-info lower-width';

    const iconWrap = document.createElement('img');
    iconWrap.src = card.querySelector('img').src;
    iconWrap.loading = 'lazy';
    iconWrap.className = 'icon-wrap';
    descInfo.appendChild(iconWrap);

    const descText = document.createElement('div');
    descText.className = 'desc-text';
    descText.textContent = card.textContent.trim();
    descInfo.appendChild(descText);

    rightDescWrap.appendChild(descInfo);
  });

  rightUpperDiv.appendChild(rightDescWrap);

  const bottomImg = document.createElement('img');
  bottomImg.src = block.children[2].children[1].querySelector('img').src;
  bottomImg.loading = 'lazy';
  bottomImg.className = 'bottom-img-wrap animate third fadeInRight';
  rightUpperDiv.appendChild(bottomImg);

  standoutUpperWrap.appendChild(rightUpperDiv);

  // Bottom Left Section
  const leftLowerDiv = document.createElement('div');
  leftLowerDiv.className = 'lower-divs left';

  const leftLowerTextWrap = document.createElement('div');
  leftLowerTextWrap.className = 'left-text-wrap';
  leftLowerTextWrap.innerHTML = block.children[3].children[0].innerHTML;
  leftLowerDiv.appendChild(leftLowerTextWrap);

  const leftDescWrap = document.createElement('div');
  leftDescWrap.className = 'd-flex left-desc-wrap animate fifth fadeInUpStand';

  const leftSectionBottomCards = block.children[3].children[3].querySelectorAll('li');
  leftSectionBottomCards.forEach((card) => {
    const descInfo = document.createElement('div');
    descInfo.className = 'desc-info lower-width';

    const iconWrap = document.createElement('img');
    iconWrap.src = card.querySelector('img').src;
    iconWrap.loading = 'lazy';
    iconWrap.className = 'icon-wrap';
    descInfo.appendChild(iconWrap);

    const descText = document.createElement('div');
    descText.className = 'desc-text';
    descText.textContent = card.textContent.trim();
    descInfo.appendChild(descText);

    leftDescWrap.appendChild(descInfo);
  });

  leftLowerDiv.appendChild(leftDescWrap);

  const leftMobImg = document.createElement('img');
  leftMobImg.src = block.children[3].children[1].querySelector('img').src;
  leftMobImg.loading = 'lazy';
  leftMobImg.className = 'img-mob-wrap-animation animate fifth fadeInRightAlt';
  leftLowerDiv.appendChild(leftMobImg);

  const leftImg = document.createElement('img');
  leftImg.src = block.children[3].children[2].querySelector('img').src;
  leftImg.loading = 'lazy';
  leftImg.className = 'img-wrap-animation animate fifth fadeInRightAlt';
  leftLowerDiv.appendChild(leftImg);

  standoutLowerWrap.appendChild(leftLowerDiv);

  // Bottom Right Section
  const rightLowerDiv = document.createElement('div');
  rightLowerDiv.className = 'lower-divs right';

  const rightLowerTextWrap = document.createElement('div');
  rightLowerTextWrap.className = 'left-text-wrap';
  rightLowerTextWrap.innerHTML = block.children[4].children[0].innerHTML;
  rightLowerDiv.appendChild(rightLowerTextWrap);

  const rightDescWrapBottom = document.createElement('div');
  rightDescWrapBottom.className = 'd-flex left-desc-wrap animate fifth fadeInUpStand';

  const rightSectionBottomCards = block.children[4].children[3].querySelectorAll('li');
  rightSectionBottomCards.forEach((card) => {
    const descInfo = document.createElement('div');
    descInfo.className = 'desc-info lower-width';

    const iconWrap = document.createElement('img');
    iconWrap.src = card.querySelector('img').src;
    iconWrap.loading = 'lazy';
    iconWrap.className = 'icon-wrap';
    descInfo.appendChild(iconWrap);

    const descText = document.createElement('div');
    descText.className = 'desc-text';
    descText.textContent = card.textContent.trim();
    descInfo.appendChild(descText);

    rightDescWrapBottom.appendChild(descInfo);
  });

  rightLowerDiv.appendChild(rightDescWrapBottom);

  const rightMobImg = document.createElement('img');
  rightMobImg.src = block.children[4].children[1].querySelector('img').src;
  rightMobImg.loading = 'lazy';
  rightMobImg.className = 'img-mob-wrap-animation animate fifth fadeInRightAlt';
  rightLowerDiv.appendChild(rightMobImg);

  const rightImg = document.createElement('img');
  rightImg.src = block.children[4].children[2].querySelector('img').src;
  rightImg.loading = 'lazy';
  rightImg.className = 'img-wrap-animation animate fifth fadeInRightAlt';
  rightLowerDiv.appendChild(rightImg);

  standoutLowerWrap.appendChild(rightLowerDiv);

  // Replace the block content
  block.innerHTML = '';
  block.appendChild(standoutUpperWrap);
  block.appendChild(standoutLowerWrap);
}
    