
# Multi-Card Feature Block

A modular and responsive card component that displays key features with images, headings, descriptions, and call-to-action links. Perfect for showcasing product features, services, or benefits in a grid layout.

## JSON Model

```json
[
  {
    "id": "multicardspecs",
    "fields": [
      {
        "component": "richtext",
        "name": "headerContent",
        "label": "Header Content",
        "valueType": "string"
      }
    ]
  },
  {
    "id": "multicardspecs-item",
    "fields": [
      {
        "component": "reference",
        "valueType": "string",
        "name": "image",
        "label": "Feature Image",
        "multi": false
      },
      {
        "component": "text",
        "name": "imageAlt",
        "label": "Image Alt Text",
        "valueType": "string"
      },
      {
        "component": "richtext",
        "name": "content",
        "label": "Card Content",
        "valueType": "string"
      }
    ]
  }
]
```

## Sample Data

```json
{
  "headerContent": "<h2>Unmatched Performance</h2><p>Experience the future of mobility with our cutting-edge scooter technology.</p>",
  "items": [
    {
      "image": "/content/dam/hero-commerce/features/performance.png",
      "imageAlt": "Liquid cooled engine",
      "content": "<h3>Liquid Cooled Engine</h3><p>Stay cool and perform at your best with our advanced liquid cooling system.</p><a href="/performance">Learn More</a>"
    },
    {
      "image": "/content/dam/hero-commerce/features/safety.png",
      "imageAlt": "Advanced safety features",
      "content": "<h3>Advanced Safety</h3><p>Your safety is our priority with dual-chamber LED headlamps and disc brakes with ABS.</p><a href="/safety">Discover Safety</a>"
    }
  ]
}
```

## Markdown Representation

```
+----------------------------------------------------------------------+
| Multi-Card Feature Block                                             |
+======================================================================+
| <h2>Unmatched Performance</h2><p>Experience the future of mobility  |
| with our cutting-edge scooter technology.</p>                       |
+----------------------------------------------------------------------+
| ![Liquid cooled engine][image0]                                     |
+----------------------------------------------------------------------+
| <h3>Liquid Cooled Engine</h3><p>Stay cool and perform at your best  |
| with our advanced liquid cooling system.</p><a href="/performance"  |
| >Learn More</a>                                                      |
+----------------------------------------------------------------------+
| ![Advanced safety features][image1]                                  |
+----------------------------------------------------------------------+
| <h3>Advanced Safety</h3><p>Your safety is our priority with dual-    |
| chamber LED headlamps and disc brakes with ABS.</p><a href="/safety"|
| >Discover Safety</a>                                                 |
+----------------------------------------------------------------------+
```

## Field Descriptions

| Field | Component | Description |
|-------|-----------|-------------|
| headerContent | richtext | Section header with main title and optional description. Supports rich text formatting including headings and paragraphs. |
| image | reference | Feature image representing the card's topic. Recommended size: 600x400px. |
| imageAlt | text | Alternative text for the image for accessibility. |
| content | richtext | Card content including heading (h3), description (paragraph), and optional call-to-action link. Supports rich text formatting including lists and emphasis. |

## Usage Notes

1. **Header Content:** Use `headerContent` for section titles and descriptions. Rich text allows formatting headings (h2, h3) and paragraphs.
2. **Card Images:** Images should be 600x400px for optimal display. Use high-quality images that represent the feature or benefit.
3. **Card Content:** Structure content with a heading (h3), followed by a description paragraph, and optionally a call-to-action link.
4. **Rich Text Formatting:** Rich text fields support HTML formatting including `<strong>`, `<em>`, `<ul>`, `<ol>`, and `<li>`.
5. **Accessibility:** Always provide alternative text for images using the `imageAlt` field.
6. **Responsive Design:** The component automatically adjusts to different screen sizes with a mobile-first responsive grid layout.

## Visual Appearance

- **Grid Layout:** Cards displayed in a responsive grid with 2-4 columns depending on screen width.
- **Card Style:** Modern card design with rounded corners, shadows, and hover effects.
- **Typography:** Clean typography with emphasis on headings and strong text.
- **Color Scheme:** Uses themed colors with fallback values for better accessibility.
- **Animations:** Smooth hover animations and fade-in transitions for enhanced user experience.

## Browser Support

- Modern browsers including Chrome, Firefox, Safari, Edge.
- Mobile browsers with responsive touch-friendly interactions.
- Graceful degradation for older browsers with reduced animations.
  