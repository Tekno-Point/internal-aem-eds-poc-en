
📦 Short Product Video

📝 Authoring Guidelines:
{
  "heading": "<p>A SCOOTER THAT <span class="ride">LEAVES EVERYONE BEHIND</span></p>",
  "desktopVideo1": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-1.mp4",
  "desktopVideo1Alt": "Smart Key",
  "mobileVideo1": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-1.mp4",
  "mobileVideo1Alt": "Smart Key",
  "videoDescription1": "<p>Smart Key</p>",
  "desktopVideo2": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-2.mp4",
  "desktopVideo2Alt": "Liquid Cooled Engine + i3s Silent",
  "mobileVideo2": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-2.mp4",
  "mobileVideo2Alt": "Liquid Cooled Engine + i3s Silent",
  "videoDescription2": "<p>Liquid Cooled Engine + i3s Silent</p>",
  "desktopVideo3": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-3.mp4",
  "desktopVideo3Alt": "Digital Speedometer - TBT Navigation",
  "mobileVideo3": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-3.mp4",
  "mobileVideo3Alt": "Digital Speedometer - TBT Navigation",
  "videoDescription3": "<p>Digital Speedometer - TBT Navigation</p>",
  "desktopVideo4": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-4.mp4",
  "desktopVideo4Alt": "14 inch Large Wheels - Block Pattern Tyres",
  "mobileVideo4": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-4.mp4",
  "mobileVideo4Alt": "14 inch Large Wheels - Block Pattern Tyres",
  "videoDescription4": "<p>14 inch Large Wheels - Block Pattern Tyres</p>",
  "desktopVideo5": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-5.mp4",
  "desktopVideo5Alt": "Twin Rear Suspensions",
  "mobileVideo5": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-5.mp4",
  "mobileVideo5Alt": "Twin Rear Suspensions",
  "videoDescription5": "<p>Twin Rear Suspensions</p>",
  "desktopVideo6": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-6.mp4",
  "desktopVideo6Alt": "Dual Chamber LED Headlamp",
  "mobileVideo6": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-6.mp4",
  "mobileVideo6Alt": "Dual Chamber LED Headlamp",
  "videoDescription6": "<p>Dual Chamber LED Headlamp</p>",
  "desktopVideo7": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/web/feature-web-7.mp4",
  "desktopVideo7Alt": "Longer Visor & Touring Box (Accessories)",
  "mobileVideo7": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/shorts/mob/feature-mob-7.mp4",
  "mobileVideo7Alt": "Longer Visor & Touring Box (Accessories)",
  "videoDescription7": "<p>Longer Visor & Touring Box (Accessories)</p>"
}

⚙️ Thinking Process:

1. **Block Analysis**:
   - The block displays a carousel of videos with descriptions, optimized for both desktop and mobile views.
   - There are 7 videos each for desktop and mobile, with a heading that repeats in both sections.
   - The carousel should support both desktop (3 slides visible) and mobile (1 slide visible) layouts.

2. **Field Planning**:
   - **Heading**: A rich text field for the heading that includes a span for styling.
   - **Videos**: Separate reference fields for desktop and mobile videos, each with alt text.
   - **Descriptions**: Rich text fields for video descriptions, repeated for each video.

3. **block.json Structure**:
   - Used container fields to group desktop and mobile videos for better organization.
   - Each video has a reference field for the video asset and a text field for the alt text.
   - Descriptions are modeled as rich text fields.

4. **JS Transformation**:
   - Restructured the DOM to separate desktop and mobile sections.
   - Used Slick Carousel for the carousel functionality.
   - Handled video and description mapping carefully to maintain the correct order.

5. **CSS Styling**:
   - Mobile-first approach with responsive breakpoints.
   - Modern design with hover effects and shadow animations.
   - Utilized CSS Grid and Flexbox for layout.

📄 Markdown Table:

+-------------------------------------------------------------+
| Short Product Video                                          |
+=============================================================+
| <p>A SCOOTER THAT <span class="ride">LEAVES EVERYONE        |
| BEHIND</span></p>                                            |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/web/feature-web-1. |
| mp4                                                         |
+-------------------------------------------------------------+
| Smart Key                                                   |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/mob/feature-mob-1. |
| mp4                                                         |
+-------------------------------------------------------------+
| Smart Key                                                   |
+-------------------------------------------------------------+
| <p>Smart Key</p>                                             |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/web/feature-web-2. |
| mp4                                                         |
+-------------------------------------------------------------+
| Liquid Cooled Engine + i3s Silent                           |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/mob/feature-mob-2. |
| mp4                                                         |
+-------------------------------------------------------------+
| Liquid Cooled Engine + i3s Silent                           |
+-------------------------------------------------------------+
| <p>Liquid Cooled Engine + i3s Silent</p>                    |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/web/feature-web-3. |
| mp4                                                         |
+-------------------------------------------------------------+
| Digital Speedometer - TBT Navigation                         |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/mob/feature-mob-3. |
| mp4                                                         |
+-------------------------------------------------------------+
| Digital Speedometer - TBT Navigation                         |
+-------------------------------------------------------------+
| <p>Digital Speedometer - TBT Navigation</p>                 |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/web/feature-web-4. |
| mp4                                                         |
+-------------------------------------------------------------+
| 14 inch Large Wheels - Block Pattern Tyres                  |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/mob/feature-mob-4. |
| mp4                                                         |
+-------------------------------------------------------------+
| 14 inch Large Wheels - Block Pattern Tyres                  |
+-------------------------------------------------------------+
| <p>14 inch Large Wheels - Block Pattern Tyres</p>          |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/web/feature-web-5. |
| mp4                                                         |
+-------------------------------------------------------------+
| Twin Rear Suspensions                                       |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/mob/feature-mob-5. |
| mp4                                                         |
+-------------------------------------------------------------+
| Twin Rear Suspensions                                       |
+-------------------------------------------------------------+
| <p>Twin Rear Suspensions</p>                                |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/web/feature-web-6. |
| mp4                                                         |
+-------------------------------------------------------------+
| Dual Chamber LED Headlamp                                   |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/mob/feature-mob-6. |
| mp4                                                         |
+-------------------------------------------------------------+
| Dual Chamber LED Headlamp                                   |
+-------------------------------------------------------------+
| <p>Dual Chamber LED Headlamp</p>                           |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/web/feature-web-7. |
| mp4                                                         |
+-------------------------------------------------------------+
| Longer Visor & Touring Box (Accessories)                   |
+-------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/          |
| content-fragments/xoom-160/assets/shorts/mob/feature-mob-7. |
| mp4                                                         |
+-------------------------------------------------------------+
| Longer Visor & Touring Box (Accessories)                   |
+-------------------------------------------------------------+
| <p>Longer Visor & Touring Box (Accessories)</p>           |
+-------------------------------------------------------------+
    