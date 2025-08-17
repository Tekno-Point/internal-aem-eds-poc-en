
        export default function decorate(block) {
    // Create the main structure
    const mainDiv = document.createElement('div');
    mainDiv.id = 'destiniStandout';
    mainDiv.className = 'destini-standout xoom-160-theme';
    mainDiv.setAttribute('data-component', 'destini-standout');

    // Upper wrap
    const upperWrap = document.createElement('div');
    upperWrap.className = 'standout-upper-wrap';

    // Left section
    const leftDiv = document.createElement('div');
    leftDiv.className = 'verticle-spacing upper-divs left animate second fadeInUpStand';

    const leftTextWrap = document.createElement('div');
    leftTextWrap.className = 'left-text-wrap';
    leftTextWrap.innerHTML = block.children[0].innerHTML;
    leftDiv.appendChild(leftTextWrap);

    const bottomSpecsWrap = document.createElement('div');
    bottomSpecsWrap.className = 'bottom-specs-wrap d-flex';

    // Left boxes
    const leftBoxes = Array.from(block.children).slice(1, 3);
    leftBoxes.forEach(box => {
        const uniqueBox = document.createElement('div');
        uniqueBox.className = 'unique-boxes d-flex animate third fadeInUpStand';

        const boxImgWrap = document.createElement('div');
        boxImgWrap.className = 'box-img-wrap';
        boxImgWrap.innerHTML = box.children[0].innerHTML;
        uniqueBox.appendChild(boxImgWrap);

        const textContainer = document.createElement('div');
        textContainer.className = 'top-specs-cc-text-container count-up-parent';

        const textSpan = document.createElement('span');
        textSpan.className = 'cc-unit-value-container d-block';
        textSpan.innerHTML = box.children[1].innerHTML;
        textContainer.appendChild(textSpan);

        uniqueBox.appendChild(textContainer);
        bottomSpecsWrap.appendChild(uniqueBox);
    });

    leftDiv.appendChild(bottomSpecsWrap);
    upperWrap.appendChild(leftDiv);

    // Center section
    const centerDiv = document.createElement('div');
    centerDiv.className = 'upper-divs center animate first shortenHeight';

    const textStandout = document.createElement('div');
    textStandout.className = 'text-standout';
    textStandout.innerHTML = block.children[3].innerHTML;
    centerDiv.appendChild(textStandout);

    const imgStandout = document.createElement('div');
    imgStandout.className = 'img-standout';
    imgStandout.innerHTML = block.children[4].children[0].innerHTML;
    centerDiv.appendChild(imgStandout);

    const imgMobStandout = document.createElement('div');
    imgMobStandout.className = 'img-mob-standout';
    imgMobStandout.innerHTML = block.children[4].children[1].innerHTML;
    centerDiv.appendChild(imgMobStandout);

    upperWrap.appendChild(centerDiv);

    // Right section
    const rightDiv = document.createElement('div');
    rightDiv.className = 'upper-divs right animate second fadeInUpStand';

    const rightTextWrap = document.createElement('div');
    rightTextWrap.className = 'right-text-wrap';
    rightTextWrap.innerHTML = block.children[5].innerHTML;
    rightDiv.appendChild(rightTextWrap);

    const bottomMobImgWrap = document.createElement('img');
    bottomMobImgWrap.className = 'bottom-mob-img-wrap animate third fadeInRight';
    bottomMobImgWrap.src = block.children[6].children[1].querySelector('img').src;
    bottomMobImgWrap.alt = block.children[6].children[1].querySelector('img').alt;
    rightDiv.appendChild(bottomMobImgWrap);

    const rightDescWrap = document.createElement('div');
    rightDescWrap.className = 'd-flex right-desc-wrap animate fifth fadeInUpStand';

    // Right boxes
    const rightBoxes = Array.from(block.children).slice(7, 9);
    rightBoxes.forEach(box => {
        const descInfo = document.createElement('div');
        descInfo.className = 'desc-info lower-width';

        const iconWrap = document.createElement('img');
        iconWrap.className = 'icon-wrap';
        iconWrap.src = box.children[0].querySelector('img').src;
        iconWrap.alt = box.children[0].querySelector('img').alt;
        descInfo.appendChild(iconWrap);

        const descText = document.createElement('div');
        descText.className = 'desc-text';
        descText.innerHTML = box.children[1].innerHTML;
        descInfo.appendChild(descText);

        rightDescWrap.appendChild(descInfo);
    });

    rightDiv.appendChild(rightDescWrap);

    const bottomImgWrap = document.createElement('img');
    bottomImgWrap.className = 'bottom-img-wrap animate third fadeInRight';
    bottomImgWrap.src = block.children[6].children[0].querySelector('img').src;
    bottomImgWrap.alt = block.children[6].children[0].querySelector('img').alt;
    rightDiv.appendChild(bottomImgWrap);

    upperWrap.appendChild(rightDiv);
    mainDiv.appendChild(upperWrap);

    // Lower wrap
    const lowerWrap = document.createElement('div');
    lowerWrap.className = 'standout-lower-wrap animate fourth fadeInUpStand';

    // Bottom left section
    const bottomLeftDiv = document.createElement('div');
    bottomLeftDiv.className = 'lower-divs left';

    const bottomLeftTextWrap = document.createElement('div');
    bottomLeftTextWrap.className = 'left-text-wrap';
    bottomLeftTextWrap.innerHTML = block.children[9].innerHTML;
    bottomLeftDiv.appendChild(bottomLeftTextWrap);

    const leftDescWrap = document.createElement('div');
    leftDescWrap.className = 'd-flex left-desc-wrap animate fifth fadeInUpStand';

    // Bottom left boxes
    const bottomLeftBoxes = Array.from(block.children).slice(10, 12);
    bottomLeftBoxes.forEach(box => {
        const descInfo = document.createElement('div');
        descInfo.className = 'desc-info lower-width';

        const iconWrap = document.createElement('img');
        iconWrap.className = 'icon-wrap';
        iconWrap.src = box.children[0].querySelector('img').src;
        iconWrap.alt = box.children[0].querySelector('img').alt;
        descInfo.appendChild(iconWrap);

        const descText = document.createElement('div');
        descText.className = 'desc-text';
        descText.innerHTML = box.children[1].innerHTML;
        descInfo.appendChild(descText);

        leftDescWrap.appendChild(descInfo);
    });

    bottomLeftDiv.appendChild(leftDescWrap);

    const imgMobWrapAnimation = document.createElement('img');
    imgMobWrapAnimation.className = 'img-mob-wrap-animation animate fifth fadeInRightAlt';
    imgMobWrapAnimation.src = block.children[12].children[1].querySelector('img').src;
    imgMobWrapAnimation.alt = block.children[12].children[1].querySelector('img').alt;
    bottomLeftDiv.appendChild(imgMobWrapAnimation);

    const imgWrapAnimation = document.createElement('img');
    imgWrapAnimation.className = 'img-wrap-animation animate fifth fadeInRightAlt';
    imgWrapAnimation.src = block.children[12].children[0].querySelector('img').src;
    imgWrapAnimation.alt = block.children[12].children[0].querySelector('img').alt;
    bottomLeftDiv.appendChild(imgWrapAnimation);

    lowerWrap.appendChild(bottomLeftDiv);

    // Bottom right section
    const bottomRightDiv = document.createElement('div');
    bottomRightDiv.className = 'lower-divs right';

    const bottomRightTextWrap = document.createElement('div');
    bottomRightTextWrap.className = 'left-text-wrap';
    bottomRightTextWrap.innerHTML = block.children[13].innerHTML;
    bottomRightDiv.appendChild(bottomRightTextWrap);

    const rightDescWrap2 = document.createElement('div');
    rightDescWrap2.className = 'd-flex left-desc-wrap animate fifth fadeInUpStand';

    // Bottom right boxes
    const bottomRightBoxes = Array.from(block.children).slice(14, 16);
    bottomRightBoxes.forEach(box => {
        const descInfo = document.createElement('div');
        descInfo.className = 'desc-info lower-width';

        const iconWrap = document.createElement('img');
        iconWrap.className = 'icon-wrap';
        iconWrap.src = box.children[0].querySelector('img').src;
        iconWrap.alt = box.children[0].querySelector('img').alt;
        descInfo.appendChild(iconWrap);

        const descText = document.createElement('div');
        descText.className = 'desc-text';
        descText.innerHTML = box.children[1].innerHTML;
        descInfo.appendChild(descText);

        rightDescWrap2.appendChild(descInfo);
    });

    bottomRightDiv.appendChild(rightDescWrap2);

    const imgMobWrapAnimation2 = document.createElement('img');
    imgMobWrapAnimation2.className = 'img-mob-wrap-animation animate fifth fadeInRightAlt';
    imgMobWrapAnimation2.src = block.children[16].children[1].querySelector('img').src;
    imgMobWrapAnimation2.alt = block.children[16].children[1].querySelector('img').alt;
    bottomRightDiv.appendChild(imgMobWrapAnimation2);

    const imgWrapAnimation2 = document.createElement('img');
    imgWrapAnimation2.className = 'img-wrap-animation animate fifth fadeInRightAlt';
    imgWrapAnimation2.src = block.children[16].children[0].querySelector('img').src;
    imgWrapAnimation2.alt = block.children[16].children[0].querySelector('img').alt;
    bottomRightDiv.appendChild(imgWrapAnimation2);

    lowerWrap.appendChild(bottomRightDiv);
    mainDiv.appendChild(lowerWrap);

    // Replace the block content
    block.innerHTML = '';
    block.appendChild(mainDiv);
}
    