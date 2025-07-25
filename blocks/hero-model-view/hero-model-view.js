
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    // Parse configuration fields from the first few divs
    const backgroundImage = block.children[0]?.querySelector('picture') || block.children[0]?.querySelector('img')?.src || '';
    const backgroundImageAlt = block.children[1]?.textContent?.trim() || 'Hero background image';
    const backgroundStyle = block.children[2]?.textContent?.trim() || 'cover';
    const contentAlignment = block.children[3]?.textContent?.trim() || 'center';
    const contentWidth = block.children[4]?.textContent?.trim() || 'narrow';
    const animation = block.children[5]?.textContent?.trim() || 'fade-in';
    const overlayColor = block.children[6]?.textContent?.trim() || '';
    const overlayOpacity = parseFloat(block.children[7]?.textContent?.trim() || '0.5');

    // Get content item divs (excluding configuration)
    const contentDivs = Array.from(block.children).slice(8);

    // Parse content items
    const contentItems = contentDivs.map((contentDiv) => {
        return {
            content: contentDiv.children[0]?.innerHTML?.trim() || '',
            ctaButton: contentDiv.children[1]?.querySelector('a')?.href || '',
            ctaButtonText: contentDiv.children[2]?.textContent?.trim() || '',
            ctaButtonStyle: contentDiv.children[3]?.textContent?.trim() || 'primary'
        };
    }).filter(item => item.content || item.ctaButtonText);

    // If no content items, exit early
    if (contentItems.length === 0) {
        block.innerHTML = '<p>No hero content provided</p>';
        return;
    }

    // Create hero structure
    const heroWrapper = document.createElement('div');
    heroWrapper.className = `hero-model-view-wrapper hero-model-view-wrapper--${backgroundStyle} hero-model-view-wrapper--align-${contentAlignment} hero-model-view-wrapper--width-${contentWidth}`;

    const heroBackground = document.createElement('div');
    heroBackground.className = 'hero-model-view-background';

    // Create background image
    if (backgroundImage) {
        const picture = createOptimizedPicture(
            backgroundImage,
            backgroundImageAlt,
            true,
            [
                { media: '(min-width: 1200px)', width: '1920' },
                { media: '(min-width: 768px)', width: '1200' },
                { width: '768' }
            ]
        );
        heroBackground.appendChild(picture);
    }

    // Create overlay
    if (overlayColor || overlayOpacity > 0) {
        const overlay = document.createElement('div');
        overlay.className = 'hero-model-view-overlay';
        if (overlayColor) overlay.style.backgroundColor = overlayColor;
        if (overlayOpacity) overlay.style.opacity = overlayOpacity;
        heroBackground.appendChild(overlay);
    }

    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'hero-model-view-content';

    // Create content items
    contentItems.forEach((item, index) => {
        const contentItem = document.createElement('div');
        contentItem.className = `hero-model-view-item hero-model-view-item--${index}`;

        // Create content
        if (item.content) {
            const content = document.createElement('div');
            content.className = 'hero-model-view-text';
            content.innerHTML = item.content;
            contentItem.appendChild(content);
        }

        // Create CTA button
        if (item.ctaButtonText && item.ctaButton) {
            const button = document.createElement('a');
            button.href = item.ctaButton;
            button.className = `hero-model-view-button hero-model-view-button--${item.ctaButtonStyle}`;
            button.textContent = item.ctaButtonText;
            button.setAttribute('role', 'button');
            button.setAttribute('aria-label', `${item.ctaButtonText} - Call to action`);
            contentItem.appendChild(button);
        }

        contentContainer.appendChild(contentItem);
    });

    heroWrapper.appendChild(heroBackground);
    heroWrapper.appendChild(contentContainer);
    block.innerHTML = '';
    block.appendChild(heroWrapper);

    // Move instrumentation data
    moveInstrumentation(block, heroWrapper);

    // Add animation class
    if (animation && animation !== 'none') {
        heroWrapper.classList.add(`hero-model-view--animate-${animation}`);
        setTimeout(() => {
            heroWrapper.classList.add('hero-model-view--animated');
        }, 100);
    } else {
        heroWrapper.classList.add('hero-model-view--animated');
    }

    // Handle background behavior
    if (backgroundStyle === 'parallax') {
        addParallaxBehavior(heroBackground);
    } else if (backgroundStyle === 'fixed') {
        heroBackground.classList.add('hero-model-view-background--fixed');
    }

    // Handle accessibility
    contentContainer.setAttribute('role', 'region');
    contentContainer.setAttribute('aria-label', 'Hero section content');
    Array.from(contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach((heading) => {
        heading.setAttribute('aria-level', parseInt(heading.tagName.charAt(1), 10));
    });

    // Handle intersection observer for animation triggers
    if (animation && animation !== 'none') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('hero-model-view--animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(heroWrapper);
    }
}

function addParallaxBehavior(background) {
    const parallaxSpeed = 0.3;
    let scrollPosition = 0;

    window.addEventListener('scroll', () => {
        scrollPosition = window.pageYOffset;
        const offset = scrollPosition * parallaxSpeed;
        background.style.transform = `translateY(${offset}px)`;
    });
}
