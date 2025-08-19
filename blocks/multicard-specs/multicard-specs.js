
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Extract data from the block
  const leftSectionText = block.querySelector('div:nth-child(1) > div > div').innerHTML;
  const leftSectionCard1Image = block.querySelector('div:nth-child(2) > div > div').querySelector('picture > img');
  const leftSectionCard1Text = block.querySelector('div:nth-child(2) > div:nth-child(2) > div').innerHTML;
  const leftSectionCard2Image = block.querySelector('div:nth-child(3) > div > div').querySelector('picture > img');
  const leftSectionCard2Text = block.querySelector('div:nth-child(3) > div:nth-child(2) > div').innerHTML;
  const centerSectionText = block.querySelector('div:nth-child(4) > div > div').innerHTML;
  const centerSectionImage = block.querySelector('div:nth-child(5) > div > div').querySelector('picture > img');
  const centerSectionMobileImage = block.querySelector('div:nth-child(6) > div > div').querySelector('picture > img');
  const rightSectionText = block.querySelector('div:nth-child(7) > div > div').innerHTML;
  const rightSectionImage = block.querySelector('div:nth-child(8) > div > div').querySelector('picture > img');
  const rightSectionCard1Image = block.querySelector('div:nth-child(9) > div > div').querySelector('picture > img');
  const rightSectionCard1Text = block.querySelector('div:nth-child(9) > div:nth-child(2) > div').innerHTML;
  const rightSectionBottomImage = block.querySelector('div:nth-child(10) > div > div').querySelector('picture > img');
  const lowerLeftSectionText = block.querySelector('div:nth-child(11) > div > div').innerHTML;
  const lowerLeftSectionCard1Image = block.querySelector('div:nth-child(12) > div > div').querySelector('picture > img');
  const lowerLeftSectionCard1Text = block.querySelector('div:nth-child(12) > div:nth-child(2) > div').innerHTML;
  const lowerLeftSectionCard2Image = block.querySelector('div:nth-child(13) > div > div').querySelector('picture > img');
  const lowerLeftSectionCard2Text = block.querySelector('div:nth-child(13) > div:nth-child(2) > div').innerHTML;
  const lowerLeftSectionMobileImage = block.querySelector('div:nth-child(14) > div > div').querySelector('picture > img');
  const lowerLeftSectionImage = block.querySelector('div:nth-child(15) > div > div').querySelector('picture > img');
  const lowerRightSectionText = block.querySelector('div:nth-child(16) > div > div').innerHTML;
  const lowerRightSectionCard1Image = block.querySelector('div:nth-child(17) > div > div').querySelector('picture > img');
  const lowerRightSectionCard1Text = block.querySelector('div:nth-child(17) > div:nth-child(2) > div').innerHTML;
  const lowerRightSectionCard2Image = block.querySelector('div:nth-child(18) > div > div').querySelector('picture > img');
  const lowerRightSectionCard2Text = block.querySelector('div:nth-child(18) > div:nth-child(2) > div').innerHTML;
  const lowerRightSectionMobileImage = block.querySelector('div:nth-child(19) > div > div').querySelector('picture > img');
  const lowerRightSectionImage = block.querySelector('div:nth-child(20) > div > div').querySelector('picture > img');

  // Create the main container
  const container = document.createElement('div');
  container.className = 'multicardspecs aem-GridColumn aem-GridColumn--default--12';

  // Create the main wrapper
  const wrapper = document.createElement('div');
  wrapper.id = 'destiniStandout';
  wrapper.className = 'destini-standout xoom-160-theme';
  wrapper.setAttribute('data-component', 'destini-standout');

  // Create the upper wrap
  const upperWrap = document.createElement('div');
  upperWrap.className = 'standout-upper-wrap';

  // Create the left section
  const leftSection = document.createElement('div');
  leftSection.className = 'verticle-spacing upper-divs left animate second fadeInUpStand';

  const leftTextWrap = document.createElement('div');
  leftTextWrap.className = 'left-text-wrap';
  leftTextWrap.innerHTML = leftSectionText;
  leftSection.appendChild(leftTextWrap);

  const leftCardsWrap = document.createElement('div');
  leftCardsWrap.className = 'bottom-specs-wrap d-flex';

  const leftCard1 = document.createElement('div');
  leftCard1.className = 'unique-boxes d-flex animate third fadeInUpStand';

  const leftCard1ImageWrap = document.createElement('div');
  leftCard1ImageWrap.className = 'box-img-wrap';
  const optimizedLeftCard1Image = createOptimizedPicture(leftSectionCard1Image.src, leftSectionCard1Image.alt, false, [{ width: '750' }]);
  moveInstrumentation(leftSectionCard1Image, optimizedLeftCard1Image.querySelector('img'));
  leftCard1ImageWrap.appendChild(optimizedLeftCard1Image);
  leftCard1.appendChild(leftCard1ImageWrap);

  const leftCard1TextContainer = document.createElement('div');
  leftCard1TextContainer.className = 'top-specs-cc-text-container count-up-parent';
  leftCard1TextContainer.innerHTML = leftSectionCard1Text;
  leftCard1.appendChild(leftCard1TextContainer);

  leftCardsWrap.appendChild(leftCard1);

  const leftCard2 = document.createElement('div');
  leftCard2.className = 'unique-boxes d-flex animate third fadeInUpStand';

  const leftCard2ImageWrap = document.createElement('div');
  leftCard2ImageWrap.className = 'box-img-wrap';
  const optimizedLeftCard2Image = createOptimizedPicture(leftSectionCard2Image.src, leftSectionCard2Image.alt, false, [{ width: '750' }]);
  moveInstrumentation(leftSectionCard2Image, optimizedLeftCard2Image.querySelector('img'));
  leftCard2ImageWrap.appendChild(optimizedLeftCard2Image);
  leftCard2.appendChild(leftCard2ImageWrap);

  const leftCard2TextContainer = document.createElement('div');
  leftCard2TextContainer.className = 'top-specs-cc-text-container count-up-parent';
  leftCard2TextContainer.innerHTML = leftSectionCard2Text;
  leftCard2.appendChild(leftCard2TextContainer);

  leftCardsWrap.appendChild(leftCard2);

  leftSection.appendChild(leftCardsWrap);
  upperWrap.appendChild(leftSection);

  // Create the center section
  const centerSection = document.createElement('div');
  centerSection.className = 'upper-divs center animate first shortenHeight';

  const centerTextWrap = document.createElement('div');
  centerTextWrap.className = 'text-standout';
  centerTextWrap.innerHTML = centerSectionText;
  centerSection.appendChild(centerTextWrap);

  const centerImageWrap = document.createElement('div');
  centerImageWrap.className = 'img-standout';
  const optimizedCenterImage = createOptimizedPicture(centerSectionImage.src, centerSectionImage.alt, false, [{ width: '750' }]);
  moveInstrumentation(centerSectionImage, optimizedCenterImage.querySelector('img'));
  centerImageWrap.appendChild(optimizedCenterImage);
  centerSection.appendChild(centerImageWrap);

  const centerMobileImageWrap = document.createElement('div');
  centerMobileImageWrap.className = 'img-mob-standout';
  const optimizedCenterMobileImage = createOptimizedPicture(centerSectionMobileImage.src, centerSectionMobileImage.alt, false, [{ width: '750' }]);
  moveInstrumentation(centerSectionMobileImage, optimizedCenterMobileImage.querySelector('img'));
  centerMobileImageWrap.appendChild(optimizedCenterMobileImage);
  centerSection.appendChild(centerMobileImageWrap);

  upperWrap.appendChild(centerSection);

  // Create the right section
  const rightSection = document.createElement('div');
  rightSection.className = 'upper-divs right animate second fadeInUpStand';

  const rightTextWrap = document.createElement('div');
  rightTextWrap.className = 'right-text-wrap';
  rightTextWrap.innerHTML = rightSectionText;
  rightSection.appendChild(rightTextWrap);

  const rightImageWrap = document.createElement('div');
  rightImageWrap.className = 'bottom-mob-img-wrap animate third fadeInRight';
  const optimizedRightImage = createOptimizedPicture(rightSectionImage.src, rightSectionImage.alt, false, [{ width: '750' }]);
  moveInstrumentation(rightSectionImage, optimizedRightImage.querySelector('img'));
  rightImageWrap.appendChild(optimizedRightImage);
  rightSection.appendChild(rightImageWrap);

  const rightCardsWrap = document.createElement('div');
  rightCardsWrap.className = 'd-flex right-desc-wrap animate fifth fadeInUpStand';

  const rightCard1 = document.createElement('div');
  rightCard1.className = 'desc-info lower-width';

  const rightCard1ImageWrap = document.createElement('div');
  rightCard1ImageWrap.className = 'icon-wrap';
  const optimizedRightCard1Image = createOptimizedPicture(rightSectionCard1Image.src, rightSectionCard1Image.alt, false, [{ width: '750' }]);
  moveInstrumentation(rightSectionCard1Image, optimizedRightCard1Image.querySelector('img'));
  rightCard1ImageWrap.appendChild(optimizedRightCard1Image);
  rightCard1.appendChild(rightCard1ImageWrap);

  const rightCard1Text = document.createElement('div');
  rightCard1Text.className = 'desc-text';
  rightCard1Text.innerHTML = rightSectionCard1Text;
  rightCard1.appendChild(rightCard1Text);

  rightCardsWrap.appendChild(rightCard1);

  rightSection.appendChild(rightCardsWrap);

  const rightBottomImageWrap = document.createElement('div');
  rightBottomImageWrap.className = 'bottom-img-wrap animate third fadeInRight';
  const optimizedRightBottomImage = createOptimizedPicture(rightSectionBottomImage.src, rightSectionBottomImage.alt, false, [{ width: '750' }]);
  moveInstrumentation(rightSectionBottomImage, optimizedRightBottomImage.querySelector('img'));
  rightBottomImageWrap.appendChild(optimizedRightBottomImage);
  rightSection.appendChild(rightBottomImageWrap);

  upperWrap.appendChild(rightSection);

  // Create the lower wrap
  const lowerWrap = document.createElement('div');
  lowerWrap.className = 'standout-lower-wrap animate fourth fadeInUpStand';

  // Create the lower left section
  const lowerLeftSection = document.createElement('div');
  lowerLeftSection.className = 'lower-divs left';

  const lowerLeftTextWrap = document.createElement('div');
  lowerLeftTextWrap.className = 'left-text-wrap';
  lowerLeftTextWrap.innerHTML = lowerLeftSectionText;
  lowerLeftSection.appendChild(lowerLeftTextWrap);

  const lowerLeftCardsWrap = document.createElement('div');
  lowerLeftCardsWrap.className = 'd-flex left-desc-wrap animate fifth fadeInUpStand';

  const lowerLeftCard1 = document.createElement('div');
  lowerLeftCard1.className = 'desc-info lower-width';

  const lowerLeftCard1ImageWrap = document.createElement('div');
  lowerLeftCard1ImageWrap.className = 'icon-wrap';
  const optimizedLowerLeftCard1Image = createOptimizedPicture(lowerLeftSectionCard1Image.src, lowerLeftSectionCard1Image.alt, false, [{ width: '750' }]);
  moveInstrumentation(lowerLeftSectionCard1Image, optimizedLowerLeftCard1Image.querySelector('img'));
  lowerLeftCard1ImageWrap.appendChild(optimizedLowerLeftCard1Image);
  lowerLeftCard1.appendChild(lowerLeftCard1ImageWrap);

  const lowerLeftCard1Text = document.createElement('div');
  lowerLeftCard1Text.className = 'desc-text';
  lowerLeftCard1Text.innerHTML = lowerLeftSectionCard1Text;
  lowerLeftCard1.appendChild(lowerLeftCard1Text);

  lowerLeftCardsWrap.appendChild(lowerLeftCard1);

  const lowerLeftCard2 = document.createElement('div');
  lowerLeftCard2.className = 'desc-info lower-width';

  const lowerLeftCard2ImageWrap = document.createElement('div');
  lowerLeftCard2ImageWrap.className = 'icon-wrap';
  const optimizedLowerLeftCard2Image = createOptimizedPicture(lowerLeftSectionCard2Image.src, lowerLeftSectionCard2Image.alt, false, [{ width: '750' }]);
  moveInstrumentation(lowerLeftSectionCard2Image, optimizedLowerLeftCard2Image.querySelector('img'));
  lowerLeftCard2ImageWrap.appendChild(optimizedLowerLeftCard2Image);
  lowerLeftCard2.appendChild(lowerLeftCard2ImageWrap);

  const lowerLeftCard2Text = document.createElement('div');
  lowerLeftCard2Text.className = 'desc-text';
  lowerLeftCard2Text.innerHTML = lowerLeftSectionCard2Text;
  lowerLeftCard2.appendChild(lowerLeftCard2Text);

  lowerLeftCardsWrap.appendChild(lowerLeftCard2);

  lowerLeftSection.appendChild(lowerLeftCardsWrap);

  const lowerLeftMobileImageWrap = document.createElement('div');
  lowerLeftMobileImageWrap.className = 'img-mob-wrap-animation animate fifth fadeInRightAlt';
  const optimizedLowerLeftMobileImage = createOptimizedPicture(lowerLeftSectionMobileImage.src, lowerLeftSectionMobileImage.alt, false, [{ width: '750' }]);
  moveInstrumentation(lowerLeftSectionMobileImage, optimizedLowerLeftMobileImage.querySelector('img'));
  lowerLeftMobileImageWrap.appendChild(optimizedLowerLeftMobileImage);
  lowerLeftSection.appendChild(lowerLeftMobileImageWrap);

  const lowerLeftImageWrap = document.createElement('div');
  lowerLeftImageWrap.className = 'img-wrap-animation animate fifth fadeInRightAlt';
  const optimizedLowerLeftImage = createOptimizedPicture(lowerLeftSectionImage.src, lowerLeftSectionImage.alt, false, [{ width: '750' }]);
  moveInstrumentation(lowerLeftSectionImage, optimizedLowerLeftImage.querySelector('img'));
  lowerLeftImageWrap.appendChild(optimizedLowerLeftImage);
  lowerLeftSection.appendChild(lowerLeftImageWrap);

  lowerWrap.appendChild(lowerLeftSection);

  // Create the lower right section
  const lowerRightSection = document.createElement('div');
  lowerRightSection.className = 'lower-divs right';

  const lowerRightTextWrap = document.createElement('div');
  lowerRightTextWrap.className = 'left-text-wrap';
  lowerRightTextWrap.innerHTML = lowerRightSectionText;
  lowerRightSection.appendChild(lowerRightTextWrap);

  const lowerRightCardsWrap = document.createElement('div');
  lowerRightCardsWrap.className = 'd-flex left-desc-wrap animate fifth fadeInUpStand';

  const lowerRightCard1 = document.createElement('div');
  lowerRightCard1.className = 'desc-info lower-width';

  const lowerRightCard1ImageWrap = document.createElement('div');
  lowerRightCard1ImageWrap.className = 'icon-wrap';
  const optimizedLowerRightCard1Image = createOptimizedPicture(lowerRightSectionCard1Image.src, lowerRightSectionCard1Image.alt, false, [{ width: '750' }]);
  moveInstrumentation(lowerRightSectionCard1Image, optimizedLowerRightCard1Image.querySelector('img'));
  lowerRightCard1ImageWrap.appendChild(optimizedLowerRightCard1Image);
  lowerRightCard1.appendChild(lowerRightCard1ImageWrap);

  const lowerRightCard1Text = document.createElement('div');
  lowerRightCard1Text.className = 'desc-text';
  lowerRightCard1Text.innerHTML = lowerRightSectionCard1Text;
  lowerRightCard1.appendChild(lowerRightCard1Text);

  lowerRightCardsWrap.appendChild(lowerRightCard1);

  const lowerRightCard2 = document.createElement('div');
  lowerRightCard2.className = 'desc-info lower-width';

  const lowerRightCard2ImageWrap = document.createElement('div');
  lowerRightCard2ImageWrap.className = 'icon-wrap';
  const optimizedLowerRightCard2Image = createOptimizedPicture(lowerRightSectionCard2Image.src, lowerRightSectionCard2Image.alt, false, [{ width: '750' }]);
  moveInstrumentation(lowerRightSectionCard2Image, optimizedLowerRightCard2Image.querySelector('img'));
  lowerRightCard2ImageWrap.appendChild(optimizedLowerRightCard2Image);
  lowerRightCard2.appendChild(lowerRightCard2ImageWrap);

  const lowerRightCard2Text = document.createElement('div');
  lowerRightCard2Text.className = 'desc-text';
  lowerRightCard2Text.innerHTML = lowerRightSectionCard2Text;
  lowerRightCard2.appendChild(lowerRightCard2Text);

  lowerRightCardsWrap.appendChild(lowerRightCard2);

  lowerRightSection.appendChild(lowerRightCardsWrap);

  const lowerRightMobileImageWrap = document.createElement('div');
  lowerRightMobileImageWrap.className = 'img-mob-wrap-animation animate fifth fadeInRightAlt';
  const optimizedLowerRightMobileImage = createOptimizedPicture(lowerRightSectionMobileImage.src, lowerRightSectionMobileImage.alt, false, [{ width: '750' }]);
  moveInstrumentation(lowerRightSectionMobileImage, optimizedLowerRightMobileImage.querySelector('img'));
  lowerRightMobileImageWrap.appendChild(optimizedLowerRightMobileImage);
  lowerRightSection.appendChild(lowerRightMobileImageWrap);

  const lowerRightImageWrap = document.createElement('div');
  lowerRightImageWrap.className = 'img-wrap-animation animate fifth fadeInRightAlt';
  const optimizedLowerRightImage = createOptimizedPicture(lowerRightSectionImage.src, lowerRightSectionImage.alt, false, [{ width: '750' }]);
  moveInstrumentation(lowerRightSectionImage, optimizedLowerRightImage.querySelector('img'));
  lowerRightImageWrap.appendChild(optimizedLowerRightImage);
  lowerRightSection.appendChild(lowerRightImageWrap);

  lowerWrap.appendChild(lowerRightSection);

  // Assemble the final structure
  wrapper.appendChild(upperWrap);
  wrapper.appendChild(lowerWrap);
  container.appendChild(wrapper);

  // Replace the original block content
  block.innerHTML = '';
  block.appendChild(container);
}
    