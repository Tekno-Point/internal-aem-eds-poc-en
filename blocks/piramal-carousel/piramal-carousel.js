/*
 * Piramal Carousel Block
 * Replicates the carousel functionality with smooth transitions and responsive design.
 */

// import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Parse the carousel configuration from the first div
  const configDiv = block.children[0];
  const carouselClasses = configDiv?.textContent.trim() || '';

  // Initialize the carousel container
  const carouselContainer = document.createElement('div');
  carouselContainer.className = `carousel-container ${carouselClasses}`;
  block.append(carouselContainer);

  // Create the panel container for carousel items
  const panelContainer = document.createElement('div');
  panelContainer.className = 'panel-container carousel-inner';
  carouselContainer.append(panelContainer);

  // Process each carousel item
  const itemDivs = Array.from(block.children).slice(1);
  itemDivs.forEach((itemDiv, index) => {
    const item = createCarouselItem(itemDiv, index);
    if (item) {
      panelContainer.append(item);
    }
  });

  // Create navigation buttons
  const prevButton = createNavigationButton('Previous', 'slide-prev', 'Previous Slide');
  const nextButton = createNavigationButton('Next', 'slide-next', 'Next Slide');
  const navigationContainer = document.createElement('div');
  navigationContainer.className = 'carousel-navigation-buttons';
  navigationContainer.append(prevButton, nextButton);
  carouselContainer.append(navigationContainer);

  // Create dot indicators
  const dotContainer = document.createElement('div');
  dotContainer.className = 'button-container';
  itemDivs.forEach((_, index) => {
    const dot = createDotIndicator(index);
    dotContainer.append(dot);
  });
  carouselContainer.append(dotContainer);

  // Initialize carousel functionality
  initializeCarousel(panelContainer, prevButton, nextButton, dotContainer);

  // Clean up original content
  block.innerHTML = '';
  block.append(carouselContainer);

  // Add loaded class for CSS transitions
  setTimeout(() => {
    block.classList.add('loaded');
  }, 100);
}

/**
 * Create a carousel item from the provided div.
 * @param {HTMLElement} itemDiv - The div containing item data.
 * @param {number} index - The index of the item.
 * @returns {HTMLElement|null} The carousel item element or null if invalid.
 */
function createCarouselItem(itemDiv, index) {
  // Parse item fields
  const fields = Array.from(itemDiv.children).map(div => div.textContent.trim());
  if (fields.length < 7) return null;

  const [
    backgroundImage,
    backgroundImageAlt,
    eyebrow,
    title,
    description,
    ctaLink,
    ctaText,
    itemClasses
  ] = fields;

  // Create item structure
  const item = document.createElement('div');
  item.className = `carousel-item ${itemClasses || ''}`;
  item.setAttribute('data-panel', `panel_${index}`);
  item.setAttribute('role', 'tabpanel');
  item.setAttribute('aria-labelledby', `tab_${index}`);
  item.setAttribute('aria-hidden', index !== 0 ? 'true' : 'false');
  item.setAttribute('tabindex', index !== 0 ? '-1' : '0');

  // Background section
  const background = document.createElement('div');
  background.className = 'background';
  item.append(background);

  // Background image
  if (backgroundImage) {
    const picture = createOptimizedPicture(backgroundImage, backgroundImageAlt || 'Carousel background image', false, [{ width: '750' }]);
    const frontPicture = document.createElement('div');
    frontPicture.className = 'front-picture';
    frontPicture.append(picture);
    background.append(frontPicture);
  }

  // Foreground content
  const foreground = document.createElement('div');
  foreground.className = 'foreground';
  background.append(foreground);

  const textContainer = document.createElement('div');
  textContainer.className = 'text';
  foreground.append(textContainer);

  // Eyebrow
  if (eyebrow) {
    const eyebrowDiv = document.createElement('div');
    eyebrowDiv.className = 'eyebrow';
    eyebrowDiv.textContent = eyebrow;
    textContainer.append(eyebrowDiv);
  }

  // Title
  if (title) {
    const titleDiv = document.createElement('div');
    titleDiv.className = 'title';
    titleDiv.innerHTML = title;
    textContainer.append(titleDiv);
  }

  // Description
  if (description) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'long-description';
    descriptionDiv.innerHTML = description;
    textContainer.append(descriptionDiv);
  }

  // CTA Button
  if (ctaLink && ctaText) {
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'cta';
    const ctaButton = document.createElement('a');
    ctaButton.href = ctaLink;
    ctaButton.className = 'button primary';
    ctaButton.textContent = ctaText;
    ctaDiv.append(ctaButton);
    textContainer.append(ctaDiv);
  }

  // Spacer
  const spacer = document.createElement('div');
  spacer.className = 'spacer';
  foreground.append(spacer);

  return item;
}

