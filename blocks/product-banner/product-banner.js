
export default function decorate(block) {
  // Extract field values from the block
  const desktopBannerImageDiv = block.querySelector('div:nth-child(1) div');
  const mobileBannerImageDiv = block.querySelector('div:nth-child(2) div');
  const bannerHeaderDiv = block.querySelector('div:nth-child(3) div');
  const bannerTitleDiv = block.querySelector('div:nth-child(4) div');
  const priceDiv = block.querySelector('div:nth-child(5) div');
  const priceLabelDiv = block.querySelector('div:nth-child(6) div');
  const cityNameDiv = block.querySelector('div:nth-child(7) div');
  const ctaButtonTextDiv = block.querySelector('div:nth-child(8) div');
  const ctaButtonLinkDiv = block.querySelector('div:nth-child(9) div');

  // Create the main banner container
  const bannerContainer = document.createElement('div');
  bannerContainer.className = 'destini-banner destini-img-banner';
  bannerContainer.id = 'destini-125-banner';
  bannerContainer.setAttribute('data-component', 'destini-125-banner');

  // Create picture element for banner images
  const picture = document.createElement('picture');
  picture.className = 'picture-banner';

  if (desktopBannerImageDiv && desktopBannerImageDiv.querySelector('picture')) {
    const desktopImage = desktopBannerImageDiv.querySelector('picture source');
    const mobileImage = mobileBannerImageDiv.querySelector('picture source');
    const img = desktopBannerImageDiv.querySelector('picture img');

    const desktopSource = document.createElement('source');
    desktopSource.media = '(min-width: 768px)';
    desktopSource.srcset = desktopImage.srcset;

    const mobileSource = document.createElement('source');
    mobileSource.media = '(max-width: 767px)';
    mobileSource.srcset = mobileImage.srcset;

    const fallbackImg = document.createElement('img');
    fallbackImg.src = img.src;
    fallbackImg.alt = img.alt;

    picture.appendChild(desktopSource);
    picture.appendChild(mobileSource);
    picture.appendChild(fallbackImg);
  }

  bannerContainer.appendChild(picture);

  // Create banner header and title
  const bannerHeader = document.createElement('div');
  bannerHeader.className = 'banner-header-new xoom-125-text animate fourth fadeInTopToBottom';
  if (bannerHeaderDiv) {
    bannerHeader.innerHTML = bannerHeaderDiv.innerHTML;
  }

  const bannerTitle = document.createElement('div');
  bannerTitle.className = 'banner-header-title';
  if (bannerTitleDiv) {
    bannerTitle.innerHTML = bannerTitleDiv.innerHTML;
  }

  bannerContainer.appendChild(bannerHeader);
  bannerContainer.appendChild(bannerTitle);

  // Create CTA section
  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'banner-ctas d-flex product-banner-cta';

  // Create price section
  const textWraps = document.createElement('div');
  textWraps.className = 'text-wraps animate fadeInUpWrap fourth';

  const textPrice = document.createElement('div');
  textPrice.className = 'text-price';
  textPrice.textContent = "Don't Miss Out! ";
  if (priceDiv) {
    const priceSpan = document.createElement('span');
    priceSpan.setAttribute('data-price-authored', 'true');
    priceSpan.textContent = priceDiv.textContent.trim();
    textPrice.appendChild(priceSpan);
  }

  const textLabel = document.createElement('div');
  textLabel.className = 'text-label';
  textLabel.textContent = priceLabelDiv ? priceLabelDiv.textContent.trim() : '(Ex-Showroom Price*) ';
  if (cityNameDiv) {
    const citySpan = document.createElement('span');
    citySpan.className = 'city-name d-none';
    citySpan.textContent = cityNameDiv.textContent.trim();
    textLabel.appendChild(citySpan);
  }

  textWraps.appendChild(textPrice);
  textWraps.appendChild(textLabel);

  // Create button section
  const buttonWraps = document.createElement('div');
  buttonWraps.className = 'button-wraps d-flex animate fadeInUpWrap fourth';

  const ctaButton = document.createElement('button');
  ctaButton.setAttribute('data-modal', 'know-more-modal');
  ctaButton.className = 'button--primary text-white mx-sm-0 mx-8 align-items-center bg-white border border-error d-flex justify-content-center flex-row button weight-heavy rounded-2';

  const buttonSpan = document.createElement('span');
  buttonSpan.className = 'text-uppercase text-nowrap';
  buttonSpan.textContent = ctaButtonTextDiv ? ctaButtonTextDiv.textContent.trim() : 'Enquire Now';

  ctaButton.appendChild(buttonSpan);
  buttonWraps.appendChild(ctaButton);

  ctaContainer.appendChild(textWraps);
  ctaContainer.appendChild(buttonWraps);

  bannerContainer.appendChild(ctaContainer);

  // Replace the original block content
  block.innerHTML = '';
  block.appendChild(bannerContainer);
}
    