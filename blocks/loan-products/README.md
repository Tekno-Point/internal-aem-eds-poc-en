
# Loan Products

## Usage

The Loan Products block displays a grid of loan product cards with icons, titles, and links. It is designed to be used on landing pages and product overview sections to provide quick access to different loan types offered by the bank.

## Fields

### Main Block Configuration

* **classes** (`multiselect`): CSS class modifiers for styling variations (e.g., `personal-loan-green-banner`).
* **heading** (`richtext`): Main heading for the loan products section. Supports rich text formatting including links and emphasis.

### Repeating Loan Product Items

Each loan product card is defined by a repeating item with the following fields:

* **icon** (`reference`): Icon image for the loan product. Recommended size is 80x80px.
* **iconAlt** (`text`): Alternative text for the icon image for accessibility.
* **title** (`text`): Title of the loan product (e.g., "Home Loan", "Business Loan").
* **link** (`reference`): URL or page reference where the loan product details are located.

## Design Details

* **Grid Layout:** Products are displayed in a responsive grid with 3 columns on desktop, 2 columns on tablets, and single column on mobile.
* **Card Style:** Each product is styled as a card with a white background, rounded corners, and shadow effects on hover.
* **Icon Display:** Icons are displayed with a fixed size of 80x80px and scale down on mobile.
* **Accessibility:** Full keyboard navigation and screen reader support including proper ARIA attributes.
* **Performance:** Optimized images with responsive breakpoints and lazy loading.
* **Animations:** Smooth hover effects and shadow transitions for interactive feedback.

## Usage Examples

1. **Product Overview Page:**
   * Place the Loan Products block below the hero section on the main product overview page.
   * Include all major loan products with icons and links.
   * Use the default styling without additional classes.

2. **Personal Loan Campaign:**
   * Use the `personal-loan-green-banner` class to apply special styling.
   * Place the block in a dedicated section for personal loans.
   * Include only personal loan products with targeted messaging.

3. **Mobile-Friendly Display:**
   * On mobile, the grid automatically stacks with proper spacing and centered content.
   * Icons and text scale down for better mobile display.
   * Hover effects are replaced with active states for touch devices.

## Accessibility Features

* ARIA labels for interactive elements.
* Keyboard navigation (Enter/Space to activate links).
* Focus visible states for better visibility.
* Semantic HTML structure with proper headings.
* High contrast mode support.
  