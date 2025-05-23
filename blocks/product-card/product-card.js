/**
 * Product Card Component
 * Renders a single product card with customizable fields
 */
export default function decorate(block) {
  // Extract content from the block divs based on component-models.json field order
  const icon = block.children[0]?.querySelector('img');
  const title = block.children[1]?.textContent.trim() || '';
  const description = block.children[2]?.innerHTML || '';
  const badge = block.children[3]?.textContent.trim() || '';
  const badgeColor = block.children[4]?.textContent.trim() || '#E31837';
  const link = block.children[5]?.querySelector('a')?.href || '#';
  const borderColor = block.children[6]?.textContent.trim() || '#E5E5E5';
  const backgroundColor = block.children[7]?.textContent.trim() || '#FFFFFF';

  // Clear block content
  block.innerHTML = '';
  
  // Add EDS styling class
  block.classList.add('eds-component', 'eds-product-card');

  // Create card container
  const card = document.createElement('div');
  card.className = 'eds-product-card__container';
  card.setAttribute('data-component', 'product-card');
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

  // Add card to block
  block.appendChild(card);

  // Add accessibility attributes
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Product information');
}