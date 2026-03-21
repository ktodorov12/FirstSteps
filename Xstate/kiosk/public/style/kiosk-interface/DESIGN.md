# Design System Specification: The Kinetic Roast

## 1. Overview & Creative North Star
**The Creative North Star: "Precision Nocturne"**
This design system moves beyond the "standard dark mode" by treating the interface as a high-end, physical kiosk experience. It is rooted in the concept of *Precision Nocturne*—where the deep, light-absorbing blacks of a premium espresso machine meet the energetic, high-vis radiance of molten amber. 

We break the "template" look by eschewing traditional grid lines in favor of **Tonal Carving**. The UI isn't built with borders; it is sculpted from the shadows using varied depths of charcoal and black. Intentional asymmetry in typography and generous, oversized touch targets create a layout that feels editorial yet highly functional for a fast-paced retail environment.

---

## 2. Colors & Surface Architecture
The palette is engineered to pull the user’s eye toward the "Liquid Gold" actions while maintaining a sophisticated, low-fatigue background.

### The Palette (Material Design Tokens)
*   **Background / Surface Dim:** `#0e0e0e` (The base "Roasted" black)
*   **Primary (Action):** `#ffd16f` / **Primary Container:** `#ffbf00` (The "Amber Pulse")
*   **Secondary:** `#fed73e` (The "Steam" accent)
*   **Surface Container (Low to Highest):** `#131313` to `#262626` (The "Carved" layers)

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to section off content. 
*   **The Technique:** Boundaries must be defined solely through background color shifts. A `surface-container-low` card sitting on a `surface` background provides all the definition needed. 
*   **Nesting:** Use the surface-container tiers (`Lowest` to `Highest`) to create depth. For example, a drink selection card (`surface-container-high`) lives inside a category section (`surface-container-low`). This creates a "stacked paper" effect that feels premium and tactile.

### Glass & Signature Textures
To add "soul" to the kiosk, use **Glassmorphism** for floating overlays (e.g., "Order Summary" drawers). 
*   **The Spec:** Use `surface-container-highest` at 70% opacity with a `24px` backdrop blur.
*   **Subtle Gradients:** While we avoid complex multi-color ramps, use a subtle "Internal Glow" on Primary CTAs by transitioning from `primary` (#ffd16f) to `primary-container` (#ffbf00) at a 135-degree angle.

---

## 3. Typography
We utilize a high-contrast pairing: **Plus Jakarta Sans** for expressive moments and **Inter** for utilitarian data.

*   **Display (Plus Jakarta Sans):** Used for "Hero" moments like coffee names or price totals. Large scales (3.5rem) with tight letter-spacing (-2%) create an authoritative, editorial feel.
*   **Headline (Plus Jakarta Sans):** Used for category titles. These should be bold and unapologetic.
*   **Body & Labels (Inter):** Used for ingredient lists and nutrition facts. Inter’s high x-height ensures legibility even in low-light kiosk environments.

**Hierarchy Strategy:** Brand identity is conveyed through "The Big and the Small." We pair massive `display-lg` prices with tiny, all-caps `label-sm` descriptors. This extreme contrast removes the "mid-range" clutter found in generic apps.

---

## 4. Elevation & Depth
In this system, elevation is a product of **Light and Tone**, not structure.

*   **The Layering Principle:** Stacking tiers (e.g., `surface-container-lowest` on `surface-container-low`) creates a "negative lift"—the appearance of a card being carved *into* the surface rather than sitting on top.
*   **Ambient Shadows:** For floating elements (like a "Customize" modal), use a "Roasted Shadow." 
    *   *Spec:* `Y: 20px, Blur: 40px, Spread: 0, Color: rgba(0, 0, 0, 0.6)`. 
    *   Avoid grey shadows; shadows must be deep black to maintain the sleek "Nocturne" aesthetic.
*   **The Ghost Border Fallback:** If accessibility requires a border, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary (The Kinetic Button):** `primary-container` background, `on-primary-fixed` text. Large height (minimum 64px for touch). 
    *   *Detail:* Use `xl` (1.5rem) corner radius to match the "soft modular" theme.
*   **Tertiary:** No background. `primary` text. Used for "Cancel" or "Back" to keep the focus on the conversion path.

### Cards (The Modular Hero)
*   **Style:** `surface-container-high` background. No borders.
*   **Interaction:** On tap/touch, the background should shift to `surface-container-highest`.
*   **Rule:** Forbid divider lines within cards. Use `spacing-4` (1.4rem) to separate the coffee image from the text description.

### Input Fields (The Customizer)
*   **Style:** `surface-container-lowest` (sunken effect). 
*   **Active State:** The indicator is a 2px bottom-bar in `primary` (#FFBF00), rather than a full box stroke.

### Specialized Kiosk Components
*   **The "Pour" Progress Bar:** A thick (12px) track using `surface-container-highest` with a `primary` fill. As the coffee pours, the fill should have a slight "pulse" animation.
*   **Oversized Selection Chips:** For milk and sugar options. Use `xl` rounding and `surface-variant` backgrounds. Selected state = `primary-container`.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use the `xl` (1.5rem) corner radius for all primary containers to evoke a "friendly-modern" feel.
*   **Do** use "Optical Spacing"—give the coffee images more room than the text to make the UI feel breathable.
*   **Do** use `primary` (#FFBF00) sparingly. If everything is orange, nothing is important.

### Don'ts
*   **Don't** use 100% white text for body copy. Use `on-surface-variant` (#adaaaa) to reduce glare on physical kiosk screens.
*   **Don't** use "Drop Shadows" on cards that are part of the main layout. Only use shadows for elements that physically overlap others (modals, toasts).
*   **Don't** use standard "Line Icons." Use solid, bold-weight icons to match the "Precision Nocturne" weight.