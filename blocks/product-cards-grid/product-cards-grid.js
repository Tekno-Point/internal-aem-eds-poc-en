/**
 * Product Cards Grid Component
 * Renders a grid of product cards with configurable layout
 */
export default function decorate(block) {
    // Extract content from the block divs based on component-models.json field order
    const layout = block.children[0]?.textContent.trim() || 'six-columns';
    const gap = parseInt(block.children[1]?.textContent.trim() || '16', 10);

    // The rest of the children are product cards (from multifield)
    const productCardBlocks = Array.from(block.children).slice(2);

    // Clear block content
    block.innerHTML = '';

    // Add EDS styling class
    block.classList.add('eds-component', 'eds-product-cards-grid');
    block.classList.add(`eds-product-cards-grid--${layout}`);

    // Create grid container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'eds-product-cards-grid__container';
    gridContainer.style.gap = `${gap}px`;
    gridContainer.setAttribute('data-component', 'product-cards-grid');
    gridContainer.setAttribute('data-layout', layout);

    // Process each product card
    productCardBlocks.forEach((cardBlock) => {
        // Create card wrapper
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'eds-product-cards-grid__item';

        // Extract product card data
        const icon = cardBlock.querySelector('.product-card-icon img');
        const title = cardBlock.querySelector('.product-card-title')?.textContent.trim() || '';
        const description = cardBlock.querySelector('.product-card-description')?.innerHTML || '';
        const badge = cardBlock.querySelector('.product-card-badge')?.textContent.trim() || '';
        const badgeColor = cardBlock.querySelector('.product-card-badge')?.style.backgroundColor || '#E31837';
        const link = cardBlock.querySelector('a')?.href || '#';
        const borderColor = cardBlock.style.borderColor || '#E5E5E5';
        const backgroundColor = cardBlock.style.backgroundColor || '#FFFFFF';

        // Create card container
        const card = document.createElement('div');
        card.className = 'eds-product-card__container';
        card.style.borderColor = borderColor;
        card.style.backgroundColor = backgroundColor;

        // Create card link wrapper
        const cardLink = document.createElement('a');
        cardLink.href = link;
        cardLink.className = 'eds-product-card__link';
        cardLink.setAttribute('aria-label', `Learn more about ${title}`);

        // Add badge if provided
        if (badge) {
            const badgeEl = document.createElement('div');
            badgeEl.className = 'eds-product-card__badge';
            badgeEl.textContent = badge;
            badgeEl.style.backgroundColor = badgeColor;
            cardLink.appendChild(badgeEl);
        }

        // Add icon container
        const iconContainer = document.createElement('div');
        iconContainer.className = 'eds-product-card__icon';
        if (icon) {
            const iconImg = icon.cloneNode(true);
            iconImg.setAttribute('alt', iconImg.getAttribute('alt') || `${title} icon`);
            iconContainer.appendChild(iconImg);
        }
        cardLink.appendChild(iconContainer);

        // Add title
        const titleEl = document.createElement('h3');
        titleEl.className = 'eds-product-card__title';
        titleEl.textContent = title;
        cardLink.appendChild(titleEl);

        // Add description
        const descEl = document.createElement('div');
        descEl.className = 'eds-product-card__description';
        descEl.innerHTML = description;
        cardLink.appendChild(descEl);

        // Add link to card
        card.appendChild(cardLink);

        // Add card to wrapper
        cardWrapper.appendChild(card);

        // Add wrapper to grid
        gridContainer.appendChild(cardWrapper);
    });

    // Add grid to block
    block.appendChild(gridContainer);

    // Add accessibility attributes
    block.setAttribute('role', 'region');
    block.setAttribute('aria-label', 'Product categories');

    // If the grid is empty, add a placeholder message
    if (productCardBlocks.length === 0) {
        const placeholder = document.createElement('div');
        placeholder.className = 'eds-product-cards-grid__placeholder';
        placeholder.textContent = 'No product cards available';
        block.appendChild(placeholder);
    }
}