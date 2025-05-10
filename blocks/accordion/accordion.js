export default function decorate(block) {
    // Extract configuration fields (first three divs)
    const config = {
        title: block.children[0]?.textContent || '',
        style: block.children[1]?.textContent || 'default',
        allowMultiple: block.children[2]?.textContent === 'true'
    };

    // Remove configuration divs after extraction
    for (let i = 0; i < 3; i++) {
        if (block.children[0]) {
            block.children[0].remove();
        }
    }

    // Add style class if specified
    if (config.style && config.style !== 'default') {
        block.classList.add(config.style.trim());
    }

    // Add data attribute for multiple open behavior
    if (config.allowMultiple) {
        block.setAttribute('data-allow-multiple', 'true');
    }

    // Create wrapper element
    const wrapper = document.createElement('div');
    wrapper.className = 'accordion-wrapper';

    // Add title if provided
    if (config.title) {
        const titleEl = document.createElement('h2');
        titleEl.className = 'accordion-title';
        titleEl.textContent = config.title;
        wrapper.appendChild(titleEl);
    }

    // Create container for accordion items
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'accordion-items';

    // Process each accordion item
    [...block.children].forEach((row, index) => {
        // Each row contains an accordion item
        const itemFields = {
            title: row.children[0]?.textContent || `Item ${index + 1}`,
            content: row.children[1] || document.createElement('div'),
            expanded: row.children[2]?.textContent === 'true'
        };

        // Create details element (native HTML accordion)
        const details = document.createElement('details');
        details.className = 'accordion-item';
        if (itemFields.expanded) {
            details.setAttribute('open', '');
        }

        // Create summary element (clickable header)
        const summary = document.createElement('summary');
        summary.className = 'accordion-item-header';
        summary.textContent = itemFields.title;

        // Create content container
        const content = document.createElement('div');
        content.className = 'accordion-item-content';

        // Move content from original div to new container
        while (itemFields.content.firstChild) {
            content.appendChild(itemFields.content.firstChild);
        }

        // Assemble the accordion item
        details.appendChild(summary);
        details.appendChild(content);
        itemsContainer.appendChild(details);

        // Add click event to handle single-item-open behavior
        if (!config.allowMultiple) {
            summary.addEventListener('click', (e) => {
                // If this item is being closed, don't prevent it
                if (details.hasAttribute('open')) {
                    return;
                }

                // Close all other items
                itemsContainer.querySelectorAll('details[open]').forEach((openItem) => {
                    if (openItem !== details) {
                        openItem.removeAttribute('open');
                    }
                });
            });
        }
    });

    // Replace original content with new structure
    wrapper.appendChild(itemsContainer);
    block.textContent = '';
    block.appendChild(wrapper);

    // Add a11y attributes
    block.setAttribute('role', 'region');
    block.setAttribute('aria-label', config.title || 'Accordion');
}