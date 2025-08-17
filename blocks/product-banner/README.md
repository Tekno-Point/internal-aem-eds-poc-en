
# Product Banner

A visually stunning banner component designed to showcase product images with overlayed text and call-to-action buttons. Perfect for hero sections and product detail pages.

## Authoring Guidelines

{
  "desktopBannerImage": "https://example.com/banner-desktop.jpg",
  "desktopBannerImageAlt": "Product banner image for desktop",
  "mobileBannerImage": "https://example.com/banner-mobile.jpg",
  "mobileBannerImageAlt": "Product banner image for mobile",
  "bannerHeader": "<h1>New Product Launch</h1>",
  "bannerTitle": "<h2>Discover Our Latest Innovation</h2>",
  "price": "148,500",
  "priceLabel": "(Ex-Showroom Price*)",
  "cityName": "DELHI",
  "ctaButtonText": "Enquire Now",
  "ctaButtonLink": "/enquire"
}

## Markdown Table

+--------------------------------------------------------------+
| Product Banner                                              |
+==============================================================+
| ![Product banner image for desktop][desktopBannerImage]     |
+--------------------------------------------------------------+
| ![Product banner image for mobile][mobileBannerImage]       |
+--------------------------------------------------------------+
| <h1>New Product Launch</h1>                                 |
+--------------------------------------------------------------+
| <h2>Discover Our Latest Innovation</h2>                     |
+--------------------------------------------------------------+
| 148,500                                                     |
+--------------------------------------------------------------+
| (Ex-Showroom Price*)                                        |
+--------------------------------------------------------------+
| DELHI                                                        |
+--------------------------------------------------------------+
| Enquire Now                                                  |
+--------------------------------------------------------------+
| /enquire                                                     |
+--------------------------------------------------------------+

## Field Descriptions

| Field | Component | Description |
|-------|-----------|-------------|
| desktopBannerImage | reference | High-resolution image for desktop displays |
| desktopBannerImageAlt | text | Alt text for desktop banner image |
| mobileBannerImage | reference | Optimized image for mobile displays |
| mobileBannerImageAlt | text | Alt text for mobile banner image |
| bannerHeader | richtext | Main heading with HTML support |
| bannerTitle | richtext | Subheading with HTML support |
| price | text | Product price formatted as currency |
| priceLabel | text | Label for the price with special characters |
| cityName | text | City name for localized pricing |
| ctaButtonText | text | Button text for call-to-action |
| ctaButtonLink | text | URL or modal trigger for the button |

## Usage Notes

1. **Image Optimization**: Both desktop and mobile images should be optimized for performance with appropriate dimensions and file sizes.
2. **Rich Text Content**: Use HTML headings (<h1>-<h6>) for banner text to ensure proper semantic structure.
3. **Pricing Format**: Ensure the price field includes commas for thousands separators.
4. **Accessibility**: Always provide alt text for images to improve accessibility.
5. **Responsive Design**: The component automatically adapts to different screen sizes with mobile-first design principles.

## Animation Behavior

The component includes built-in animations for:
1. Banner header: Fades in from top to bottom with a 0.4s delay.
2. Banner title: Fades in with a slight delay after the header.
3. CTA section: Slides up with a 0.4s delay and includes hover effects.

## CSS Custom Properties

The component uses modern CSS with custom properties for theming:
1. `--button-background`: Gradient for the CTA button background.
2. `--text-color`: Color for overlay text.
3. `--overlay-background`: Background for price and label overlays.

## Browser Support

Tested and optimized for:
1. Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
2. Mobile browsers (iOS 14+, Android 9+)
3. Responsive design breakpoints: 1200px, 768px, 480px
4. Accessibility features including reduced motion support
