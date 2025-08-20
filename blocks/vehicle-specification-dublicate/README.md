
  📦 Vehicle Specification

  📝 Authoring Guidelines:
  {
    "entryImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Web_01.png",
    "entryImageAlt": "entry-img",
    "entryMobImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Mob_01.png",
    "entryMobImageAlt": "entry-img",
    "middleImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Web_02.png",
    "middleImageAlt": "middle-img",
    "middleMobImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Mob_02.png",
    "middleMobImageAlt": "middle-img",
    "lastImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Web_03.png",
    "lastImageAlt": "last-img",
    "lastMobImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Mob_03.png",
    "lastMobImageAlt": "last-img",
    "features": "<ul><li>156cc<br>Displacement</li><li>10.9 kw @ 8000 rpm<br>Max Power (bhp/rpm)</li><li>14 Nm @ 6500 rpm<br>Max Torque (NM/rpm)</li></ul>",
    "downloadIcon": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/new-destini-125/assets/icons/download_icon.png",
    "downloadIconAlt": "link image"
  }

  ⚙️ Thinking Process:

  1. **Block Analysis**:
     - The block consists of an image animation section, a feature text section, and CTA buttons.
     - The image animation section has three images with desktop and mobile variants.
     - The feature text section contains a list of features with main headings and subheadings.
     - CTA buttons include a download link and a modal trigger with icons.

  2. **Field Planning**:
     - **Images**: Use reference fields with alt text for each image.
     - **Features**: Use a rich text field for the features section to allow authors to format text easily.
     - **Icons**: Use reference fields for CTA icons with alt text.
     - **Modal**: The modal content is static and hardcoded in the JS to reduce authoring burden.

  3. **Field Collapse**:
     - Images are collapsed with their alt text.
     - CTA icons are collapsed with their alt text.

  4. **Container Fields**:
     - Used to group related image fields and CTA icon fields for better organization.

  5. **Rich Text Field**:
     - The features section uses a rich text field to allow authors to create a list of features easily.

  6. **Modal Integration**:
     - The modal content is hardcoded in the JS to reduce authoring burden. The modal trigger is a rich text field with specific attributes.

  📄 Markdown Table:

  +-------------------------------------------------------------+
  | Vehicle Specification                                       |
  +=============================================================+
  | ![entry-img][entryImage] ![middle-img][middleImage]        |
  | ![last-img][lastImage]                                     |
  +-------------------------------------------------------------+
  | ![entry-img][entryMobImage] ![middle-img][middleMobImage] |
  | ![last-img][lastMobImage]                                 |
  +-------------------------------------------------------------+
  | 156cc                                                      |
  | Displacement                                                |
  +-------------------------------------------------------------+
  | 10.9 kw @ 8000 rpm                                          |
  | Max Power (bhp/rpm)                                         |
  +-------------------------------------------------------------+
  | 14 Nm @ 6500 rpm                                            |
  | Max Torque (NM/rpm)                                         |
  +-------------------------------------------------------------+
  | ![link image][downloadIcon] Brochure                       |
  +-------------------------------------------------------------+
  | View Full Specifications ![link image][arrowIcon]          |
  +-------------------------------------------------------------+
    