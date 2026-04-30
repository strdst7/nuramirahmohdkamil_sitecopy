---
name: Surrealist Echoes
colors:
  surface: '#171305'
  surface-dim: '#171305'
  surface-bright: '#3e3926'
  surface-container-lowest: '#110e02'
  surface-container-low: '#1f1c0b'
  surface-container: '#23200f'
  surface-container-high: '#2e2a18'
  surface-container-highest: '#393522'
  on-surface: '#ebe2c8'
  on-surface-variant: '#d5c4af'
  inverse-surface: '#ebe2c8'
  inverse-on-surface: '#35301e'
  outline: '#9d8e7c'
  outline-variant: '#504535'
  surface-tint: '#fdba49'
  primary: '#ffc66b'
  on-primary: '#432c00'
  primary-container: '#e8a838'
  on-primary-container: '#5f3f00'
  inverse-primary: '#805600'
  secondary: '#a4c9ff'
  on-secondary: '#00315d'
  secondary-container: '#0164b4'
  on-secondary-container: '#d0e1ff'
  tertiary: '#eac9b4'
  on-tertiary: '#402c1e'
  tertiary-container: '#cdae9a'
  on-tertiary-container: '#584132'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddaf'
  primary-fixed-dim: '#fdba49'
  on-primary-fixed: '#281800'
  on-primary-fixed-variant: '#614000'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004883'
  tertiary-fixed: '#fedcc7'
  tertiary-fixed-dim: '#e1c0ac'
  on-tertiary-fixed: '#29180b'
  on-tertiary-fixed-variant: '#594233'
  background: '#171305'
  on-background: '#ebe2c8'
  surface-variant: '#393522'
typography:
  headline-lg:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '200'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-md:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '300'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Newsreader
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Newsreader
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  meridian: 1.5rem
  horizon: 4rem
  fluid-gap: 2.5rem
  drip: 0.75rem
---

## Brand & Style

This design system is a subversion of digital order, trading the cold logic of the grid for the subconscious rhythm of a dream. It draws heavily from **Surrealism** and **Tactile Skeuomorphism**, where elements appear to yield to gravity, heat, or internal pressure. The target audience includes avant-garde creators, luxury boutique curators, and experimental storytellers who value emotional resonance over rigid utility.

The UI should evoke a sense of "soft persistence"—objects feel permanent yet malleable. By blending organic, melting forms with high-fidelity textures, the interface transforms from a mere tool into an imaginative landscape. The emotional response is one of curiosity, wonder, and a slight, pleasant disorientation that invites exploration.

## Colors

The palette mimics the light of a perpetual Catalan sunset. 
- **Sunset Gold (Primary):** Used for interactive elements and focal points, representing the searing light of the desert sun.
- **Ethereal Blue (Secondary):** A drifting, celestial shade used for accents, highlights, and "fluid" backgrounds that suggest the sea or the sky.
- **Deep Desert Shadow (Tertiary):** A rich, near-black umber used for backgrounds to provide high-contrast depth and a sense of vast, empty space.
- **Bone Parchment (Neutral):** An off-white used for primary text and delicate borders, evoking the bleached textures of found objects.

Gradients should be non-linear and "bruised," blending gold into deep shadows with unexpected mid-tones of violet or ochre.

## Typography

The typography strategy relies on the tension between the intellectual and the eccentric. 
- **Display & Headlines:** Using **Epilogue** in light weights creates an airy, slightly stretched feeling that mimics tall, thin-legged creatures or elongated shadows. 
- **Body Text:** **Newsreader** provides a literary, classic grounding to the dreamscape, ensuring that even in a surreal world, the narrative remains legible and authoritative.
- **Labels & Micro-copy:** **Space Grotesk** adds a subtle "future-technical" contrast, acting like the precise markings on a biological specimen or an architectural sketch.

Text alignment should occasionally drift; headlines can be slightly offset or vertically staggered to break the horizontal line.

## Layout & Spacing

This design system rejects the "Blueprint" grid in favor of a **Fluid, Asymmetric Flow**. Elements are not placed on a grid but are instead "dropped" into the space, weighted by their importance. 

- **The Flow:** Layouts should use variable padding that expands and contracts. Margins are never uniform; a left margin might be 4rem while the right is 1.5rem, creating a sense of leaning or drifting.
- **Organic Grouping:** Rather than boxes, use "clumping." Related elements should feel like they are floating in the same gravitational pull.
- **Negative Space:** Large, yawning expanses of background color are encouraged to simulate the isolation found in surrealist paintings.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ethereal Blurs**, mimicking the hazy distance of a dream.
- **Melting Shadows:** Shadows are not uniform. They are elongated and cast at extreme angles (e.g., `40px 10px 60px rgba(0,0,0,0.4)`), making components feel as though they are standing in a low-sun desert.
- **Atmospheric Perspective:** Background elements should have a slight radial blur, while foreground interactive elements remain crisp but fluid in shape.
- **Glassmorphism:** Use semi-transparent, amber-tinted "glass" surfaces for overlays, creating a sense of looking through a distorted lens or a resin-preserved artifact.

## Shapes

The shape language is the core of the surrealist identity. Rigid rectangles are forbidden.
- **The "Melt":** Use `border-radius` values that are inconsistent on each corner (e.g., `60% 40% 30% 70% / 60% 30% 70% 40%`) to create blob-like, organic containers.
- **Warped Containers:** Cards and buttons should appear slightly "heavy" at the bottom, as if they are beginning to liquefy.
- **Organic Borders:** Use thin, fluctuating strokes that vary in opacity, suggesting a hand-drawn or etched line rather than a digital vector.

## Components

- **Buttons:** Primary buttons should be "Pulse-like" shapes—ellipsoids that are slightly irregular. On hover, they should "inflate" slightly (scale 1.05) rather than just changing color.
- **Chips & Tags:** These should resemble small pebbles or smooth sea glass, using the Ethereal Blue with a high backdrop-blur.
- **Inputs:** Text fields should not have four walls. Use a single, "dripping" bottom border that undulates when focused.
- **Cards:** Cards should lack hard corners and use the "Melting Shadow" effect. The content inside should be loosely aligned, floating within the organic container.
- **Lists:** Instead of bullet points, use small "ant" or "crutch" icons—recurring surrealist motifs—to mark list items.
- **The "Watch" Loader:** A custom loading component inspired by a melting clock, where the frame of the circle sags toward the bottom of the screen as it spins.
- **Floating Navigation:** A bottom-anchored, pill-shaped dock that uses a strong glassmorphism effect, making it appear to float above the "sand" of the page content.