# DailyIO Color Implementation Guide

## Table of Contents
- [Color Definitions](#color-definitions)
- [Basic Components](#basic-components)
- [Complex Components](#complex-components)
- [Page-Specific Guidelines](#page-specific-guidelines)
- [Interactive States](#interactive-states)
- [Dark Mode Adaptations](#dark-mode-adaptations)

## Color Definitions

```css
:root {
    --russian-violet: #2A1E5C;
    --night: #0A0F0D;
    --red-crayola: #EE4266;
    --thistle: #F0D3F7;
    --tea-green: #CAFFD0;
    
    /* Opacity Variants */
    --russian-violet-80: rgba(42, 30, 92, 0.8);
    --night-60: rgba(10, 15, 13, 0.6);
    --thistle-15: rgba(240, 211, 247, 0.15);
}
```

## Basic Components

### Buttons

```css
/* Primary Button */
.btn-primary {
    background-color: var(--red-crayola);
    color: white;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: #d63b5c; /* Darker shade */
    box-shadow: 0 2px 4px rgba(238, 66, 102, 0.2);
}

/* Secondary Button */
.btn-secondary {
    background-color: var(--russian-violet);
    color: white;
}

/* Ghost Button */
.btn-ghost {
    border: 2px solid var(--night);
    color: var(--night);
    background: transparent;
}
```

### Form Elements

```css
/* Input Fields */
.input-field {
    border: 1px solid var(--night-60);
    background-color: white;
}

.input-field:focus {
    border-color: var(--russian-violet);
    box-shadow: 0 0 0 3px rgba(42, 30, 92, 0.1);
}

/* Checkbox */
.checkbox:checked {
    background-color: var(--russian-violet);
    border-color: var(--russian-violet);
}
```

### Navigation

```css
.nav-primary {
    background-color: var(--russian-violet);
    color: white;
}

.nav-item {
    color: rgba(255, 255, 255, 0.8);
}

.nav-item.active {
    color: white;
    border-bottom: 2px solid var(--red-crayola);
}
```

## Complex Components

### Cards

```css
/* News Card */
.news-card {
    background: white;
    border: 1px solid rgba(10, 15, 13, 0.1);
}

.news-card__category {
    color: var(--red-crayola);
}

.news-card__title {
    color: var(--night);
}

.news-card__metadata {
    color: var(--night-60);
}

/* Weather Card */
.weather-card {
    background: linear-gradient(135deg, var(--russian-violet), #3a2b7c);
    color: white;
}

.weather-card__temperature {
    color: var(--thistle);
}
```

### Alert Components

```css
/* Success Alert */
.alert-success {
    background-color: var(--tea-green);
    border-left: 4px solid var(--russian-violet);
    color: var(--night);
}

/* Error Alert */
.alert-error {
    background-color: var(--red-crayola);
    color: white;
}

/* Info Alert */
.alert-info {
    background-color: var(--thistle-15);
    border-left: 4px solid var(--russian-violet);
}
```

### Dashboard Widgets

```css
.widget {
    background: white;
    border: 1px solid rgba(10, 15, 13, 0.1);
}

.widget__header {
    border-bottom: 2px solid var(--thistle);
}

.widget__title {
    color: var(--russian-violet);
}

/* Stats Widget */
.stats-widget__number {
    color: var(--red-crayola);
}

.stats-widget__label {
    color: var(--night-60);
}
```

## Page-Specific Guidelines

### Landing Page

```css
.hero-section {
    background: linear-gradient(135deg, var(--russian-violet), #3a2b7c);
    color: white;
}

.feature-section {
    background-color: var(--thistle-15);
}

.feature-card {
    background: white;
    border-top: 3px solid var(--red-crayola);
}
```

### News Section

```css
.news-category-tab {
    color: var(--night-60);
}

.news-category-tab.active {
    color: var(--red-crayola);
    border-bottom: 2px solid var(--red-crayola);
}

.news-filter {
    background-color: var(--thistle-15);
}
```

### Games Section

```css
.game-card {
    background: white;
    border: 2px solid var(--thistle);
}

.game-card:hover {
    border-color: var(--red-crayola);
}

.game-stats {
    color: var(--russian-violet);
}

.game-progress-bar {
    background-color: var(--tea-green);
}
```

## Interactive States

### Loading States

```css
.loading-spinner {
    border: 3px solid var(--thistle);
    border-top: 3px solid var(--red-crayola);
}

.skeleton-loader {
    background: linear-gradient(
        90deg,
        var(--thistle-15),
        rgba(255, 255, 255, 0.5),
        var(--thistle-15)
    );
}
```

### Progress Indicators

```css
.progress-bar {
    background-color: var(--thistle-15);
}

.progress-bar__fill {
    background-color: var(--russian-violet);
}

.progress-bar--success .progress-bar__fill {
    background-color: var(--tea-green);
}
```

### Tooltips

```css
.tooltip {
    background-color: var(--night);
    color: white;
}

.tooltip::after {
    border-color: var(--night) transparent transparent transparent;
}
```

## Dark Mode Adaptations

```css
[data-theme="dark"] {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    
    .card {
        background-color: var(--bg-secondary);
        border-color: var(--russian-violet);
    }
    
    .text-primary {
        color: var(--thistle);
    }
    
    .btn-ghost {
        border-color: var(--thistle);
        color: var(--thistle);
    }
}
```

### Component-Specific Dark Mode

```css
[data-theme="dark"] {
    .news-card {
        background-color: var(--bg-secondary);
    }
    
    .weather-card {
        background: linear-gradient(135deg, #1a1a1a, var(--russian-violet));
    }
    
    .alert-success {
        background-color: rgba(202, 255, 208, 0.1);
    }
}
```

## Accessibility Notes

- Maintain minimum contrast ratio of 4.5:1 for text
- Use darker shades of Tea Green (#CAFFD0) for better contrast when used with text
- Ensure interactive elements have visible focus states using Russian Violet (#2A1E5C)

---

### Usage Examples in Components

```jsx
// Button Component Example
const Button = ({ variant = 'primary', children }) => {
    const baseStyles = 'px-4 py-2 rounded transition-all duration-300';
    const variants = {
        primary: 'bg-[#EE4266] text-white hover:bg-[#d63b5c]',
        secondary: 'bg-[#2A1E5C] text-white hover:bg-[#231a4d]',
        ghost: 'border-2 border-[#0A0F0D] text-[#0A0F0D] hover:bg-[#0A0F0D] hover:text-white'
    };
    
    return (
        <button className={`${baseStyles} ${variants[variant]}`}>
            {children}
        </button>
    );
};
```