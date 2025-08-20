
# Short Video Product Component

A responsive carousel component that displays a series of short videos with descriptive text. Each video slide includes a muted autoplay video and a text description. The component features both desktop and mobile layouts with optimized carousel behavior.

## Authoring Guidelines

### JSON Object
{
  "heading": "A SCOOTER THAT <span class='ride'>LEAVES EVERYONE BEHIND</span>",
  "subHeading": "A SCOOTER THAT <span class='ride'>LEAVES EVERYONE BEHIND</span>",
  "videos": [
    {
      "video": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-1.mp4",
      "videoAlt": "Smart Key",
      "videoDescription": "Smart Key"
    },
    {
      "video": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-2.mp4",
      "videoAlt": "Liquid Cooled Engine + i3s Silent",
      "videoDescription": "Liquid Cooled Engine + i3s Silent"
    },
    {
      "video": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-3.mp4",
      "videoAlt": "Digital Speedometer - TBT Navigation",
      "videoDescription": "Digital Speedometer - TBT Navigation"
    },
    {
      "video": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-4.mp4",
      "videoAlt": "14 inch Large Wheels - Block Pattern Tyres",
      "videoDescription": "14 inch Large Wheels - Block Pattern Tyres"
    },
    {
      "video": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-5.mp4",
      "videoAlt": "Twin Rear Suspensions",
      "videoDescription": "Twin Rear Suspensions"
    },
    {
      "video": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-6.mp4",
      "videoAlt": "Dual Chamber LED Headlamp",
      "videoDescription": "Dual Chamber LED Headlamp"
    },
    {
      "video": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-7.mp4",
      "videoAlt": "Longer Visor & Touring Box (Accessories)",
      "videoDescription": "Longer Visor & Touring Box (Accessories)"
    }
  ]
}

### Markdown Table

| Short Video Product |  |
| --- | --- |
| **Heading** |  |
| A SCOOTER THAT |  |
| LEAVES EVERYONE BEHIND |  |
| **Sub Heading** |  |
| A SCOOTER THAT |  |
| LEAVES EVERYONE BEHIND |  |
| **Video** | **Video Description** |
| ![Smart Key](/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-1.mp4) | Smart Key |
| ![Liquid Cooled Engine + i3s Silent](/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-2.mp4) | Liquid Cooled Engine + i3s Silent |
| ![Digital Speedometer - TBT Navigation](/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-3.mp4) | Digital Speedometer - TBT Navigation |
| ![14 inch Large Wheels - Block Pattern Tyres](/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-4.mp4) | 14 inch Large Wheels - Block Pattern Tyres |
| ![Twin Rear Suspensions](/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-5.mp4) | Twin Rear Suspensions |
| ![Dual Chamber LED Headlamp](/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-6.mp4) | Dual Chamber LED Headlamp |
| ![Longer Visor & Touring Box (Accessories)](/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-7.mp4) | Longer Visor & Touring Box (Accessories) |

## Thinking Process

### Structure Identification
The provided HTML is a carousel component with a specific structure:
1. Two headings (desktop and mobile).
2. A series of video slides with autoplay videos and text descriptions.
3. Responsive behavior with different layouts for desktop and mobile.

### Content Model Mapping
1. **Headings**: Rich text fields for headings with HTML formatting.
2. **Videos**: Reference fields for video assets with alt text.
3. **Descriptions**: Rich text fields for video descriptions.

### Field Planning
1. **Heading**: Rich text field for the main heading.
2. **Sub Heading**: Rich text field for the mobile heading.
3. **Videos**: Repeating block-item with:
   - Video reference field.
   - Video alt text field.
   - Video description rich text field.

### Transformation Strategy
1. **DOM Restructuring**: Create separate containers for desktop and mobile layouts.
2. **Slick Integration**: Use Slick carousel library for slide behavior.
3. **Video Handling**: Autoplay videos with muted attribute.
4. **Responsive Behavior**: Different slide counts for desktop and mobile.

### Third-Party Library
Slick carousel is used for slide behavior with specific configuration for responsive behavior.
    