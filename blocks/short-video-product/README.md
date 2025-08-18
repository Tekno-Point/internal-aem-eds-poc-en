
# Short Video Product

A responsive carousel block that displays a series of short videos with descriptions. Each video item includes a muted autoplay video and a text description. The carousel supports both desktop and mobile views with optimized layouts and performance.

## Features

- **Responsive Design**: Automatically adjusts to different screen sizes with mobile-first breakpoints.
- **Autoplay Videos**: Each video plays automatically with muted sound.
- **Carousel Navigation**: Previous and next navigation arrows with hover effects.
- **Accessibility**: Full keyboard navigation and screen reader support.
- **Performance Optimized**: Lazy loading images and efficient CSS animations.
- **Dark Mode Support**: Automatic dark mode styling for improved user experience.

## Authoring Guidelines

{
  "heading": "A SCOOTER THAT LEAVES EVERYONE BEHIND",
  "headingType": "h2",
  "video1": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-1.mp4",
  "video1Alt": "Smart Key Video",
  "video1Description": "Smart Key",
  "video2": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-2.mp4",
  "video2Alt": "Liquid Cooled Engine Video",
  "video2Description": "Liquid Cooled Engine + i3s Silent",
  "video3": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-3.mp4",
  "video3Alt": "Digital Speedometer Video",
  "video3Description": "Digital Speedometer - TBT Navigation"
}

## Markdown Table

+--------------------------------------------------------------+
| Short Video Product                                          |
+==============================================================+
| **A SCOOTER THAT LEAVES EVERYONE BEHIND**                  |
+--------------------------------------------------------------+
| ![Smart Key Video][video1]                                  |
+--------------------------------------------------------------+
| Smart Key                                                    |
+--------------------------------------------------------------+
| ![Liquid Cooled Engine Video][video2]                       |
+--------------------------------------------------------------+
| Liquid Cooled Engine + i3s Silent                           |
+--------------------------------------------------------------+
| ![Digital Speedometer Video][video3]                        |
+--------------------------------------------------------------+
| Digital Speedometer - TBT Navigation                         |
+--------------------------------------------------------------+

## Field Descriptions

| Field | Component | Type | Description |
|-------|-----------|------|-------------|
| heading | text | string | Main heading text for the section |
| headingType | text | string | HTML heading tag (h1, h2, h3) |
| video | reference | string | Video file (MP4 format) |
| videoAlt | text | string | Alternative text for video |
| videoDescription | text | string | Description text for the video |

## Usage Notes

- **Video Format**: Only MP4 videos are supported. Ensure videos are optimized for web with appropriate resolution and file size.
- **Accessibility**: Alternative text for videos is mandatory for screen reader users.
- **Performance**: Videos are set to autoplay with muted sound. Ensure videos are optimized for quick loading.
- **Responsive**: The carousel automatically adjusts to mobile devices with single-item display.

## Technical Details

- **Carousel Library**: Uses Slick Carousel for responsive and touch-friendly navigation.
- **Video Handling**: Videos are set to autoplay with muted sound for enhanced user experience.
- **Performance**: CSS animations and efficient media queries for optimal performance.
- **Accessibility**: Full WCAG 2.1 compliance with keyboard navigation and screen reader support.

## Browser Support

- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Mobile browsers (iOS 14+, Android 9+)
- Progressive enhancement for older browsers
  