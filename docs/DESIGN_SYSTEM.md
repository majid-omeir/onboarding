# Design System & Brand Guidelines

## Brand Identity

### Color Palette

**Primary Colors**
- Primary Blue: `#0066CC` - Main CTA buttons, links, highlights
- Primary Dark: `#004499` - Hover states, active elements
- Primary Light: `#E6F3FF` - Background accents, subtle highlights

**Neutral Colors**
- Gray 900: `#1A1A1A` - Main text, headings
- Gray 700: `#4A4A4A` - Secondary text
- Gray 500: `#9CA3AF` - Placeholder text, disabled elements
- Gray 300: `#D1D5DB` - Borders, dividers
- Gray 100: `#F3F4F6` - Background, cards
- Gray 50: `#F9FAFB` - Page background

**Semantic Colors**
- Success: `#10B981` - Completed steps, success messages
- Warning: `#F59E0B` - Warnings, attention needed
- Error: `#EF4444` - Errors, validation failures
- Info: `#3B82F6` - Information, tooltips

### Typography

**Font Stack**
- Primary: `Inter, system-ui, -apple-system, sans-serif`
- Monospace: `'Fira Code', Consolas, monospace`

**Type Scale**
- Display: 48px/52px (3rem/3.25rem) - Page titles
- H1: 36px/40px (2.25rem/2.5rem) - Section headings
- H2: 30px/36px (1.875rem/2.25rem) - Step titles
- H3: 24px/32px (1.5rem/2rem) - Component titles
- H4: 20px/28px (1.25rem/1.75rem) - Field labels
- Body Large: 18px/28px (1.125rem/1.75rem) - Important text
- Body: 16px/24px (1rem/1.5rem) - Default text
- Body Small: 14px/20px (0.875rem/1.25rem) - Captions, metadata
- Caption: 12px/16px (0.75rem/1rem) - Fine print

### Spacing Scale

Based on 4px grid system:
- xs: 4px (0.25rem)
- sm: 8px (0.5rem)
- md: 16px (1rem)
- lg: 24px (1.5rem)
- xl: 32px (2rem)
- 2xl: 48px (3rem)
- 3xl: 64px (4rem)
- 4xl: 96px (6rem)

### Component Spacing
- Form field margin: 16px (md)
- Button padding: 12px 24px (sm lg)
- Card padding: 24px (lg)
- Section spacing: 48px (2xl)

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

**Color Contrast Requirements**
- Normal text: Minimum 4.5:1 contrast ratio
- Large text (18px+ or 14px+ bold): Minimum 3:1 contrast ratio
- UI components: Minimum 3:1 contrast ratio

**Keyboard Navigation**
- All interactive elements must be keyboard accessible
- Visible focus indicators required
- Logical tab order maintained
- Skip links for main content areas

**Screen Reader Support**
- Semantic HTML structure
- ARIA labels for complex components
- Form labels properly associated
- Status messages announced appropriately

**Visual Design**
- No reliance on color alone for information
- Sufficient visual hierarchy through size and contrast
- Responsive design for 320px minimum width
- Text can be zoomed to 200% without horizontal scrolling

### Form Accessibility
- Required fields clearly marked
- Error messages associated with form controls
- Field validation provides clear feedback
- Progress indication for multi-step forms

## Component Guidelines

### Buttons
- Primary: Blue background, white text
- Secondary: White background, blue border and text
- Minimum 44x44px touch target
- 8px border radius
- Loading states with spinner
- Disabled states with reduced opacity

### Form Fields
- 16px minimum font size (prevents zoom on mobile)
- Clear label placement above fields
- Placeholder text for guidance only
- Error states with red border and message
- Success states with green border

### Progress Indicator
- 5 steps, 20% each
- Active step highlighted in primary blue
- Completed steps with success green
- Remaining steps in neutral gray
- Step numbers or icons for clarity

### Cards
- 8px border radius
- Subtle shadow for elevation
- 24px internal padding
- White background on gray page
- Hover states for interactive cards

## Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px  
- Desktop: 1024px+

### Mobile-First Approach
- Design for mobile first
- Progressive enhancement for larger screens
- Touch-friendly interaction targets
- Optimized for single-hand use

## Animation & Micro-interactions

### Timing
- Fast: 150ms - Hover states, simple transitions
- Medium: 300ms - Page transitions, modals
- Slow: 500ms - Complex animations, page loads

### Easing
- Ease-out: UI element entrances
- Ease-in: UI element exits
- Ease-in-out: State changes

### Reduced Motion
- Respect prefers-reduced-motion
- Provide static alternatives
- Focus on functional over decorative animation