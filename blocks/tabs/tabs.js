export default function decorate(block) {
    // Extract configuration fields from the first two divs
    const tabsStyle = block.children[0]?.textContent.trim() || 'orange-active divider-lines';
    const defaultActiveTab = parseInt(block.children[1]?.textContent.trim() || '1', 10);

    // Remove the configuration divs
    if (block.children[0]) block.children[0].remove();
    if (block.children[0]) block.children[0].remove(); // Now the first element is removed, so the second is now first

    // Create tabs container elements
    const tabsNav = document.createElement('div');
    tabsNav.className = 'tabs-nav';

    const tabsContent = document.createElement('div');
    tabsContent.className = 'tabs-content';

    // Apply styling classes to the block
    block.classList.add(...tabsStyle.split(' ').filter(cls => cls));

    // Process each tab item
    const tabItems = Array.from(block.children);

    tabItems.forEach((tabItem, index) => {
        const tabPosition = index + 1;
        const isDefaultActive = tabPosition === defaultActiveTab;

        // Extract tab data from the divs
        const tabLabel = tabItem.querySelector(':scope > div:nth-child(1)')?.textContent.trim() || `Tab ${tabPosition}`;
        const tabId = tabItem.querySelector(':scope > div:nth-child(2)')?.textContent.trim() || `tab-${tabPosition}`;

        // Create tab navigation button
        const tabButton = document.createElement('button');
        tabButton.className = 'tab-button';
        tabButton.setAttribute('role', 'tab');
        tabButton.setAttribute('aria-selected', isDefaultActive ? 'true' : 'false');
        tabButton.setAttribute('aria-controls', tabId);
        tabButton.id = `tab-button-${tabId}`;
        tabButton.textContent = tabLabel;

        if (isDefaultActive) {
            tabButton.classList.add('active');
        }

        // Create tab content panel
        const tabPanel = document.createElement('div');
        tabPanel.className = 'tab-panel';
        tabPanel.id = tabId;
        tabPanel.setAttribute('role', 'tabpanel');
        tabPanel.setAttribute('aria-labelledby', `tab-button-${tabId}`);

        if (isDefaultActive) {
            tabPanel.classList.add('active');
        } else {
            tabPanel.setAttribute('hidden', '');
        }

        // Extract and move remaining tab content
        const tabImage = tabItem.querySelector(':scope > div:nth-child(3)');
        const mainHeading = tabItem.querySelector(':scope > div:nth-child(4)')?.textContent.trim() || '';
        const headingEmphasis = tabItem.querySelector(':scope > div:nth-child(5)')?.textContent.trim() || '';
        const description = tabItem.querySelector(':scope > div:nth-child(6)')?.textContent.trim() || '';

        // Create tab content structure
        const tabContentWrapper = document.createElement('div');
        tabContentWrapper.className = 'tab-content-wrapper';

        // Handle the image if present
        if (tabImage && tabImage.querySelector('picture')) {
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'tab-image';
            imageWrapper.appendChild(tabImage.querySelector('picture').cloneNode(true));
            tabContentWrapper.appendChild(imageWrapper);
        }

        // Create content area
        const contentArea = document.createElement('div');
        contentArea.className = 'tab-content-area';

        // Add heading with emphasis
        if (mainHeading) {
            const heading = document.createElement('h2');
            heading.className = 'tab-heading';

            if (headingEmphasis && mainHeading.includes(headingEmphasis)) {
                // Split the heading and wrap the emphasis part in a span
                const parts = mainHeading.split(headingEmphasis);
                heading.innerHTML = `${parts[0]}<strong>${headingEmphasis}</strong>${parts[1] || ''}`;
            } else {
                heading.textContent = mainHeading;
            }

            contentArea.appendChild(heading);
        }

        // Add description
        if (description) {
            const descPara = document.createElement('p');
            descPara.className = 'tab-description';
            descPara.textContent = description;
            contentArea.appendChild(descPara);
        }

        // Extract feature cards from the remaining content
        const featureCards = Array.from(tabItem.children).slice(6);
        if (featureCards.length > 0) {
            const featuresGrid = document.createElement('div');
            featuresGrid.className = 'features-grid';

            featureCards.forEach(card => {
                const featureTitle = card.querySelector(':scope > div:nth-child(1)')?.textContent.trim() || '';
                const featureDescription = card.querySelector(':scope > div:nth-child(2)')?.textContent.trim() || '';
                const iconType = card.querySelector(':scope > div:nth-child(3)')?.textContent.trim() || 'chart';
                const customIcon = card.querySelector(':scope > div:nth-child(4) picture');

                const featureCard = document.createElement('div');
                featureCard.className = 'feature-card';

                // Create icon
                const iconDiv = document.createElement('div');
                iconDiv.className = 'feature-icon';

                if (iconType === 'custom' && customIcon) {
                    iconDiv.appendChild(customIcon.cloneNode(true));
                } else {
                    iconDiv.classList.add(`icon-${iconType}`);
                    // Add SVG icon based on type
                    const iconSVG = getIconSVG(iconType);
                    iconDiv.innerHTML = iconSVG;
                }

                // Create feature content
                const featureContent = document.createElement('div');
                featureContent.className = 'feature-content';

                if (featureTitle) {
                    const titleElem = document.createElement('h3');
                    titleElem.className = 'feature-title';
                    titleElem.textContent = featureTitle;
                    featureContent.appendChild(titleElem);
                }

                if (featureDescription) {
                    const descElem = document.createElement('p');
                    descElem.className = 'feature-description';
                    descElem.textContent = featureDescription;
                    featureContent.appendChild(descElem);
                }

                featureCard.appendChild(iconDiv);
                featureCard.appendChild(featureContent);
                featuresGrid.appendChild(featureCard);
            });

            contentArea.appendChild(featuresGrid);
        }

        tabContentWrapper.appendChild(contentArea);
        tabPanel.appendChild(tabContentWrapper);

        // Add to the containers
        tabsNav.appendChild(tabButton);
        tabsContent.appendChild(tabPanel);

        // Add click event to the tab button
        tabButton.addEventListener('click', () => {
            // Deactivate all tabs
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });

            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('active');
                panel.setAttribute('hidden', '');
            });

            // Activate this tab
            tabButton.classList.add('active');
            tabButton.setAttribute('aria-selected', 'true');
            tabPanel.classList.add('active');
            tabPanel.removeAttribute('hidden');
        });
    });

    // Add separator elements for divider-lines style
    if (tabsStyle.includes('divider-lines')) {
        const tabButtons = tabsNav.querySelectorAll('.tab-button');
        // Insert dividers between buttons
        for (let i = 0; i < tabButtons.length - 1; i++) {
            const divider = document.createElement('span');
            divider.className = 'tab-divider';
            divider.textContent = '|';
            tabsNav.insertBefore(divider, tabButtons[i + 1]);
        }
    }

    // Set role for tab navigation
    tabsNav.setAttribute('role', 'tablist');

    // Clear block and append new structure
    block.innerHTML = '';
    block.appendChild(tabsNav);
    block.appendChild(tabsContent);

    // Add keyboard navigation
    setupKeyboardNavigation(block);
}

