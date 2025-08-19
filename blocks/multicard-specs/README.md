
# Multicard Specs Block

A modular, responsive grid component that displays product specifications and features in a visually appealing, card-based layout. Perfect for showcasing scooter features and specifications with rich animations and interactive elements.

## Authoring Guidelines

{
  "leftSectionText": "<p>Powerful</p><p><span class="leader">Performance</span></p>",
  "leftSectionImage": "https://www.mydomain.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/standout/Icon.svg",
  "leftSectionCards": "<ul><li>Liquid Cooled Engine</li><li>i3s Silent Technology</li></ul>",
  "centerSectionText": "<p><span class="standout"><b></b>Scooter</span></p><p>Re-Imagined</p>",
  "centerSectionImage": "https://www.mydomain.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-125/assets/features/new_Web-Scooter-Re-Imagined.png",
  "centerSectionMobileImage": "https://www.mydomain.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-125/assets/features/new_Mobile-Scooter-Re-Imagined.png",
  "rightSectionText": "<p>Superior</p><p><span class="design">Grip</span></p>",
  "rightSectionImage": "https://www.mydomain.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-125/assets/features/Grip.png",
  "rightSectionMobileImage": "https://www.mydomain.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-125/assets/features/Grip.png",
  "rightSectionCards": "<ul><li>14 inch Large Wheels with Block Pattern Tyres</li></ul>",
  "bottomLeftSectionText": "<p>Enhanced</p><p><span class="comfort">Safety</span></p>",
  "bottomLeftSectionImage": "https://www.mydomain.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-125/assets/features/Safety_1.png",
  "bottomLeftSectionMobileImage": "https://www.mydomain.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-125/assets/features/Safety_mob.png",
  "bottomLeftSectionCards": "<ul><li>Dual Chamber LED Headlamp</li><li>Disc Brake with ABS</li></ul>",
  "bottomRightSectionText": "<p>Cutting-Edge</p><p><span class="style">Technology</span></p>",
  "bottomRightSectionImage": "https://www.mydomain.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-125/assets/features/Technology.png",
  "bottomRightSectionMobileImage": "https://www.mydomain.com/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-125/assets/features/Technology_mob.png",
  "bottomRightSectionCards": "<ul><li>Smart Key</li><li>TBT Navigation</li></ul>"
}

## Thinking Process

1. **Structure Identification**: The provided HTML is a grid layout with three columns (left, center, right) and two rows (upper and lower). Each column contains a mix of text, images, and repeating cards.
2. **Content Model Mapping**:
   - **Text**: Rich text fields for headings and descriptions.
   - **Images**: Reference fields for images with proper alt text.
   - **Cards**: Repeating cards with icons and descriptions, best handled as rich text lists.
3. **Field Collapse**: Grouped related fields where appropriate (e.g., image and alt text).
4. **Static Content**: Hardcoded the icon image path for cards to reduce authoring burden.
5. **Container Fields**: Used container fields to group related content for better organization.

## Markdown Table Representation

| Multicard Specs                |
|---------------------------------|
| **Powerful**                    |
| **Performance**                  |
| ![Icon](Icon.svg) Liquid Cooled Engine |
| ![Icon](Icon.svg) i3s Silent Technology |
| **Scooter**                       |
| **Re-Imagined**                   |
| ![Scooter](Scooter.png)           |
| ![Scooter Mobile](ScooterMobile.png) |
| **Superior**                      |
| **Grip**                           |
| ![Grip](Grip.png)                  |
| ![Grip Mobile](GripMobile.png)     |
| 14 inch Large Wheels with Block Pattern Tyres |
| **Enhanced**                      |
| **Safety**                         |
| ![Safety](Safety.png)              |
| ![Safety Mobile](SafetyMobile.png)  |
| Dual Chamber LED Headlamp         |
| Disc Brake with ABS                |
| **Cutting-Edge**                   |
| **Technology**                     |
| ![Technology](Technology.png)       |
| ![Technology Mobile](TechnologyMobile.png) |
| Smart Key                          |
| TBT Navigation                      |

## Features

- **Responsive Design**: Mobile-first approach with optimized layouts for small screens.
- **Interactive Animations**: CSS-based animations with reduced motion support.
- **Accessibility**: Full keyboard navigation and focus states.
- **Dark Mode**: Automatic dark mode support via CSS custom properties.
- **Performance**: Optimized images with hover zoom effects.
- **Grid Layout**: Modern CSS Grid for flexible and responsive design.

## Usage Notes

- Use rich text formatting for headings and descriptions to apply bold and emphasis.
- Provide high-quality images with appropriate dimensions for best display.
- The icon images for cards are automatically included and do not need to be authored.
- The grid layout automatically adjusts to a single-column layout on mobile devices.
    