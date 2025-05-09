export default function decorate(block) {
    if( !window.location.hostname.includes('author')){
    // Extract banner slider configuration from data attributes
    const autoplay = block.dataset.autoplay === 'true';
    const autoplaySpeed = parseInt(block.dataset.autoplaySpeed, 10) || 5000;
    const showArrows = block.dataset.showArrows !== 'false';
    const showDots = block.dataset.showDots !== 'false';
    const height = parseInt(block.dataset.height, 10) || 500;
    
    // Create slider container
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'banner-slider-container';
    sliderContainer.style.height = `${height}px`;
    
    // Create slides wrapper
    const slidesWrapper = document.createElement('div');
    slidesWrapper.className = 'banner-slider-slides';
    
    // Process each slide
    [...block.children].forEach((row, index) => {
      const slide = document.createElement('div');
      slide.className = 'banner-slide';
      slide.dataset.index = index;
      
      if (index === 0) {
        slide.classList.add('active');
      }
      
      // Extract slide content
      const imageContainer = row.querySelector('[class*="image"]');
      const headingContainer = row.querySelector('[class*="heading"]');
      const descriptionContainer = row.querySelector('[class*="description"]');
      const buttonContainer = row.querySelector('[class*="button"]');
      
      // Create background image
      if (imageContainer) {
        const img = imageContainer.querySelector('img');
        if (img) {
          slide.style.backgroundImage = `url(${img.src})`;
          slide.style.backgroundSize = 'cover';
          slide.style.backgroundPosition = 'center';
        }
      }
      
      // Create content container
      const contentContainer = document.createElement('div');
      contentContainer.className = 'banner-slide-content';
      
      // Apply text position
      const textPosition = row.dataset.textPosition || 'middle';
      contentContainer.classList.add(`position-${textPosition}`);
      
      // Apply text alignment
      const textAlignment = row.dataset.textAlignment || 'center';
      contentContainer.classList.add(`align-${textAlignment}`);
      
      // Apply color scheme
      const colorScheme = row.dataset.textColorScheme || 'light';
      contentContainer.classList.add(`color-${colorScheme}`);
      
      // Add heading
      if (headingContainer) {
        const headingText = headingContainer.textContent.trim();
        const headingLevel = row.dataset.headingLevel || 'h2';
        const heading = document.createElement(headingLevel);
        heading.className = 'banner-slide-heading';
        heading.textContent = headingText;
        contentContainer.appendChild(heading);
      }
      
      // Add description
      if (descriptionContainer) {
        const description = document.createElement('div');
        description.className = 'banner-slide-description';
        description.innerHTML = descriptionContainer.innerHTML;
        contentContainer.appendChild(description);
      }
      
      // Add button
      if (buttonContainer) {
        const button = document.createElement('div');
        button.className = 'banner-slide-button';
        
        const link = buttonContainer.querySelector('a');
        if (link) {
          button.appendChild(link.cloneNode(true));
        }
        
        contentContainer.appendChild(button);
      }
      
      slide.appendChild(contentContainer);
      slidesWrapper.appendChild(slide);
    });
    
    sliderContainer.appendChild(slidesWrapper);
    
    // Create navigation arrows
    if (showArrows && slidesWrapper.children.length > 1) {
      const prevArrow = document.createElement('button');
      prevArrow.className = 'banner-slider-arrow banner-slider-prev';
      prevArrow.innerHTML = '&lt;';
      prevArrow.addEventListener('click', () => navigateSlider('prev'));
      
      const nextArrow = document.createElement('button');
      nextArrow.className = 'banner-slider-arrow banner-slider-next';
      nextArrow.innerHTML = '&gt;';
      nextArrow.addEventListener('click', () => navigateSlider('next'));
      
      sliderContainer.appendChild(prevArrow);
      sliderContainer.appendChild(nextArrow);
    }
    
    // Create navigation dots
    if (showDots && slidesWrapper.children.length > 1) {
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'banner-slider-dots';
      
      for (let i = 0; i < slidesWrapper.children.length; i += 1) {
        const dot = document.createElement('button');
        dot.className = 'banner-slider-dot';
        if (i === 0) {
          dot.classList.add('active');
        }
        dot.dataset.index = i;
        dot.addEventListener('click', (e) => {
          const targetIndex = parseInt(e.target.dataset.index, 10);
          goToSlide(targetIndex);
        });
        
        dotsContainer.appendChild(dot);
      }
      
      sliderContainer.appendChild(dotsContainer);
    }
    
    // Replace original content with new slider
    block.textContent = '';
    block.appendChild(sliderContainer);
    
    // Slider navigation functions
    let currentSlide = 0;
    let autoplayInterval;
    
    function goToSlide(index) {
      // Hide current slide
      const slides = slidesWrapper.querySelectorAll('.banner-slide');
      slides[currentSlide].classList.remove('active');
      
      // Update dots
      if (showDots) {
        const dots = sliderContainer.querySelectorAll('.banner-slider-dot');
        dots[currentSlide].classList.remove('active');
        dots[index].classList.add('active');
      }
      
      // Show new slide
      currentSlide = index;
      slides[currentSlide].classList.add('active');
    }
    
    function navigateSlider(direction) {
      const slides = slidesWrapper.querySelectorAll('.banner-slide');
      let newIndex;
      
      if (direction === 'next') {
        newIndex = (currentSlide + 1) % slides.length;
      } else {
        newIndex = (currentSlide - 1 + slides.length) % slides.length;
      }
      
      goToSlide(newIndex);
      
      // Reset autoplay if enabled
      if (autoplay) {
        clearInterval(autoplayInterval);
        startAutoplay();
      }
    }
    
    // Setup autoplay
    function startAutoplay() {
      if (autoplay && slidesWrapper.children.length > 1) {
        autoplayInterval = setInterval(() => {
          navigateSlider('next');
        }, autoplaySpeed);
      }
    }
    
    // Initialize autoplay
    startAutoplay();
    
    // Pause autoplay on hover
    sliderContainer.addEventListener('mouseenter', () => {
      if (autoplay) {
        clearInterval(autoplayInterval);
      }
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
      if (autoplay) {
        startAutoplay();
      }
    });
  }
}