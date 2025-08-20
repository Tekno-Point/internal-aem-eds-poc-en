
# Vehicle Specification Block

A modular and interactive vehicle specification block that displays key features and specifications with animated transitions and a modal dialog for detailed information.

## Authoring Guidelines

### JSON Object Representation
```json
{
  "entryImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Web_01.png",
  "entryImageAlt": "entry-img",
  "entryMobileImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Mob_01.png",
  "entryMobileImageAlt": "entry-img",
  "middleImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Web_02.png",
  "middleImageAlt": "middle-img",
  "middleMobileImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Mob_02.png",
  "middleMobileImageAlt": "middle-img",
  "lastImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Web_03.png",
  "lastImageAlt": "last-img",
  "lastMobileImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Mob_03.png",
  "lastMobileImageAlt": "last-img",
  "features": "<ul><li>156cc<br>Displacement</li><li>10.9 kw @ 8000 rpm<br>Max Power (bhp/rpm)</li><li>14 Nm @ 6500 rpm<br>Max Torque (NM/rpm)</li></ul>",
  "brochureLink": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-125/assets/pdf/xoom_160_Leaflet.pdf",
  "brochureLinkText": "Brochure",
  "specificationLink": "/content/internal-aem-eds-poc/icicilombard/modals/specification",
  "specificationLinkText": "View Full Specifications"
}
```

## Thinking Process

### Structure Identification
The vehicle specification block is a complex component with multiple sections:
1. **Image Animation**: Three images that animate in sequence.
2. **Feature List**: Three key features displayed in a grid.
3. **CTA Buttons**: Two call-to-action buttons with different styles.
4. **Modal Dialog**: A detailed specification modal with tabbed content.

### Field Planning
1. **Images**: Three sets of images (desktop and mobile) with alt text.
2. **Features**: Three repeating features with main heading and sub-heading.
3. **CTA Links**: Two links with text and optional download attribute.
4. **Modal Content**: Pre-defined tab structure with specific content.

### Content Model Mapping
1. **Images**: Use reference fields with alt text for better accessibility.
2. **Features**: Use a rich text field with list items for simple repetition.
3. **CTA Links**: Use aem-content fields with text collapse for better authoring.
4. **Modal**: Hardcode modal structure and content in JS for consistency.

### Block.json Structure
1. **Definitions**: Two definitions for the main block and feature items.
2. **Models**:
   - Main block with container for images, rich text for features, and container for CTA links.
   - Feature item with rich text for content.
3. **Filters**: Link main block to feature items.

## JS Implementation
1. **Data Querying**: Extract images, features, and CTA links from block children.
2. **DOM Transformation**:
   - Create image containers with desktop and mobile images.
   - Create feature wrappers with main and sub-headings.
   - Create CTA buttons with icons and modal triggers.
   - Hardcode modal structure with tabbed content.
3. **Third-Party Integration**: Use Bootstrap classes for modal functionality.

## CSS Styling
1. **Modern Design**: Glassmorphism effects with backdrop-filter.
2. **Animation**: Smooth transitions and hover effects.
3. **Responsive**: Mobile-first approach with media queries.
4. **Accessibility**: Focus states and high contrast support.

## Accessibility Features
1. **Focus States**: Outline on focus for interactive elements.
2. **Keyboard Navigation**: Modal can be closed with Escape key.
3. **Screen Reader Support**: Proper ARIA labels and structure.
4. **Reduced Motion**: Animation disabled for reduced motion preference.
    