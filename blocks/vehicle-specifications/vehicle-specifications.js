
import { loadCSS } from '../../scripts/aem.js';
import { getTextLabel, getPlaceholder } from '../../scripts/utils.js';

export default async function decorate(block) {
  // Load specific CSS for this block
  loadCSS(`${window.hlx.codeBasePath}/blocks/vehicle-specifications/vehicle-specifications.css`);

  // Extract data from block children
  const children = [...block.children];
  const [
    entryImageDiv,
    entryMobileImageDiv,
    middleImageDiv,
    middleMobileImageDiv,
    lastImageDiv,
    lastMobileImageDiv,
    featuresDiv,
    brochureDiv,
    brochureTextDiv,
    viewSpecificationsTextDiv,
    modalTitleDiv
  ] = children;

  // Get content from divs
  const entryImage = entryImageDiv.querySelector('picture img')?.src || '';
  const entryMobileImage = entryMobileImageDiv.querySelector('picture img')?.src || '';
  const middleImage = middleImageDiv.querySelector('picture img')?.src || '';
  const middleMobileImage = middleMobileImageDiv.querySelector('picture img')?.src || '';
  const lastImage = lastImageDiv.querySelector('picture img')?.src || '';
  const lastMobileImage = lastMobileImageDiv.querySelector('picture img')?.src || '';
  const featuresContent = featuresDiv.innerHTML || '';
  const brochureLink = brochureDiv.querySelector('a')?.href || '';
  const brochureText = brochureTextDiv.textContent.trim() || getTextLabel('brochureText', 'Brochure');
  const viewSpecificationsText = viewSpecificationsTextDiv.textContent.trim() || getTextLabel('viewSpecificationsText', 'View Full Specifications');
  const modalTitle = modalTitleDiv.textContent.trim() || getTextLabel('modalTitle', 'SPECIFICATIONS of XOOM 160');

  // Create the main structure
  const mainContainer = document.createElement('div');
  mainContainer.id = 'destini-specification-wrap';
  mainContainer.className = 'destini-specification';
  mainContainer.setAttribute('data-component', 'destini-specification');

  // Create image animation wrappers
  const imageAnimateWraps = document.createElement('div');
  imageAnimateWraps.className = 'image-animate-wraps';

  // First image wrap
  const firstImgWrap = document.createElement('div');
  firstImgWrap.className = 'first-img-wrap animate first fadeOutImage';
  firstImgWrap.innerHTML = `
    <img loading="lazy" class="entry-img animate fadeInUp" src="${entryImage}" alt="entry-img">
    <img loading="lazy" class="entry-mob-img animate fadeInUp" src="${entryMobileImage}" alt="entry-img">
  `;
  imageAnimateWraps.appendChild(firstImgWrap);

  // Second image wrap
  const secondImgWrap = document.createElement('div');
  secondImgWrap.className = 'second-img-wrap animate second fadeOutImage';
  secondImgWrap.innerHTML = `
    <img loading="lazy" class="middle-img animate second simpleFadeIn" src="${middleImage}" alt="middle-img">
    <img loading="lazy" class="middle-mob-img animate second simpleFadeIn" src="${middleMobileImage}" alt="middle-img">
  `;
  imageAnimateWraps.appendChild(secondImgWrap);

  // Third image wrap
  const thirdImgWrap = document.createElement('div');
  thirdImgWrap.className = 'third-img-wrap';
  thirdImgWrap.innerHTML = `
    <img loading="lazy" class="last-img animate third fadeInImage" src="${lastImage}" alt="last-img">
    <img loading="lazy" class="last-mob-img animate third fadeInImage" src="${lastMobileImage}" alt="last-img">
  `;
  imageAnimateWraps.appendChild(thirdImgWrap);

  // Create text animation wrappers
  const textAnimateWraps = document.createElement('div');
  textAnimateWraps.className = 'text-animate-wraps fourth';

  // Features text
  const featureTextContainer = document.createElement('div');
  featureTextContainer.className = 'feature-text';
  featureTextContainer.innerHTML = featuresContent;

  // Process features content
  const featureWraps = featureTextContainer.querySelectorAll('ul > li');
  featureWraps.forEach((wrap) => {
    const featureItems = wrap.querySelectorAll('ul > li');
    if (featureItems.length >= 2) {
      const mainHeading = document.createElement('div');
      mainHeading.className = 'main-heading';
      mainHeading.textContent = featureItems[0].textContent.trim();

      const subHeading = document.createElement('div');
      subHeading.className = 'sub-heading';
      subHeading.textContent = featureItems[1].textContent.trim();

      wrap.innerHTML = '';
      wrap.className = 'feature-wrap';
      wrap.appendChild(mainHeading);
      wrap.appendChild(subHeading);
    }
  });

  // Features CTAs
  const featureCtas = document.createElement('div');
  featureCtas.className = 'feature-ctas';

  // Brochure CTA
  const brochureCta = document.createElement('a');
  brochureCta.className = 'cta-first';
  brochureCta.href = brochureLink;
  brochureCta.setAttribute('download', brochureText);
  brochureCta.setAttribute('target', '_blank');
  brochureCta.innerHTML = `
    <img loading="lazy" src="/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/icons/download_icon.png" alt="link image">
    <div class="cta-text">${brochureText}</div>
  `;
  featureCtas.appendChild(brochureCta);

  // View Specifications CTA
  const viewSpecCta = document.createElement('div');
  viewSpecCta.className = 'cta-second';
  viewSpecCta.innerHTML = `
    <div class="cta-text" data-bs-toggle="modal" data-bs-target="#specModal">${viewSpecificationsText}</div>
    <img loading="lazy" src="/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/icons/right_arrow_red.png" alt="link image">
  `;
  featureCtas.appendChild(viewSpecCta);

  textAnimateWraps.appendChild(featureTextContainer);
  textAnimateWraps.appendChild(featureCtas);

  // Create modal structure
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'specModal';
  modal.setAttribute('role', 'dialog');
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-scrollable modal-cont-mw modal-xl modal-dialog-centered">
      <div class="close" data-bs-dismiss="modal">
        <img loading="lazy" class="specification-container-close-mob" src="/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/icons/close_cta.png" alt="close">
      </div>
      <div class="modal-content specification-container animate-modal-bottom">
        <div class="modal-header">
          <div class="spec-header">${modalTitle}</div>
          <div class="close" data-bs-dismiss="modal">
            <img loading="lazy" class="specification-container-close" src="/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/icons/close_icon.png" alt="close">
          </div>
        </div>
        <ul class="nav nav-tabs" id="harley-specs" role="tablist"></ul>
        <div class="tab-content modal-body"></div>
      </div>
    </div>
  `;

  // Process specification tabs
  const tabList = modal.querySelector('.nav-tabs');
  const tabContent = modal.querySelector('.tab-content');
  const tabItems = Array.from(block.querySelectorAll(':scope > div')).slice(11);

  tabItems.forEach((tabItem, index) => {
    const tabTitle = tabItem.children[0].textContent.trim();
    const tabContentHTML = tabItem.children[1].innerHTML;

    // Create tab link
    const tabLink = document.createElement('li');
    tabLink.className = 'tab-text';
    if (index === 0) tabLink.classList.add('active');
    tabLink.innerHTML = `
      <a href="#tab-${index}" data-bs-toggle="tab" aria-selected="${index === 0}" role="tab">${tabTitle}</a>
    `;
    tabList.appendChild(tabLink);

    // Create tab pane
    const tabPane = document.createElement('div');
    tabPane.id = `tab-${index}`;
    tabPane.className = `tab-div tab-pane fade ${index === 0 ? 'active show' : ''}`;
    tabPane.setAttribute('role', 'tabpanel');
    tabPane.innerHTML = tabContentHTML;

    // Process tab content
    const tabRows = tabPane.querySelectorAll('ul > li');
    tabRows.forEach((row) => {
      const rowItems = row.querySelectorAll('ul > li');
      if (rowItems.length >= 2) {
        const mainText = document.createElement('div');
        mainText.className = 'main-text';
        mainText.textContent = rowItems[0].textContent.trim();

        const mainDesc = document.createElement('div');
        mainDesc.className = 'main-desc';
        mainDesc.textContent = rowItems[1].textContent.trim();

        row.innerHTML = '';
        row.className = rowItems[0].className;
        row.appendChild(mainText);
        row.appendChild(mainDesc);
      }
    });

    tabContent.appendChild(tabPane);
  });

  // Assemble the main container
  mainContainer.appendChild(imageAnimateWraps);
  mainContainer.appendChild(textAnimateWraps);
  mainContainer.appendChild(modal);

  // Replace block content
  block.innerHTML = '';
  block.appendChild(mainContainer);

  // Initialize Bootstrap tabs
  const tabTriggerEl = document.querySelector('#harley-specs a');
  if (tabTriggerEl) {
    const tab = new bootstrap.Tab(tabTriggerEl);
    tab.show();
  }

  // Add loaded class for CSS transitions
  setTimeout(() => {
    block.classList.add('loaded');
  }, 100);
}
  