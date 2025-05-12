export default function decorate(block) {
    // Extract content from the block divs based on component-models.json field order
    const icon = block.children[0]?.querySelector('img');
    const title = block.children[1]?.textContent || '';
    const description = block.children[2]?.innerHTML || '';
    const badge = block.children[3]?.textContent || '';
    const badgeColor = block.children[4]?.textContent || '#E31837';
    const link = block.children[5]?.querySelector('a')?.href || '#';
    const borderColor = block.children[6]?.textContent || '#E5E5E5';
    const backgroundColor = block.children[7]?.textContent || '#FFFFFF';

    // Clear block content
    block.innerHTML = '';

    // Create card container
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.borderColor = borderColor;
    card.style.backgroundColor = backgroundColor;

    // Create card link wrapper
    const cardLink = document.createElement('a');
    cardLink.href = link;
    cardLink.className = 'product-card-link';

    // Add badge if provided
    if (badge) {
        const badgeEl = document.createElement('div');
        badgeEl.className = 'product-card-badge';
        badgeEl.textContent = badge;
        badgeEl.style.backgroundColor = badgeColor;
        cardLink.appendChild(badgeEl);
    }

    // Add icon container
    const iconContainer = document.createElement('div');
    iconContainer.className = 'product-card-icon';
    if (icon) {
        iconContainer.appendChild(icon.cloneNode(true));
    }
    cardLink.appendChild(iconContainer);

    // Add title
    const titleEl = document.createElement('h3');
    titleEl.className = 'product-card-title';
    titleEl.textContent = title;
    cardLink.appendChild(titleEl);

    // Add description
    const descEl = document.createElement('div');
    descEl.className = 'product-card-description';
    descEl.innerHTML = description;
    cardLink.appendChild(descEl);

    // Add link to card
    card.appendChild(cardLink);

    // Add card to block
    block.appendChild(card);
}