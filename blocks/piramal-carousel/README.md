# Piramal Carousel

## Usage

The Piramal Carousel block creates a responsive, accessible carousel/slider component ideal for showcasing promotional content, product highlights, and marketing campaigns. It features smooth transitions, touch-friendly navigation, and works seamlessly on all devices.

### Features

* **Responsive Design:** Works perfectly on desktop, tablet, and mobile.
* **Accessible:** Full WCAG 2.1 AA compliance with keyboard navigation.
* **Smooth Animations:** CSS transitions with reduced motion support.
* **Touch-Friendly:** Natural swipe gestures on touch devices.
* **Auto-Play:** Optional auto-play functionality with configurable timing.
* **Dark Mode:** Automatic dark mode support via CSS custom properties.

## Fields

### Carousel Configuration

* **carouselClasses** (`text`): Additional CSS classes for custom styling (e.g., `full-width`, `rounded-corners`).

### Carousel Item Fields

* **backgroundImage** (`reference`): Background image for the carousel item.
* **backgroundImageAlt** (`text`): Alternative text for the background image.
* **eyebrow** (`text`): Top eyebrow text (e.g., "New Offer", "Limited Time").
* **title** (`richtext`): Main title content with rich text formatting (h1-h3).
* **description** (`richtext`): Description content with rich text formatting (paragraphs, lists, emphasis).
* **ctaLink** (`reference`): Call-to-action button link (URL).
* **ctaText** (`text`): Text for the call-to-action button (e.g., "Apply Now", "Learn More").
* **itemClasses** (`text`): Additional CSS classes for specific styling (e.g., `highlight`, `dark-background`).

## Usage Examples

### Basic Usage

| carouselClasses |  |
|-----------------|--|
|                 |  |
| backgroundImage | /content/dam/hero-background.jpg |
| backgroundImageAlt | Beautiful mountain landscape |
| eyebrow | Welcome to Our Platform |
| title | <h1>Discover Amazing Features</h1> |
| description | <p>Explore our latest features that will <strong>transform</strong> your experience.</p><ul><li>Enhanced performance</li><li>New user interface</li></ul> |
| ctaLink | /get-started |
| ctaText | Get Started |
| itemClasses | highlight |

### Multiple Items

| carouselClasses |  |
|-----------------|--|
|                 |  |
| backgroundImage | /content/dam/hero-background.jpg |
| backgroundImageAlt | Beautiful mountain landscape |
| eyebrow | Welcome to Our Platform |
| title | <h1>Discover Amazing Features</h1> |
| description | <p>Explore our latest features that will <strong>transform</strong> your experience.</p><ul><li>Enhanced performance</li><li>New user interface</li></ul> |
| ctaLink | /get-started |
| ctaText | Get Started |
| itemClasses | highlight |
| backgroundImage | /content/dam/team-image.jpg |
| backgroundImageAlt | Our dedicated team |
| eyebrow | Meet Our Team |
| title | <h2>Expert Team Ready to Help</h2> |
| description | <p>Our team of experts is committed to providing <em>unparalleled</em> customer support.</p> |
| ctaLink | /contact |
| ctaText | Contact Us |
| itemClasses | dark-background |

## Accessibility Features

* ARIA attributes for screen readers.
* Keyboard navigation (Arrow keys, Enter).
* Focus management and visible focus indicators.
* High contrast mode support.
* Reduced motion respecting user preferences.

## Performance Optimizations

* Lazy loading for images.
* CSS-only animations with fallbacks.
* Efficient event handling and debouncing.
* Intersection Observer for auto-play visibility detection.

## Customization Options

* **Background Styles:** Use `itemClasses` like `light-background`, `gradient`, `center-align` for different styling.
* **Button Styles:** Use `ctaText` like `primary`, `secondary`, `outline` for different button appearances.
* **Auto-Play:** Add `auto-play` to `carouselClasses` for auto-play functionality with `data-auto-play-interval="5000"` for 5-second intervals.

## Browser Support

* Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+).
* Mobile browsers including iOS Safari and Android Chrome.
* Progressive enhancement with graceful degradation.

## Known Limitations

* Limited to 5-10 items for optimal performance.
* Auto-play may not work consistently in low-power mode or background tabs.
* Complex rich text content may require manual styling adjustments.
