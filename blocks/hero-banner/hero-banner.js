export default function decorate(block) {
    // Extract content from the block
    const mainHeading = block.children[0]?.textContent || '';
    const subHeading = block.children[1]?.textContent || '';
    const buttonText = block.children[2]?.textContent || '';
    const buttonLink = block.children[3]?.querySelector('a')?.href || '#';
    const heroImage = block.children[4]?.querySelector('img');
    const tagline = block.children[5]?.textContent || '';
    const statsText = block.children[6]?.textContent || '';
    const colorScheme = block.children[7]?.textContent || 'blue';

    // Parse statistics
    const statsItems = statsText.split('\n')
        .filter(line => line.trim())
        .map(line => {
            const [label, value] = line.split('|').map(part => part.trim());
            return { label, value };
        });

    // Create the hero banner structure
    const heroElement = document.createElement('div');
    heroElement.className = `hero-banner-container ${colorScheme}`;

    // Content container (left side)
    const contentContainer = document.createElement('div');
    contentContainer.className = 'hero-content';

    // Headings
    const headingsWrapper = document.createElement('div');
    headingsWrapper.className = 'hero-headings';

    const h1Element = document.createElement('h1');
    h1Element.innerHTML = mainHeading;
    h1Element.className = 'hero-main-heading';

    const h2Element = document.createElement('h2');
    h2Element.innerHTML = subHeading;
    h2Element.className = 'hero-sub-heading';

    headingsWrapper.appendChild(h1Element);
    headingsWrapper.appendChild(h2Element);

    // Button
    const ctaButton = document.createElement('a');
    ctaButton.href = buttonLink;
    ctaButton.className = 'hero-cta-button';
    ctaButton.textContent = buttonText;

    // Tagline
    const taglineElement = document.createElement('div');
    taglineElement.className = 'hero-tagline';
    taglineElement.innerHTML = tagline;

    // Add content to the container
    contentContainer.appendChild(headingsWrapper);
    contentContainer.appendChild(ctaButton);

    // Image container (right side)
    const imageContainer = document.createElement('div');
    imageContainer.className = 'hero-image-container';

    if (heroImage) {
        // Create circular frame for the image
        const circleFrame = document.createElement('div');
        circleFrame.className = 'hero-image-circle';

        // Clone the image to avoid moving it which would remove event listeners
        const clonedImage = heroImage.cloneNode(true);
        circleFrame.appendChild(clonedImage);

        imageContainer.appendChild(circleFrame);
    }

    // Stats bar
    const statsBar = document.createElement('div');
    statsBar.className = 'hero-stats-bar';

    statsItems.forEach(stat => {
        const statItem = document.createElement('div');
        statItem.className = 'hero-stat-item';

        // Split the value part to check for superscript
        const valueParts = stat.value.split(/(\^\d+)/g);

        const statContent = document.createElement('div');
        statContent.className = 'stat-content';

        // Add the label/value content
        let valueHTML = '';
        valueParts.forEach(part => {
            if (part.startsWith('^')) {
                // It's a superscript
                valueHTML += `<sup>${part.substring(1)}</sup>`;
            } else {
                valueHTML += part;
            }
        });

        statContent.innerHTML = `${valueHTML}<div class="stat-label">${stat.label}</div>`;
        statItem.appendChild(statContent);
        statsBar.appendChild(statItem);
    });

    // Assemble the hero banner
    heroElement.appendChild(contentContainer);
    heroElement.appendChild(imageContainer);

    // Create banner wrapper to hold both the banner and stats bar
    const bannerWrapper = document.createElement('div');
    bannerWrapper.className = 'hero-banner-wrapper';
    bannerWrapper.appendChild(heroElement);
    bannerWrapper.appendChild(statsBar);

    // Replace block content with the new structure
    block.textContent = '';
    block.appendChild(bannerWrapper);
}