import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Generates Star Rating HTML
 * @param {number} rating - Rating value (1-5)
 * @param {number} reviewCount - Number of reviews
 * @return {HTMLElement} The star rating element
 */
function createStarRating(rating, reviewCount) {
    const ratingContainer = document.createElement('div');
    ratingContainer.className = 'product-rating';

    const starsWrapper = document.createElement('div');
    starsWrapper.className = 'stars-wrapper';

    // Create the filled stars container
    const filledStars = document.createElement('div');
    filledStars.className = 'stars stars-filled';
    filledStars.style.width = `${(rating / 5) * 100}%`;
    filledStars.setAttribute('aria-hidden', 'true');
    filledStars.innerHTML = '★★★★★';

    // Create the empty stars container
    const emptyStars = document.createElement('div');
    emptyStars.className = 'stars stars-empty';
    emptyStars.setAttribute('aria-hidden', 'true');
    emptyStars.innerHTML = '★★★★★';

    starsWrapper.appendChild(emptyStars);
    starsWrapper.appendChild(filledStars);

    // Add the actual rating for screen readers
    const ratingText = document.createElement('span');
    ratingText.className = 'sr-only';
    ratingText.textContent = `Rated ${rating} out of 5 stars`;

    ratingContainer.appendChild(starsWrapper);
    ratingContainer.appendChild(ratingText);

    // Add review count if provided
    if (reviewCount) {
        const reviews = document.createElement('span');
        reviews.className = 'review-count';
        reviews.textContent = `(${reviewCount} reviews)`;
        ratingContainer.appendChild(reviews);
    }

    return ratingContainer;
}

/**
 * Creates a product badge element
 * @param {string} text - Badge text
 * @param {string} type - Badge type (bestseller, new, sale)
 * @return {HTMLElement} The badge element
 */
function createBadge(text, type = 'default') {
    const badge = document.createElement('span');
    badge.className = `product-badge badge-${type}`;
    badge.textContent = text;
    return badge;
}

/**
 * Creates a features list from newline-separated text
 * @param {string} featuresText - Features separated by newlines
 * @return {HTMLElement} The features list element
 */
function createFeaturesList(featuresText) {
    const features = featuresText.split('\n').filter(feature => feature.trim());
    if (features.length === 0) return null;

    const featuresList = document.createElement('ul');
    featuresList.className = 'product-features';

    features.forEach(feature => {
        const item = document.createElement('li');
        item.textContent = feature.trim();
        featuresList.appendChild(item);
    });

    return featuresList;
}

