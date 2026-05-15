# Styles

Global CSS lives in `globals.css`.

It contains:

- Tailwind imports
- Theme CSS variables
- Global reset rules
- Base body styles
- Browser autofill styling for dark inputs

## Theme Variables

```css
--bg-primary
--bg-surface
--bg-border
--text-primary
--text-secondary
--accent
--accent-hover
--danger
--danger-hover
--warning
--success
```

Use these variables through Tailwind arbitrary values:

```jsx
className="bg-[var(--bg-primary)] text-[var(--text-primary)]"
```

Keep one-off component styling in the component. Move styling here only when it is global, theme-level, or needed by browser pseudo-classes.
