
# Vehicle Specifications Block

A visually stunning and interactive block showcasing vehicle specifications with animated images, feature highlights, and a modal with tabbed detailed specifications.

## JSON Model

```json
[
  {
    "id": "vehicle-specifications",
    "fields": [
      {
        "component": "reference",
        "name": "entryImage"
      },
      {
        "component": "reference",
        "name": "entryMobileImage"
      },
      {
        "component": "reference",
        "name": "middleImage"
      },
      {
        "component": "reference",
        "name": "middleMobileImage"
      },
      {
        "component": "reference",
        "name": "lastImage"
      },
      {
        "component": "reference",
        "name": "lastMobileImage"
      },
      {
        "component": "richtext",
        "name": "features"
      },
      {
        "component": "reference",
        "name": "brochure"
      },
      {
        "component": "text",
        "name": "brochureText"
      },
      {
        "component": "text",
        "name": "viewSpecificationsText"
      },
      {
        "component": "text",
        "name": "modalTitle"
      }
    ]
  },
  {
    "id": "specification-tab",
    "fields": [
      {
        "component": "text",
        "name": "tabTitle"
      },
      {
        "component": "richtext",
        "name": "tabContent"
      }
    ]
  }
]
```

## Sample Data

```json
{
  "entryImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Web_01.png",
  "entryMobileImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Mob_01.png",
  "middleImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Web_02.png",
  "middleMobileImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Mob_02.png",
  "lastImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Web_03.png",
  "lastMobileImage": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/specification/Xoom_160_Mob_03.png",
  "features": "<ul><li><ul><li>156cc</li><li>Displacement</li></ul></li><li><ul><li>10.9 kw @ 8000 rpm</li><li>Max Power (bhp/rpm)</li></ul></li><li><ul><li>14 Nm @ 6500 rpm</li><li>Max Torque (NM/rpm)</li></ul></li></ul>",
  "brochure": "/content/dam/hero-commerce/in/en/products/scooters/content-fragments/xoom-160/assets/pdf/xoom_160_Leaflet.pdf",
  "brochureText": "Brochure",
  "viewSpecificationsText": "View Full Specifications",
  "modalTitle": "SPECIFICATIONS of XOOM 160"
}
```

## Markdown Structure

```
+------------------------------------------------------------+
| Vehicle Specifications                                    |
+============================================================+
| ![Entry Image][image0]                                    |
+------------------------------------------------------------+
| ![Entry Mobile Image][image1]                             |
+------------------------------------------------------------+
| ![Middle Image][image2]                                  |
+------------------------------------------------------------+
| ![Middle Mobile Image][image3]                           |
+------------------------------------------------------------+
| ![Last Image][image4]                                    |
+------------------------------------------------------------+
| ![Last Mobile Image][image5]                             |
+------------------------------------------------------------+
| <ul>                                                      |
|   <li>                                                    |
|     <ul>                                                  |
|       <li>156cc</li>                                      |
|       <li>Displacement</li>                              |
|     </ul>                                                 |
|   </li>                                                   |
|   <li>                                                    |
|     <ul>                                                  |
|       <li>10.9 kw @ 8000 rpm</li>                        |
|       <li>Max Power (bhp/rpm)</li>                      |
|     </ul>                                                 |
|   </li>                                                   |
|   <li>                                                    |
|     <ul>                                                  |
|       <li>14 Nm @ 6500 rpm</li>                          |
|       <li>Max Torque (NM/rpm)</li>                      |
|     </ul>                                                 |
|   </li>                                                   |
| </ul>                                                     |
+------------------------------------------------------------+
| /content/dam/hero-commerce/in/en/products/scooters/...   |
+------------------------------------------------------------+
| Brochure                                                 |
+------------------------------------------------------------+
| View Full Specifications                                 |
+------------------------------------------------------------+
| SPECIFICATIONS of XOOM 160                               |
+------------------------------------------------------------+
| Specification Tab                                         |
+------------------------------------------------------------+
| Engine                                                   |
+------------------------------------------------------------+
| <ul>                                                      |
|   <li>                                                    |
|     <ul>                                                  |
|       <li>Type</li>                                       |
|       <li>Liquid cooled, 4 Valve single cylinder SOHC</li>|
|     </ul>                                                 |
|   </li>                                                   |
|   <li>                                                    |
|     <ul>                                                  |
|       <li>Displacement</li>                              |
|       <li>156cc</li>                                     |
|     </ul>                                                 |
|   </li>                                                   |
|   ...                                                    |
| </ul>                                                     |
+------------------------------------------------------------+
| Specification Tab                                         |
+------------------------------------------------------------+
| Transmission                                             |
+------------------------------------------------------------+
| <ul>                                                      |
|   <li>                                                    |
|     <ul>                                                  |
|       <li>Type</li>                                       |
|       <li>CVT</li>                                       |
|     </ul>                                                 |
|   </li>                                                   |
|   ...                                                    |
| </ul>                                                     |
+------------------------------------------------------------+
```

## Field Descriptions

| Field | Component | Description |
|-------|-----------|-------------|
| entryImage | reference | Desktop image shown first |
| entryMobileImage | reference | Mobile image shown first |
| middleImage | reference | Desktop image shown second |
| middleMobileImage | reference | Mobile image shown second |
| lastImage | reference | Desktop image shown last |
| lastMobileImage | reference | Mobile image shown last |
| features | richtext | List of features with main heading and sub-heading |
| brochure | reference | PDF brochure download link |
| brochureText | text | Text for brochure CTA |
| viewSpecificationsText | text | Text for view specifications CTA |
| modalTitle | text | Title shown in specifications modal |
| tabTitle | text | Title of each specification tab |
| tabContent | richtext | Content of each specification tab |

## Features

* Animated image sequence with fade transitions
* Interactive feature highlights with hover effects
* Downloadable brochure link with icon
* Modal with tabbed specifications for detailed info
* Responsive design with mobile-optimized images
* Dark mode support
* Smooth animations and transitions
* Accessible with proper focus states
* Loading states for improved UX
  