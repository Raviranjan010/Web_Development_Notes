# ⚡ Components Tricks: Refactoring & Architecture Workflows

## 1. The "Three Signals" for Component Extraction

Deciding when to split a large component into smaller ones is a key architectural skill. Avoid premature optimization, but refactor when you hit any of these three signals:

1. **The Scroll Signal**: If you have to scroll through more than two pages (approx. 150-200 lines) of a single component file to understand its template layout, it is too large. Split it by visual sections (e.g. `Header`, `Sidebar`, `FormSection`).
2. **The Duplicate State Signal**: If you find yourself duplicating state logic across multiple files (e.g. modals opening/closing, dropdown toggling), extract the UI wrapper or state logic into a separate reusable component or custom hook.
3. **The Multi-Purpose Signal**: If a component is handling multiple responsibilities (e.g., fetching data, validating forms, and rendering charts), split it. Create a container component to handle data operations, and presentational components to handle the UI.

---

## 2. Folder-Per-Component Structure with Barrel Exports

Instead of piling components into a single massive `components/` directory, organize them as self-contained feature modules:

### Directory Layout
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.jsx       # Component logic
│   │   ├── Button.css       # Scoped styles
│   │   ├── Button.test.jsx  # Tests
│   │   └── index.js         # Barrel export file
```

### The Barrel Export (`index.js`) Trick
Inside `Button/index.js`, write:
```javascript
// Exposes the component to the outside folder
export { default } from './Button';
// Or if you use named exports:
// export * from './Button';
```

#### Why use this?
It allows clean import routes while keeping folder structures isolated.
- **Without Barrel Export**: `import Button from '../components/Button/Button';` (redundant naming)
- **With Barrel Export**: `import Button from '../components/Button';`

*Note: Be careful in large monorepos, as massive barrel exports at the root level can occasionally slow down development bundling and hot module replacement.*

---

## 3. Scope-Based Naming Conventions

When building complex applications, simple component names like `Card` or `Item` quickly lead to name collisions. Enforce a **Domain-First** prefixing schema:

```
[Domain] - [Sub-Domain] - [ComponentType]
```

### Refactoring Examples
- `Card` $\rightarrow$ `ProductCard`, `UserCard`, `BillingCard`
- `ListItem` $\rightarrow$ `FeedTweetListItem`, `AdminLogListItem`
- `Form` $\rightarrow$ `AuthLoginForm`, `CheckoutBillingForm`

This ensures that related files group together alphabetically in file trees, making them easier to navigate.

---

## 4. Self-Documenting Component Trick with Inline Types

You can make components self-documenting in modern IDEs (like VS Code) without full TypeScript. By combining ES6 destructuring defaults with standard React JSDoc, you get autocomplete tooltips when hovering over components in other files.

```jsx
import React from 'react';

/**
 * Custom alert badge with dynamic status styling.
 * 
 * @param {object} props
 * @param {string} props.label - The text visible inside the badge.
 * @param {'info' | 'warning' | 'error'} props.variant - The theme state selector.
 * @param {boolean} [props.isDismissible=false] - Whether a close action is rendered.
 */
export default function AlertBadge({ 
  label, 
  variant = 'info', 
  isDismissible = false 
}) {
  return (
    <div className={`alert-badge variant-${variant}`}>
      <span>{label}</span>
      {isDismissible && <button className="close-btn">&times;</button>}
    </div>
  );
}
```
*Hovering over `<AlertBadge />` in any other file will display a complete documentation panel with type options and parameter descriptions.*