// Function to handle keyboard navigation
function setupKeyboardNavigation(block) {
    const tabButtons = block.querySelectorAll('.tab-button');

    tabButtons.forEach((tab, index) => {
        tab.addEventListener('keydown', (e) => {
            // Left/right arrow keys to navigate between tabs
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const direction = e.key === 'ArrowRight' ? 1 : -1;
                let newIndex = index + direction;

                // Handle wrapping around
                if (newIndex < 0) newIndex = tabButtons.length - 1;
                if (newIndex >= tabButtons.length) newIndex = 0;

                // Focus and click the new tab
                tabButtons[newIndex].focus();
                tabButtons[newIndex].click();
            }

            // Home key goes to first tab
            if (e.key === 'Home') {
                e.preventDefault();
                tabButtons[0].focus();
                tabButtons[0].click();
            }

            // End key goes to last tab
            if (e.key === 'End') {
                e.preventDefault();
                tabButtons[tabButtons.length - 1].focus();
                tabButtons[tabButtons.length - 1].click();
            }
        });
    });
}

// Helper function to return SVG markup for icons
function getIconSVG(iconType) {
    const iconColors = {
        primary: '#F15A22', // Orange color from the design
        secondary: '#555555'
    };

    switch (iconType) {
        case 'chart':
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="${iconColors.primary}"><path d="M3 3v17a1 1 0 0 0 1 1h17v-2H5V3H3z"/><path d="M15.293 14.707a.999.999 0 0 0 1.414 0l5-5-1.414-1.414L16 12.586l-2.293-2.293a.999.999 0 0 0-1.414 0l-5 5 1.414 1.414L13 12.414l2.293 2.293z"/></svg>`;
        case 'click':
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="${iconColors.primary}"><path d="M11.29 15.71a.996.996 0 0 0 1.41 0 .996.996 0 0 0 0-1.41l-1.88-1.88c.55-.91.89-1.98.89-3.12 0-3.31-2.69-6-6-6S0 6 0 9.3s2.69 6 6 6c1.14 0 2.21-.33 3.12-.89l1.88 1.88c.19.19.44.29.7.29.26.01.51-.09.7-.29zM6 13.3c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><path d="M19 17h-2v-6h-4V9h4c1.1 0 2 .9 2 2v6zm-4-2h4v2h-4z"/></svg>`;
        case 'trade':
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="${iconColors.primary}"><path d="M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z"/></svg>`;
        case 'fund':
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="${iconColors.primary}"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12.68 7.76a2.007 2.007 0 0 0-1.33-.76c-1.1-.1-2.05.65-2.25 1.75-.43 2.47 2.15 2.88 2.25 4.25.1 1.43-1.9 1.83-2.35-.27a.65.65 0 0 0-1.25.33c.42 2.33 2.75 2.65 3.65 2.15s1.2-1.49 1.2-2.18c0-1.83-1.84-2.37-2.25-3.25-.4-.88.5-1.68 1.25-1.15a.67.67 0 0 0 1.08-.87z"/></svg>`;
        default:
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="${iconColors.primary}"><circle cx="12" cy="12" r="10"/></svg>`;
    }
}