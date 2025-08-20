
# Multi Short Videos Component

A responsive carousel component showcasing short video features of a product with slick navigation and mobile-first design.

## Structure

The component consists of two main sections: desktop and mobile carousels, each displaying a header and a set of video slides.

1. **Desktop Carousel** (`.desk-car`):
   - Header: Center-aligned text with a strong accent color.
   - Video Slides: Three slides visible with smooth navigation arrows.

2. **Mobile Carousel** (`.mob-car`):
   - Header: Center-aligned text with a strong accent color.
   - Video Slides: Single slide visible with smooth navigation arrows.

## Video Slides

Each slide contains:
1. **Video**: Automatically plays muted with inline playback.
2. **Description**: Text below the video describing the feature.

## Authoring Guidelines

### Desktop Carousel

1. **Header**:
   - Use a rich text field for the header.
   - Example: `<p>A SCOOTER THAT <span class="ride">LEAVES EVERYONE BEHIND</span></p>`

2. **Video Slides**:
   - Use a block-item model with the following fields:
     - `video`: Video reference (MP4 format).
     - `videoAlt`: Video description for accessibility.
     - `videoDescription`: Rich text description.

### Mobile Carousel

1. **Header**:
   - Use a rich text field for the header.
   - Example: `<p>A SCOOTER THAT <span class="ride">LEAVES EVERYONE BEHIND</span></p>`

2. **Video Slides**:
   - Use the same block-item model as the desktop carousel.

## JSON Structure

```json
{
  "deskCarHeader": "<p>A SCOOTER THAT <span class="ride">LEAVES EVERYONE BEHIND</span></p>",
  "mobCarHeader": "<p>A SCOOTER THAT <span class="ride">LEAVES EVERYONE BEHIND</span></p>",
  "items": [
    {
      "video": "/content/dam/feature-1.mp4",
      "videoAlt": "Smart Key feature video",
      "videoDescription": "<p>Smart Key</p>"
    },
    {
      "video": "/content/dam/feature-2.mp4",
      "videoAlt": "Engine feature video",
      "videoDescription": "<p>Liquid Cooled Engine + i3s Silent</p>"
    }
    // Additional slides...
  ]
}
```

## CSS Classes

- `.multi-short-videos`: Main component container.
- `.desk-car`: Desktop-specific carousel container.
- `.mob-car`: Mobile-specific carousel container.
- `.f-header`, `.m-header`: Headers for desktop and mobile sections.
- `.product-event-shorts`: Carousel wrapper.
- `.evts-slider`: Individual slide container.
- `.video-det`: Video description container.
- `.slick-arrow`: Navigation arrows.

## Responsive Behavior

- Desktop: Three slides visible with arrow navigation.
- Mobile: Single slide visible with arrow navigation.
- Breakpoint: 768px.

## Performance

- Videos: Automatically play muted with inline playback.
- Images: Optimized with responsive breakpoints.
- Loading: Lazy loading for offscreen images.

## Accessibility

- ARIA labels for navigation buttons.
- Focus states for interactive elements.
- Semantic HTML structure with proper headings.
