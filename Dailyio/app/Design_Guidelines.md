# DailyIO Design System Guidelines

## Table of Contents
- [Color Palette](#color-palette)
- [Design Principles](#design-principles)
- [Implementation Guidelines](#implementation-guidelines)
- [Component Library](#component-library)
- [Accessibility Standards](#accessibility-standards)
- [Best Practices](#best-practices)

## Color Palette

Our design system utilizes a carefully selected color palette that balances professionalism with user engagement while maintaining visual harmony.

### Primary Colors

| Color Name      | Hex Code | Sample | Usage |
|----------------|----------|---------|--------|
| Russian Violet | #2A1E5C  | <button style="background-color:#2A1E5C; color: white; border: none; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;"></button>      | Primary brand color, headers, key UI elements |
| Night          | #0A0F0D  | <button style="background-color:#0A0F0D; color: white; border: none; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;"></button>      | Text, borders, icons |
| Red Crayola    | #EE4266  | <button style="background-color:#EE4266; color: white; border: none; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;"></button>      | Call-to-action, alerts, emphasis |
| Thistle        | #F0D3F7  | <button style="background-color:#F0D3F7; color: white; border: none; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;"></button>      | Background accents, secondary elements |
| Tea Green      | #CAFFD0  | <button style="background-color:#CAFFD0; color: white; border: none; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;"></button>      | Success states, positive indicators |

> **Note**: Color Application Note: Each color has been carefully selected to ensure minimal eye strain while maintaining clear visual hierarchy. When implementing these colors, always refer to the usage guidelines to maintain consistency across the platform.
---
### Color Combinations

For optimal visual harmony, use these recommended combinations:

1. **Primary Content**
   - Background: White
   - Text: Night (#0A0F0D)
   - Accents: Russian Violet (#2A1E5C)

2. **Call-to-Action Elements**
   - Button Background: Red Crayola (#EE4266)
   - Button Text: White
   - Hover State: Darkened Red Crayola (use 10% darker)

3. **Success States**
   - Background: Tea Green (#CAFFD0)
   - Text: Night (#0A0F0D)
   - Icons: Russian Violet (#2A1E5C)

4. **Information Sections**
   - Background: Thistle (#F0D3F7) at 15% opacity
   - Text: Night (#0A0F0D)
   - Borders: Russian Violet (#2A1E5C)

[Refer comprehensive color guidelines](Dailyio\app\Color_Guidelines.md)

---

## Design Principles

### 1. Visual Hierarchy 🎯

Strong visual hierarchy guides users through content naturally:

```scss
// Example of text hierarchy
h1 {
    color: #2A1E5C;  // Russian Violet
    font-weight: 700;
}

h2 {
    color: #0A0F0D;  // Night
    font-weight: 600;
}

p {
    color: rgba(10, 15, 13, 0.8);  // Night with opacity
}
```

### 2. White Space Management 🌟

Maintain generous white space to improve readability:

- **Padding**: Minimum 16px between elements
- **Margins**: 24px between major sections
- **Line Height**: 1.5 for body text

### 3. Color Distribution Rule 📊

Follow the 60-30-10 rule:
1. **60%** - White/Neutral background
2. **30%** - Russian Violet (#2A1E5C)
3. **10%** - Accent colors (divided between remaining colors)

[Refer Font Guidelines](Dailyio\app\Font_Guidelines.md)

---

## Implementation Guidelines

### Button Hierarchy

```jsx
// Primary Button
<button className="bg-[#EE4266] text-white">
    Sign Up Now
</button>

// Secondary Button
<button className="bg-[#2A1E5C] text-white">
    Learn More
</button>

// Tertiary Button
<button className="border-2 border-[#0A0F0D]">
    Cancel
</button>
```

### Background Usage

**✅ DO**
- Use white as the primary background
- Apply Thistle (#F0D3F7) at 10-15% opacity for section differentiation
- Use Tea Green (#CAFFD0) for success-related sections

**❌ DON'T**
- Use dark backgrounds for extended content areas
- Mix more than two background colors in the same section
- Apply full-opacity accent colors to large areas

---

## Component Library

### Alert Types

```jsx
// Success Alert
<div className="bg-[#CAFFD0] border-l-4 border-[#2A1E5C] p-4">
    Success Message
</div>

// Error Alert
<div className="bg-[#EE4266] text-white p-4">
    Error Message
</div>

// Info Alert
<div className="bg-[#F0D3F7] border-l-4 border-[#2A1E5C] p-4">
    Information Message
</div>
```

### Card Components

```jsx
<div className="bg-white shadow-md rounded-lg">
    <div className="p-6">
        <h3 className="text-[#2A1E5C]">Card Title</h3>
        <p className="text-[#0A0F0D]">Card content goes here.</p>
    </div>
</div>
```

---

## Accessibility Standards

### Color Contrast Requirements

| Element Type | Minimum Ratio |
|-------------|---------------|
| Large Text   | 3:1          |
| Body Text    | 4.5:1        |
| UI Components| 3:1          |

### Focus States

All interactive elements must have:
1. Visible focus indicators
2. Minimum touch target size of 44x44px
3. Clear hover states

---

## Best Practices

### ✨ General Guidelines

1. **Typography**
   - Use system fonts for better performance
   - Maintain a maximum of 3 font sizes per section
   - Keep line length between 50-75 characters

2. **Spacing**
   - Use consistent spacing units (4px increments)
   - Maintain proper hierarchy with spacing
   - Leave adequate white space around CTAs

3. **Interactive Elements**
   - Provide visible feedback on all interactions
   - Maintain consistent hover/focus states
   - Use appropriate cursors for interactive elements

### 🎨 Color Application Tips

```css
/* Example of proper color usage */
.primary-button {
    background-color: #EE4266;
    color: white;
    transition: all 0.3s ease;
}

.primary-button:hover {
    background-color: #d63b5c;  /* Slightly darker */
}

.primary-button:focus {
    outline: 3px solid rgba(238, 66, 102, 0.5);
    outline-offset: 2px;
}
```

---

## Version Control

| Version | Date       | Changes                          |
|---------|------------|----------------------------------|
| 1.0.0   | 2025-01-17| Initial Design System Release    |
| 1.0.1   | 2025-01-17| Added Accessibility Guidelines   |

---