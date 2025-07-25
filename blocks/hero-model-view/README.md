
# Hero Model View Block

A full-width hero section component with background image support, rich text content, and call-to-action buttons. Features multiple background styles, content alignment options, and entrance animations.

## JSON Model

```json
[
  {
    "id": "hero-model-view",
    "fields": [
      { "component": "reference", "name": "backgroundImage" },
      { "component": "text", "name": "backgroundImageAlt" },
      { "component": "select", "name": "backgroundStyle" },
      { "component": "select", "name": "contentAlignment" },
      { "component": "select", "name": "contentWidth" },
      { "component": "select", "name": "animation" },
      { "component": "text", "name": "overlayColor" },
      { "component": "text", "name": "overlayOpacity" }
    ]
  },
  {
    "id": "hero-model-view-item",
    "fields": [
      { "component": "richtext", "name": "content" },
      { "component": "reference", "name": "ctaButton" },
      { "component": "text", "name": "ctaButtonText" },
      { "component": "select", "name": "ctaButtonStyle" }
    ]
  }
]
```

## Sample Data

```json
{
  "backgroundImage": "https://example.com/hero-background.jpg",
  "backgroundImageAlt": "Beautiful landscape with mountains and lake",
  "backgroundStyle": "parallax",
  "contentAlignment": "center",
  "contentWidth": "narrow",
  "animation": "slide-up",
  "overlayColor": "#00000080",
  "overlayOpacity": "0.6",
  "content": [
    {
      "content": "<h1>Welcome to Our Amazing Service</h1><p>Discover the future of <strong>innovation</strong> and <em>technology</em> that will transform your business.</p>"
    },
    {
      "ctaButton": "https://example.com/get-started",
      "ctaButtonText": "Get Started Today",
      "ctaButtonStyle": "primary"
    }
  ]
}
```

## Markdown Representation

```
+----------------------------------------------------------------------+
|                                                                      |
|  ![Beautiful landscape][image0]                                      |
|                                                                      |
|  Welcome to Our Amazing Service                                     |
|                                                                      |
|  Discover the future of innovation and technology that will        |
|  transform your business.                                           |
|                                                                      |
|  [Get Started Today](https://example.com/get-started)               |
|                                                                      |
+----------------------------------------------------------------------+
```

## Field Descriptions

| Field | Component | Description |
|-------|-----------|-------------|
| backgroundImage | reference | Full-width background image |
| backgroundImageAlt | text | Alt text for background image |
| backgroundStyle | select | Background behavior: cover, contain, fixed, parallax |
| contentAlignment | select | Content alignment: left, center, right |
| contentWidth | select | Content width: narrow, wide, full |
| animation | select | Entrance animation: none, fade-in, slide-up, slide-left, zoom-in |
| overlayColor | text | Hex color code for background overlay |
| overlayOpacity | text | Overlay opacity value (0-1) |
| content | richtext | Hero content with headings, paragraphs, and links |
| ctaButton | reference | Call-to-action button link |
| ctaButtonText | text | CTA button text |
| ctaButtonStyle | select | Button style: primary, secondary, outline, ghost |

## Features

- **Background Styles**: Cover, contain, fixed, parallax behaviors
- **Content Alignment**: Left, center, right alignment options
- **Responsive Design**: Mobile-optimized with adaptive typography
- **Entrance Animations**: Smooth fade-in, slide, and zoom effects
- **Overlay Options**: Customizable color and opacity overlays
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **Performance**: Lazy loading images and intersection observer animations
- **Modern Design**: Glassmorphism effects and smooth interactions
- **Dark Mode**: Automatic dark mode support via CSS custom properties

## Usage Notes

- Background images are optimized with responsive breakpoints
- Rich text content preserves all HTML formatting including links
- Multiple content items can be added for sequential display
- CTA buttons include hover effects and proper focus states
- Parallax behavior adds subtle motion effects on scroll
- Intersection observer triggers animations on viewport entry

## Configuration Options

- **Background Style**:
  - `cover`: Image covers entire background
  - `contain`: Image fits within background
  - `fixed`: Image fixed on scroll
  - `parallax`: Image moves slower on scroll
- **Content Alignment**:
  - `left`: Content aligned to left
  - `center`: Content centered
  - `right`: Content aligned to right
- **Content Width**:
  - `narrow`: Content width limited to 800px
  - `wide`: Content width limited to 1200px
  - `full`: Content spans full width
- **Animation**:
  - `none`: No entrance animation
  - `fade-in`: Fade-in effect
  - `slide-up`: Slide up from bottom
  - `slide-left`: Slide in from left
  - `zoom-in`: Zoom in effect
- **Button Style**:
  - `primary`: Blue gradient button
  - `secondary`: Gold gradient button
  - `outline`: White border button
  - `ghost`: Transparent background button
