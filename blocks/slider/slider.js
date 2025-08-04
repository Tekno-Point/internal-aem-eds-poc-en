// export default function decorate(block) {
//   // Create the slider container
//   const sliderContainer = document.createElement('div');
//   sliderContainer.className = 'slider-container';

//   // Create the slides wrapper
//   const slidesWrapper = document.createElement('div');
//   slidesWrapper.className = 'slides';

//   // Process each slide
//   block.children.forEach((slideDiv, index) => {
//     // Create slide element
//     const slide = document.createElement('div');
//     slide.className = 'slide';
//     slide.setAttribute('data-slide', index + 1);

//     // Find image element
//     const imageElement = slideDiv.querySelector('picture img');
//     if (imageElement) {
//       const picture = imageElement.closest('picture');
//       slide.appendChild(picture.cloneNode(true));
//       slideDiv.remove();
//     }

//     // Find content element
//     const contentElement = slideDiv.querySelector('div');
//     if (contentElement) {
//       const content = document.createElement('div');
//       content.className = 'slide-content';
//       content.innerHTML = contentElement.innerHTML;
//       slide.appendChild(content);
//       slideDiv.remove();
//     }

//     // Add slide to wrapper
//     slidesWrapper.appendChild(slide);
//   });

//   // Create navigation buttons
//   const prevButton = document.createElement('button');
//   prevButton.className = 'nav-button prev';
//   prevButton.innerHTML = '&#10094;';
//   prevButton.setAttribute('aria-label', 'Previous slide');

//   const nextButton = document.createElement('button');
//   nextButton.className = 'nav-button next';
//   nextButton.innerHTML = '&#10095;';
//   nextButton.setAttribute('aria-label', 'Next slide');

//   // Create pagination dots
//   const pagination = document.createElement('div');
//   pagination.className = 'pagination';

//   const slides = slidesWrapper.querySelectorAll('.slide');
//   slides.forEach((_, index) => {
//     const dot = document.createElement('span');
//     dot.className = 'dot';
//     dot.setAttribute('data-slide', index + 1);
//     dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
//     dot.addEventListener('click', () => showSlide(index + 1));
//     pagination.appendChild(dot);
//   });

//   // Add elements to slider container
//   sliderContainer.appendChild(slidesWrapper);
//   sliderContainer.appendChild(prevButton);
//   sliderContainer.appendChild(nextButton);
//   sliderContainer.appendChild(pagination);

//   // Replace block content
//   block.innerHTML = '';
//   block.appendChild(sliderContainer);

//   // Initialize slider functionality
//   let currentSlide = 1;
//   const totalSlides = slides.length;

//   function showSlide(n) {
//     if (n > totalSlides) { currentSlide = 1; }
//     if (n < 1) { currentSlide = totalSlides; }

//     slides.forEach(slide => slide.style.display = 'none');
//     const activeSlide = slidesWrapper.querySelector(`[data-slide="${currentSlide}"]`);
//     if (activeSlide) {
//       activeSlide.style.display = 'block';
//     }

//     // Update pagination dots
//     const dots = pagination.querySelectorAll('.dot');
//     dots.forEach(dot => dot.classList.remove('active'));
//     const activeDot = pagination.querySelector(`[data-slide="${currentSlide}"]`);
//     if (activeDot) {
//       activeDot.classList.add('active');
//     }
//   }

//   // Navigation button event listeners
//   prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
//   nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

//   // Auto-play functionality
//   let autoPlayInterval;
//   function startAutoPlay() {
//     autoPlayInterval = setInterval(() => {
//       showSlide(currentSlide + 1);
//     }, 5000); // Change slide every 5 seconds
//   }

//   function stopAutoPlay() {
//     clearInterval(autoPlayInterval);
//   }

//   // Pause autoplay on hover
//   sliderContainer.addEventListener('mouseenter', stopAutoPlay);
//   sliderContainer.addEventListener('mouseleave', startAutoPlay);

//   // Keyboard navigation
//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'ArrowLeft') {
//       showSlide(currentSlide - 1);
//     } else if (e.key === 'ArrowRight') {
//       showSlide(currentSlide + 1);
//     }
//   });

//   // Initialize slider
//   showSlide(currentSlide);
//   startAutoPlay();

//   // Add loaded class for CSS transitions
//   setTimeout(() => {
//     block.classList.add('loaded');
//   }, 100);
// }
