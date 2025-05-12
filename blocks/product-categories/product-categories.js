export default function decorate(block) {
    // Extract content from the block
    const sectionTitle = block.children[0]?.textContent || 'Popular Categories';
    const layout = block.children[1]?.textContent || 'grid';

    // Remove the config rows to get just the category items
    const configRows = 2; // section title and layout
    const categoryItems = Array.from(block.children).slice(configRows);

    // Create the categories container
    const categoriesContainer = document.createElement('div');
    categoriesContainer.className = 'categories-container';

    // Create the section header
    const header = document.createElement('h2');
    header.className = 'categories-section-title';
    header.textContent = sectionTitle;
    categoriesContainer.appendChild(header);

    // Create the categories grid/carousel
    const categoriesGrid = document.createElement('div');

    categoriesGrid.className = `categories-$ {
        layout
    }

    `;

    // Process each category
    categoryItems.forEach(item => {
        const title = item.children[0]?.textContent || '';
        const description = item.children[1]?.textContent || '';
        const icon = item.children[2]?.querySelector('img');
        const link = item.children[3]?.querySelector('a')?.href || '#';
        const badge = item.children[4]?.textContent || '';

        // Create category card
        const card = document.createElement('div');
        card.className = 'category-card';

        // Badge
        if (badge && badge !== 'None') {
            const badgeElement = document.createElement('span');

            badgeElement.className = `category-badge $ {
                    badge.toLowerCase().replace(' ', '-')
                }

                `;
            badgeElement.textContent = badge.toUpperCase();
            card.appendChild(badgeElement);
        }

        // Icon container
        const iconContainer = document.createElement('div');
        iconContainer.className = 'category-icon';

        if (icon) {
            iconContainer.appendChild(icon.cloneNode(true));
        }

        // Title
        const titleElement = document.createElement('h3');
        titleElement.className = 'category-title';
        titleElement.textContent = title;

        // Description
        const descElement = document.createElement('div');
        descElement.className = 'category-description';
        descElement.innerHTML = description;

        // Link the entire card
        const cardLink = document.createElement('a');
        cardLink.href = link;
        cardLink.className = 'category-link';
        cardLink.appendChild(iconContainer);
        cardLink.appendChild(titleElement);
        cardLink.appendChild(descElement);

        card.appendChild(cardLink);
        categoriesGrid.appendChild(card);
    });

    categoriesContainer.appendChild(categoriesGrid);

    // Handle carousel initialization if needed
    if (layout === 'carousel') {
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-control prev';
        prevButton.innerHTML = '&lsaquo;';
        prevButton.setAttribute('aria-label', 'Previous categories');

        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-control next';
        nextButton.innerHTML = '&rsaquo;';
        nextButton.setAttribute('aria-label', 'Next categories');

        const carouselControls = document.createElement('div');
        carouselControls.className = 'carousel-controls';
        carouselControls.appendChild(prevButton);
        carouselControls.appendChild(nextButton);

        categoriesContainer.appendChild(carouselControls);

        // Add carousel functionality
        let currentPosition = 0;
        const itemWidth = 280; // width + margin of each card

        const updateCarousel = () => {
            const maxPosition = Math.max(0, categoriesGrid.children.length - Math.floor(categoriesGrid.offsetWidth / itemWidth));
            currentPosition = Math.max(0, Math.min(currentPosition, maxPosition));

            categoriesGrid.style.transform = `translateX(-$ {
                    currentPosition * itemWidth
                }

                px)`;

            // Update button states
            prevButton.disabled = currentPosition === 0;
            nextButton.disabled = currentPosition >= maxPosition;
        }

            ;

        prevButton.addEventListener('click', () => {
            currentPosition -= 1;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentPosition += 1;
            updateCarousel();
        });

        // Initialize carousel
        window.addEventListener('load', updateCarousel);
        window.addEventListener('resize', updateCarousel);
    }

    // Replace block content with the new structure
    block.textContent = '';
    block.appendChild(categoriesContainer);
}