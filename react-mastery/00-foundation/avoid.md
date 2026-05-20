# 🚫 Foundation Avoids: Common Mistakes and Anti-Patterns

## 1. Using Create React App (CRA) in 2024+

**The Mistake**: Initializing projects using `npx create-react-app`.
**Why it is bad**: CRA is dead. It has not been updated since 2022, is built on a heavy and slow Webpack config, and does not support modern build optimizations. Dev server startup and hot-reloading (HMR) times degrade exponentially as the codebase grows.

### Dev Build Benchmark Table: Vite vs CRA
| Metric | Create React App (Webpack) | Vite (esbuild/Rollup) |
| :--- | :--- | :--- |
| **Dev Server Cold Start** | 8.2s - 25s (bundles entire project) | **150ms - 500ms** (native ESM, dynamic load) |
| **Hot Module Replacement** | 1.5s - 5s (re-bundles updated module) | **<50ms** (updates only changed files) |
| **Production Build Time** | Slow | **Fast (esbuild transpilation)** |
| **Config Customization** | Requires "ejecting" (irreversible) | Simple config file (`vite.config.js`) |

**The Correction**: Initialize your projects using Vite for SPA apps, or Next.js/Remix for server-rendered apps.

---

## 2. Confusing React with a Framework

**The Mistake**: Expecting React to handle routing, HTTP requests, and form validation out of the box, or organizing files like an Angular/NestJS application.
**Why it is bad**: React is a UI *library*, not a framework. It does not dictate how you manage state, fetch data, or route users.
- **Framework**: Dictates structure, calls your code, and supplies the tools. You fit your code into their structure (e.g., Angular, NestJS, Next.js).
- **Library**: You call the library's functions. You maintain control over architecture and integrate other libraries as needed (e.g., Axios, React Router, Zustand).

**The Correction**: Understand that building a React app requires constructing an ecosystem. If you want an opinionated, batteries-included environment, use a framework built *on top* of React, like **Next.js** or **Remix**.

---

## 3. Modifying the DOM Directly

**The Mistake**: Mixing jQuery or vanilla DOM selection methods (`document.querySelector`, `element.classList.add`) with React state changes.

### ❌ Bad Code
```jsx
// Direct DOM modification bypassing the Virtual DOM
import React from 'react';

export default function BrokenToggle() {
  const handleToggle = () => {
    // ❌ DANGER: Mutating the DOM directly. 
    // React has no knowledge of this change, and the real DOM will be overwritten on next render.
    const element = document.getElementById('card-widget');
    if (element) {
      element.style.backgroundColor = '#ff0000';
    }
  };

  return (
    <div id="card-widget" style={{ padding: '20px', backgroundColor: '#eee' }}>
      <h4>Dashboard Widget</h4>
      <button onClick={handleToggle}>Change Color</button>
    </div>
  );
}
```

### ✅ Good Code
```jsx
// Declarative state update driving the UI
import React, { useState } from 'react';

export default function CorrectToggle() {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(prev => !prev);
  };

  return (
    <div 
      style={{ 
        padding: '20px', 
        backgroundColor: isActive ? '#ff0000' : '#eee',
        transition: 'background-color 0.3s ease'
      }}
    >
      <h4>Dashboard Widget</h4>
      <button onClick={handleToggle}>Change Color</button>
    </div>
  );
}
```
**Why the fix works**: The UI is now a direct projection of the `isActive` state. When state updates, React builds a new VDOM, detects the style change, and updates the real DOM safely.

---

## 4. Treating React like jQuery (Imperative State Updates)

**The Mistake**: Using variables or DOM reads to hold the state of your application.

### ❌ Bad Code
```jsx
// Imperative mindset: Reading from the DOM to calculate next state
import React from 'react';

export default function ImperativeForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // ❌ Reading values imperatively from DOM elements
    const email = document.getElementById('email-input').value;
    const newsletter = document.getElementById('newsletter-check').checked;
    
    console.log("Submitting:", { email, newsletter });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" id="email-input" />
      <input type="checkbox" id="newsletter-check" />
      <button type="submit">Subscribe</button>
    </form>
  );
}
```

### ✅ Good Code
```jsx
// Declarative mindset: React state acts as the single source of truth
import React, { useState } from 'react';

export default function DeclarativeForm() {
  const [email, setEmail] = useState('');
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { email, subscribeNewsletter });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Enter email"
      />
      <label>
        <input 
          type="checkbox" 
          checked={subscribeNewsletter} 
          onChange={(e) => setSubscribeNewsletter(e.target.checked)}
        />
        Subscribe to newsletter
      </label>
      <button type="submit">Subscribe</button>
    </form>
  );
}
```

---

## 5. Not Understanding Re-rendering Triggers

**The Mistake**: Believing that changes to local variables or prop modifications in a child component will trigger a visual update.
**Why it is bad**: React does not observe variables. It only tracks state changes initiated by state setters (`useState`, `useReducer`) or Context changes.

### ❌ Bad Code
```jsx
import React from 'react';

export default function BrokenCounter() {
  // ❌ A local variable will reset to 0 on every single render cycle.
  // Modifying it does NOT trigger a re-render.
  let clickCount = 0;

  const handleClick = () => {
    clickCount += 1;
    console.log("Internal count:", clickCount); // Will increment in console, UI will remain '0'
  };

  return (
    <div>
      <p>Clicks: {clickCount}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
```

### ✅ Good Code
```jsx
import React, { useState } from 'react';

export default function WorkingCounter() {
  // ✅ State setter notifies React that the UI needs to be updated.
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <div>
      <p>Clicks: {clickCount}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
```

---

## 6. Putting Business Logic Inside JSX

**The Mistake**: Embedding complex array manipulations, calculations, or inline conditional chains directly in the return statement.

### ❌ Bad Code
```jsx
import React from 'react';

export default function BadInvoiceList({ invoices }) {
  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        {/* ❌ Messy inline logic, maps, and filtering directly in the JSX block */}
        {invoices
          .filter(inv => inv.status === 'PAID' && inv.amount > 100)
          .map(inv => {
            const tax = inv.amount * 0.15;
            const total = inv.amount + tax;
            return (
              <li key={inv.id}>
                Invoice #{inv.id}: ${total.toFixed(2)} (Tax: ${tax.toFixed(2)})
              </li>
            );
          })}
      </ul>
    </div>
  );
}
```

### ✅ Good Code
```jsx
import React from 'react';

export default function GoodInvoiceList({ invoices }) {
  // ✅ Core business logic extracted above the return block. JSX remains clean.
  const eligibleInvoices = invoices
    .filter(inv => inv.status === 'PAID' && inv.amount > 100)
    .map(inv => {
      const tax = inv.amount * 0.15;
      return {
        id: inv.id,
        total: inv.amount + tax,
        tax
      };
    });

  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        {eligibleInvoices.map(invoice => (
          <li key={invoice.id}>
            Invoice #{invoice.id}: ${invoice.total.toFixed(2)} (Tax: ${invoice.tax.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 7. Importing React in Every Component File

**The Mistake**: Writing `import React from 'react';` at the top of every JSX file.
**Why it is bad**: It is redundant. Since React 17 (released in 2020), build tools use the **New JSX Transform**, which automatically imports the necessary runtime utilities under the hood. Adding it manually increases bundle clutter.

**The Correction**: Omit `import React from 'react'` in standard files unless you specifically require core hooks (e.g., `import { useState } from 'react'`).
