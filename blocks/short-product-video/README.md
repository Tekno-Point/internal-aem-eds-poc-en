
# Short Product Video

## Authoring Guidelines

```json
{
  "desktopHeading": "<p>A SCOOTER THAT <span class='ride'>LEAVES EVERYONE BEHIND</span></p>",
  "mobileHeading": "<p>A SCOOTER THAT <span class='ride'>LEAVES EVERYONE BEHIND</span></p>",
  "desktopVideoSrc1": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-1.mp4",
  "desktopVideoText1": "<p>Smart Key</p>",
  "desktopVideoSrc2": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-2.mp4",
  "desktopVideoText2": "<p>Liquid Cooled Engine + i3s Silent</p>",
  "desktopVideoSrc3": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-3.mp4",
  "desktopVideoText3": "<p>Digital Speedometer - TBT Navigation</p>",
  "desktopVideoSrc4": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-4.mp4",
  "desktopVideoText4": "<p>14 inch Large Wheels - Block Pattern Tyres</p>",
  "desktopVideoSrc5": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-5.mp4",
  "desktopVideoText5": "<p>Twin Rear Suspensions</p>",
  "desktopVideoSrc6": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-6.mp4",
  "desktopVideoText6": "<p>Dual Chamber LED Headlamp</p>",
  "desktopVideoSrc7": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-7.mp4",
  "desktopVideoText7": "<p>Longer Visor & Touring Box (Accessories)</p>",
  "mobileVideoSrc1": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-1.mp4",
  "mobileVideoText1": "<p>Smart Key</p>",
  "mobileVideoSrc2": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-2.mp4",
  "mobileVideoText2": "<p>Liquid Cooled Engine + i3s Silent</p>",
  "mobileVideoSrc3": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-3.mp4",
  "mobileVideoText3": "<p>Digital Speedometer - TBT Navigation</p>",
  "mobileVideoSrc4": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-4.mp4",
  "mobileVideoText4": "<p>14 inch Large Wheels - Block Pattern Tyres</p>",
  "mobileVideoSrc5": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-5.mp4",
  "mobileVideoText5": "<p>Twin Rear Suspensions</p>",
  "mobileVideoSrc6": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-6.mp4",
  "mobileVideoText6": "<p>Dual Chamber LED Headlamp</p>",
  "mobileVideoSrc7": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-7.mp4",
  "mobileVideoText7": "<p>Longer Visor & Touring Box (Accessories)</p>"
}
```

## Thinking Process

1. **HTML Analysis**: The provided HTML consists of two main sections: desktop and mobile. Each section contains a heading and a carousel of videos with corresponding text descriptions.
2. **Field Planning**: Identified that videos and their descriptions are repeating elements. Decided to use a block-item model for better authoring experience and to handle complex data like video sources.
3. **Content Model Mapping**: Mapped headings to richtext fields and video data to container fields within the block-item model.
4. **Static Content**: Hardcoded video attributes like `playsinline` and `muted` in the JS transformation to reduce authoring burden.
5. **Third-Party Integration**: Detected the use of Slick carousel based on class names and structure. Integrated Slick via dynamic asset loading in the JS file.
6. **Responsive Design**: Ensured that both desktop and mobile sections are handled separately with appropriate breakpoints in the CSS.
7. **Accessibility**: Included proper ARIA attributes for carousel navigation buttons to enhance accessibility.
8. **Performance**: Used `intersectionObserver` for lazy loading of videos to improve initial page load performance.
9. **Animation**: Added subtle hover effects and transition animations for enhanced user experience.
10. **Modern CSS**: Utilized CSS Grid for layout, custom properties for theming, and modern typography techniques.

## Markdown Table Representation

| Short Product Video                |
|------------------------------------|
| Desktop Heading                   |
| Desktop Video 1                   |
| Desktop Video 2                   |
| Desktop Video 3                   |
| Desktop Video 4                   |
| Desktop Video 5                   |
| Desktop Video 6                   |
| Desktop Video 7                   |
| Mobile Heading                    |
| Mobile Video 1                    |
| Mobile Video 2                    |
| Mobile Video 3                    |
| Mobile Video 4                    |
| Mobile Video 5                    |
| Mobile Video 6                    |
| Mobile Video 7                    |

## Video Structure

Each video is represented by:
- **Video Source**: A direct link to the MP4 video file.
- **Video Text**: A richtext field that supports basic HTML formatting.

## Responsive Behavior

- **Desktop**: Shows 3 videos per slide with navigation arrows.
- **Mobile**: Shows 1 video per slide with simplified navigation.
- **Breakpoint**: 768px switches from desktop to mobile layout.

## Performance Optimizations

- **Lazy Loading**: Videos load only when they enter the viewport.
- **IntersectionObserver**: Efficiently handles video loading with minimal performance impact.
    