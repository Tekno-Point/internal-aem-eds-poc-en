
# Slider

## Usage

The Slider block creates a responsive image carousel with overlay content that automatically transitions between slides. It includes navigation buttons, pagination dots, and autoplay functionality with pause-on-hover behavior. Perfect for showcasing multiple images with accompanying text content.

## Fields

### Slide Configuration

* **image** (`reference`): The main image for the slide. Recommended size is 1200x500px for optimal display.
* **imageAlt** (`text`): Alternative text for the slide image for accessibility.
* **content** (`richtext`): Overlay content displayed on top of the slide image. Supports rich text formatting including headings, paragraphs, and links.

## Behavior

* **Autoplay:** Slides transition every 5 seconds.
* **Pause on Hover:** Autoplay pauses when the user hovers over the slider.
* **Navigation:** Previous/next buttons and pagination dots allow manual navigation.
* **Keyboard Support:** Arrow keys can be used to navigate slides.
* **Responsive:** Adapts to different screen sizes with optimized mobile layout.

## Accessibility Features

* ARIA labels for navigation buttons.
* Keyboard navigation support.
* Focus indicators for interactive elements.
* High contrast and reduced motion support.

## Design Tokens

* **--background-color:** Background color for the slider container.
* **--heading-color:** Color for slide headings.
* **--text-color:** Color for slide text content.
* **--heading-color-dark:** Dark mode heading color.
* **--text-color-dark:** Dark mode text color.

## Browser Support

* Modern browsers and mobile devices.
* Graceful degradation for older browsers without JavaScript.
* Optimized for Core Web Vitals performance.
  