export default function decorate(block) {
    // Extract data from the block children (sequential divs)
    const productTitle = block.children[0]?.textContent || '';
    const productDescription = block.children[1]?.textContent || '';
    const productImageDiv = block.children[2];
    const productPrice = block.children[3]?.textContent || '';
    const productSku = block.children[4]?.textContent || '';
    const productRating = parseFloat(block.children[5]?.textContent || '0');
    const productReviews = block.children[6]?.textContent || '';
    const inStock = block.children[7]?.textContent?.toLowerCase() === 'true';
    const ctaLinkDiv = block.children[8];
    const ctaText = block.children[9]?.textContent || 'Add to Cart';
    const productStyleDiv = block.children[10];
    const additionalFeatures = block.children[11]?.textContent || '';

    // Parse style selections
    const productStyles = productStyleDiv?.textContent?.split(', ') || [];
    const layoutStyle = productStyles.find(style => style.startsWith('layout-')) || 'layout-standard';
    const themeStyle = productStyles.find(style => style.startsWith('theme-')) || 'theme-light';
    const hasFeature = (feature) => productStyles.includes(feature);

    // Clear the block and create a new structure
    block.textContent = '';
    block.classList.add(layoutStyle, themeStyle);

    if (hasFeature('feature-high-contrast')) {
        block.classList.add('high-contrast');
    }

    // Create container
    const productContainer = document.createElement('div');
    productContainer.className = 'product-container';

    // Create media section (image and badges)
    const mediaSection = document.createElement('div');
    mediaSection.className = 'product-media';

    // Process and add the product image
    if (productImageDiv && productImageDiv.querySelector('picture')) {
        const picture = productImageDiv.querySelector('picture');
        const img = picture.querySelector('img');
        const optimizedPicture = createOptimizedPicture(img.src, productTitle, false, [
            { width: '800' },
            { width: '600' },
            { width: '400' }
        ]);
        mediaSection.appendChild(optimizedPicture);

        // Add quick view if enabled
        if (hasFeature('feature-quickview')) {
            const quickViewBtn = document.createElement('button');
            quickViewBtn.className = 'quick-view-button';
            quickViewBtn.setAttribute('aria-label', 'Quick view');
            quickViewBtn.innerHTML = '<span>Quick View</span>';
            quickViewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // In a real implementation, this would open a modal with product details
                const event = new CustomEvent('product:quickview', {
                    bubbles: true,
                    detail: { sku: productSku }
                });
                block.dispatchEvent(event);
            });
            mediaSection.appendChild(quickViewBtn);
        }
    }

    // Add badges if enabled
    if (hasFeature('feature-badges')) {
        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'product-badges';

        // Example logic for badge display - in real world this would be from metadata
        if (!inStock) {
            badgesContainer.appendChild(createBadge('Out of Stock', 'out-of-stock'));
        } else if (parseFloat(productPrice.replace(/[^0-9.]/g, '')) > 100) {
            badgesContainer.appendChild(createBadge('Premium', 'premium'));
        }

        if (badgesContainer.children.length > 0) {
            mediaSection.appendChild(badgesContainer);
        }
    }

    // Create info section
    const infoSection = document.createElement('div');
    infoSection.className = 'product-info';

    // Add product title
    const titleElement = document.createElement('h2');
    titleElement.className = 'product-title';
    titleElement.textContent = productTitle;
    infoSection.appendChild(titleElement);

    // Add SKU
    const skuElement = document.createElement('div');
    skuElement.className = 'product-sku';
    skuElement.textContent = `SKU: ${productSku}`;
    infoSection.appendChild(skuElement);

    // Add rating if available
    if (productRating > 0) {
        const ratingElement = createStarRating(productRating, productReviews);
        infoSection.appendChild(ratingElement);
    }

    // Add price
    const priceElement = document.createElement('div');
    priceElement.className = 'product-price';
    priceElement.textContent = productPrice;
    infoSection.appendChild(priceElement);

    // Add availability
    const availabilityElement = document.createElement('div');
    availabilityElement.className = `product-availability ${inStock ? 'in-stock' : 'out-of-stock'}`;
    availabilityElement.textContent = inStock ? 'In Stock' : 'Out of Stock';
    infoSection.appendChild(availabilityElement);

    // Add description
    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'product-description';
    descriptionElement.textContent = productDescription;
    infoSection.appendChild(descriptionElement);

    // Add features list if provided
    const featuresElement = createFeaturesList(additionalFeatures);
    if (featuresElement) {
        infoSection.appendChild(featuresElement);
    }

    // Add CTA
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'product-actions';

    // Process and add CTA button
    if (ctaLinkDiv && ctaLinkDiv.querySelector('a')) {
        const ctaLink = ctaLinkDiv.querySelector('a').cloneNode(true);
        ctaLink.className = 'product-cta';
        ctaLink.textContent = ctaText;

        if (!inStock) {
            ctaLink.classList.add('disabled');
            ctaLink.setAttribute('aria-disabled', 'true');
        }

        ctaContainer.appendChild(ctaLink);
    }

    // Add compare button if enabled
    if (hasFeature('feature-compare')) {
        const compareBtn = document.createElement('button');
        compareBtn.className = 'compare-button';
        compareBtn.textContent = 'Compare';
        compareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real implementation, this would add the product to a comparison list
            const event = new CustomEvent('product:compare', {
                bubbles: true,
                detail: { sku: productSku }
            });
            block.dispatchEvent(event);
        });
        ctaContainer.appendChild(compareBtn);
    }

    infoSection.appendChild(ctaContainer);

    // Assemble the product container
    productContainer.appendChild(mediaSection);
    productContainer.appendChild(infoSection);

    // Add the container to the block
    block.appendChild(productContainer);

    // Add layout-specific logic if needed
    if (layoutStyle === 'layout-compact') {
        // Compact layout might hide the description by default with a "Show more" toggle
        if (productDescription.length > 150) {
            const showMoreBtn = document.createElement('button');
            showMoreBtn.className = 'show-more-button';
            showMoreBtn.textContent = 'Show more details';
            showMoreBtn.addEventListener('click', () => {
                descriptionElement.classList.toggle('expanded');
                showMoreBtn.textContent = descriptionElement.classList.contains('expanded')
                    ? 'Show less details'
                    : 'Show more details';
            });
            infoSection.insertBefore(showMoreBtn, ctaContainer);
        }
    }
}