/**
 * Create a navigation button for the carousel.
 * @param {string} direction - The direction of the button ('Previous' or 'Next').
 * @param {string} className - The CSS class for the button.
 * @param {string} label - The ARIA label for the button.
 * @returns {HTMLElement} The navigation button element.
 */
function createNavigationButton(direction, className, label) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.setAttribute('aria-label', label);
  button.innerHTML = `<div><div></div></div>`;
  button.addEventListener('click', () => navigateCarousel(direction));
  return button;
}

/**
 * Create a dot indicator for the carousel.
 * @param {number} index - The index of the item.
 * @returns {HTMLElement} The dot indicator element.
 */
function createDotIndicator(index) {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = index === 0 ? 'selected' : '';
  dot.setAttribute('title', `Slide ${index + 1}`);
  dot.setAttribute('data-panel', `panel_${index}`);
  dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
  dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
  dot.setAttribute('role', 'tab');
  dot.setAttribute('tabindex', index === 0 ? '0' : '-1');
  dot.setAttribute('id', `tab_${index}`);
  dot.addEventListener('click', () => goToSlide(index));
  return dot;
}

/**
 * Initialize carousel functionality including navigation and accessibility.
 * @param {HTMLElement} panelContainer - The container for carousel panels.
 * @param {HTMLElement} prevButton - The previous navigation button.
 * @param {HTMLElement} nextButton - The next navigation button.
 * @param {HTMLElement} dotContainer - The container for dot indicators.
 */
function initializeCarousel(panelContainer, prevButton, nextButton, dotContainer) {
  const items = panelContainer.children;
  let currentIndex = 0;
  const totalItems = items.length;

  // Update navigation buttons based on current slide
  function updateNavigation() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === totalItems - 1;
  }

  // Update dot indicators based on current slide
  function updateDots() {
    const dots = dotContainer.querySelectorAll('button');
    dots.forEach((dot, index) => {
      const isSelected = index === currentIndex;
      dot.classList.toggle('selected', isSelected);
      dot.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      dot.setAttribute('tabindex', isSelected ? '0' : '-1');
    });
  }

  // Update slide visibility and accessibility attributes
  function updateSlideVisibility() {
    Array.from(items).forEach((item, index) => {
      const isActive = index === currentIndex;
      item.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      item.setAttribute('tabindex', isActive ? '0' : '-1');
      item.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    });
  }

  // Navigate to a specific slide
  window.goToSlide = function (index) {
    if (index < 0 || index >= totalItems) return;
    currentIndex = index;
    updateNavigation();
    updateDots();
    updateSlideVisibility();
  };

  // Navigate to the next or previous slide
  window.navigateCarousel = function (direction) {
    const newIndex = direction === 'Next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0 || newIndex >= totalItems) return;
    goToSlide(newIndex);
  };

  // Keyboard navigation
  panelContainer.addEventListener('keydown', (e) => {
    let newIndex = currentIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      newIndex = Math.min(currentIndex + 1, totalItems - 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      newIndex = Math.max(currentIndex - 1, 0);
    }
    if (newIndex !== currentIndex) {
      goToSlide(newIndex);
      e.preventDefault();
    }
  });

  // Focus management for tabs
  dotContainer.addEventListener('focusin', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const index = Array.from(dotContainer.children).indexOf(e.target);
      goToSlide(index);
    }
  });

  // Initialize state
  updateNavigation();
  updateDots();
  updateSlideVisibility();

  // Auto-initialize move instrumentation
  // moveInstrumentation(itemDiv, item);
}

/**
 * Helper function to create optimized picture elements.
 * @param {string} src - The image source URL.
 * @param {string} alt - The alternative text for the image.
 * @param {boolean} eager - Whether to load the image eagerly.
 * @param {Array} breakpoints - Breakpoint configurations.
 * @returns {HTMLElement} The picture element.
 */
function createOptimizedPicture(src, alt, eager, breakpoints) {
  const url = new URL(src, window.location.href);
  const picture = document.createElement('picture');
  const { pathname } = url;
  const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

  // webp
  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    if (br.media) source.setAttribute('media', br.media);
    source.setAttribute('type', 'image/webp');
    source.setAttribute('srcset', `${pathname}?width=${br.width}&format=webply&optimize=medium`);
    picture.appendChild(source);
  });

  // fallback
  breakpoints.forEach((br, i) => {
    if (i < breakpoints.length - 1) {
      const source = document.createElement('source');
      if (br.media) source.setAttribute('media', br.media);
      source.setAttribute('type', `image/${ext}`);
      source.setAttribute('srcset', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
      picture.appendChild(source);
    } else {
      const img = document.createElement('img');
      img.setAttribute('loading', eager ? 'eager' : 'lazy');
      img.setAttribute('alt', alt);
      picture.appendChild(img);
      img.setAttribute('src', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
    }
  });

  return picture;
}
