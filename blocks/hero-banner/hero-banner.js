export default function decorate(block) {
    // Extract content from the block divs based on component-models.json field order
    const title = block.children[0]?.textContent || '';
    const subtitle = block.children[1]?.textContent || '';
    const buttonText = block.children[2]?.textContent || '';
    const buttonLink = block.children[3]?.querySelector('a')?.href || '#';
    const backgroundImage = block.children[4]?.querySelector('img')?.src || '';
    const heroImage = block.children[5]?.querySelector('img') || null;
    const taglineImage = block.children[6]?.textContent || '';
    const backgroundColor = block.children[7]?.textContent || '#0075BE';

    // Clear block content
    block.innerHTML = '';

    // Create hero banner structure
    const bannerContainer = document.createElement('div');
    bannerContainer.className = 'hero-banner-container';
    bannerContainer.style.backgroundColor = backgroundColor;
    if (backgroundImage) {
        bannerContainer.style.backgroundImage = `url(${backgroundImage})`;
    }

    // Create content container for left side
    const contentContainer = document.createElement('div');
    contentContainer.className = 'hero-banner-content';

    // Add title
    if (title) {
        const titleEl = document.createElement('h1');
        titleEl.className = 'hero-banner-title';
        titleEl.innerHTML = title;
        contentContainer.appendChild(titleEl);
    }

    // Add subtitle
    if (subtitle) {
        const subtitleEl = document.createElement('h2');
        subtitleEl.className = 'hero-banner-subtitle';
        subtitleEl.innerHTML = subtitle;
        contentContainer.appendChild(subtitleEl);
    }

    // Add CTA button
    if (buttonText) {
        const button = document.createElement('a');
        button.href = buttonLink;
        button.className = 'hero-banner-button';
        button.textContent = buttonText;
        contentContainer.appendChild(button);
    }

    // Create image container for right side
    const imageContainer = document.createElement('div');
    imageContainer.className = 'hero-banner-image-container';

    // Add tagline image if provided
    if (taglineImage) {
        const taglineEl = document.createElement('img');
        taglineEl.className = 'hero-banner-tagline';
        taglineEl.src = taglineImage;
        taglineEl.alt = 'Tagline';
        imageContainer.appendChild(taglineEl);
    }

    // Add hero image if provided
    if (heroImage) {
        const heroImageContainer = document.createElement('div');
        heroImageContainer.className = 'hero-image-wrapper';
        heroImageContainer.appendChild(heroImage.cloneNode(true));
        imageContainer.appendChild(heroImageContainer);
    }

    // Append content and image containers to banner
    bannerContainer.appendChild(contentContainer);
    bannerContainer.appendChild(imageContainer);

    // Add banner container to block
    block.appendChild(bannerContainer);
}