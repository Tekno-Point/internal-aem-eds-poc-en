
export default function decorate(block) {
  // Get all the direct child divs, which represent the repeating card items.
  const children = [...block.children];

  // Create the new structure
  const wrapper = document.createElement('div');
  wrapper.id = 'destini-specification-wrap';
  wrapper.className = 'destini-specification';
  wrapper.setAttribute('data-component', 'destini-specification');

  const imageAnimateWraps = document.createElement('div');
  imageAnimateWraps.className = 'image-animate-wraps';

  const firstImgWrap = document.createElement('div');
  firstImgWrap.className = 'first-img-wrap animate first fadeOutImage';

  const secondImgWrap = document.createElement('div');
  secondImgWrap.className = 'second-img-wrap animate second fadeOutImage';

  const thirdImgWrap = document.createElement('div');
  thirdImgWrap.className = 'third-img-wrap';

  const textAnimateWraps = document.createElement('div');
  textAnimateWraps.className = 'text-animate-wraps animate fourth fadeInUp';

  const featureText = document.createElement('div');
  featureText.className = 'feature-text';

  const featureCtas = document.createElement('div');
  featureCtas.className = 'feature-ctas';

  // Iterate and identify elements based on their content, not their position (index).
  // This is a robust approach that is resilient to author changes in the AEM editor.
  children.forEach((child) => {
    // Check for a picture element. This handles the 'Field Collapse' for images and their alt text.
    const picture = child.querySelector('picture');
    // Check for heading elements (h1-h6). This handles 'Field Collapse' for headings and their types.
    const heading = child.querySelector('h1, h2, h3, h4, h5, h6');
    // Check for a link element. This handles 'Field Collapse' for links and their text/titles.
    const ctaLink = child.querySelector('a');

    // Process the identified elements.
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const alt = img.getAttribute('alt');
        if (alt === 'entry-img') {
          const entryImg = img.cloneNode(true);
          entryImg.className = 'entry-img animate fadeInUp';
          firstImgWrap.appendChild(entryImg);
        } else if (alt === 'middle-img') {
          const middleImg = img.cloneNode(true);
          middleImg.className = 'middle-img animate second simpleFadeIn';
          secondImgWrap.appendChild(middleImg);
        } else if (alt === 'last-img') {
          const lastImg = img.cloneNode(true);
          lastImg.className = 'last-img animate third fadeInImage';
          thirdImgWrap.appendChild(lastImg);
        }
      }
      // Remove the original div to avoid duplicate content in the final output.
      child.remove();
    } else if (heading) {
      const featureWrap = document.createElement('div');
      featureWrap.className = 'feature-wrap';

      const mainHeading = document.createElement('div');
      mainHeading.className = 'main-heading';
      mainHeading.textContent = heading.textContent;

      const subHeading = document.createElement('div');
      subHeading.className = 'sub-heading';
      subHeading.textContent = heading.nextElementSibling ? heading.nextElementSibling.textContent : '';

      featureWrap.appendChild(mainHeading);
      featureWrap.appendChild(subHeading);
      featureText.appendChild(featureWrap);

      child.remove();
    } else if (ctaLink) {
      const ctaFirst = document.createElement('a');
      ctaFirst.className = 'cta-first';
      ctaFirst.href = ctaLink.href;
      ctaFirst.setAttribute('download', 'Brochure');
      ctaFirst.setAttribute('target', '_blank');

      const ctaFirstImg = document.createElement('img');
      ctaFirstImg.src = '/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/icons/download_icon.png';
      ctaFirstImg.alt = 'link image';

      const ctaFirstText = document.createElement('div');
      ctaFirstText.className = 'cta-text';
      ctaFirstText.textContent = ctaLink.textContent;

      ctaFirst.appendChild(ctaFirstImg);
      ctaFirst.appendChild(ctaFirstText);

      featureCtas.appendChild(ctaFirst);

      const ctaSecond = document.createElement('div');
      ctaSecond.className = 'cta-second';

      const ctaSecondText = document.createElement('div');
      ctaSecondText.className = 'cta-text';
      ctaSecondText.setAttribute('data-bs-toggle', 'modal');
      ctaSecondText.setAttribute('data-bs-target', '#specModal');
      ctaSecondText.textContent = 'View Full Specifications';

      const ctaSecondImg = document.createElement('img');
      ctaSecondImg.src = '/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/icons/right_arrow_red.png';
      ctaSecondImg.alt = 'link image';

      ctaSecond.appendChild(ctaSecondText);
      ctaSecond.appendChild(ctaSecondImg);

      featureCtas.appendChild(ctaSecond);

      child.remove();
    }
  });

  imageAnimateWraps.appendChild(firstImgWrap);
  imageAnimateWraps.appendChild(secondImgWrap);
  imageAnimateWraps.appendChild(thirdImgWrap);

  textAnimateWraps.appendChild(featureText);
  textAnimateWraps.appendChild(featureCtas);

  wrapper.appendChild(imageAnimateWraps);
  wrapper.appendChild(textAnimateWraps);

  // Append the new, structured container to the block.
  if (wrapper.hasChildNodes()) {
    block.append(wrapper);
  }
}
  