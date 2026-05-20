# 🚫 Components Avoids: Structure and Declaration Anti-Patterns

## 1. Defining Components Inside Other Components

**The Mistake**: Writing component declarations nested inside the render loop or function body of another component.
**Why it is bad**: This is a performance bottleneck. When the parent component re-renders, it re-declares and recreates the nested component function in memory from scratch. React views the nested component as a completely *new* component type rather than just a re-render of an existing one. As a result, React unmounts the entire child DOM subtree, destroying all its local state, focus, and input selections, and mounts a brand new DOM tree on every single render cycle.

```
[Parent Render Triggered]
          │
          ▼
[Recreate Child Component Reference] ◄── Type reference changes!
          │
          ▼
[Unmount Existing Child DOM Node]    ◄── Destroys DOM state & inputs
          │
          ▼
[Mount New Child DOM Node]           ◄── Expensive repaint
```

### ❌ Bad Code
```jsx
import React, { useState } from 'react';

export default function Dashboard() {
  const [count, setCount] = useState(0);

  // ❌ DANGER: Nested component definition.
  // Recreated on every render of Dashboard, destroying state in NestedWidget.
  const NestedWidget = () => {
    const [text, setText] = useState('');
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <h5>Widget Input</h5>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    );
  };

  return (
    <div>
      <h3>Dashboard State: {count}</h3>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
      <NestedWidget />
    </div>
  );
}
```

### ✅ Good Code
```jsx
import React, { useState } from 'react';

// ✅ CORRECT: Child component declared at module level.
// Type references are preserved. Re-rendering Parent updates Child without unmounting it.
const NestedWidget = () => {
  const [text, setText] = useState('');
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <h5>Widget Input</h5>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

export default function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>Dashboard State: {count}</h3>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
      <NestedWidget />
    </div>
  );
}
```

---

## 2. Exporting Anonymous Components

**The Mistake**: Exporting components as anonymous arrow functions or default structures directly.
**Why it is bad**: When debugging in the browser console or React DevTools, anonymous exports show up as `<Anonymous>` or `<_default>`. This makes it difficult to trace which component crashed or generated a warning in deep application trees.

### ❌ Bad Code
```jsx
// ❌ Debugging nightmare in React DevTools (renders as <Anonymous>)
import React from 'react';

export default ({ title }) => {
  return <header><h1>{title}</h1></header>;
};
```

### ✅ Good Code
```jsx
// ✅ Name is explicitly defined. DevTools matches <Header> correctly.
import React from 'react';

function Header({ title }) {
  return <header><h1>{title}</h1></header>;
}

export default Header;
```

---

## 3. Prop Drilling Hell

**The Mistake**: Passing state props down through multiple layers of intermediate components that do not use the data, just to reach a child component at the bottom of the tree.
**Why it is bad**: It couples intermediate components to data models they do not need. Refactoring prop names or structural interfaces requires updating every intermediate file, creating fragile, high-maintenance code.

```
[App (State: user)] ──► [Page] ──► [Layout] ──► [Sidebar] ──► [Avatar (Needs: user)]
```

### ❌ Bad Code
```jsx
// intermediate components are forced to carry 'user' props they do not require
import React from 'react';

function Sidebar({ user }) {
  return <aside><Avatar user={user} /></aside>;
}

function Layout({ user }) {
  return <div className="layout"><Sidebar user={user} /></div>;
}

export default function App() {
  const user = { name: 'Bob', avatar: 'bob.png' };
  return <Layout user={user} />;
}

function Avatar({ user }) {
  return <img src={user.avatar} alt={user.name} />;
}
```

### ✅ Good Code (Option A: Component Composition)
```jsx
// ✅ Composition allows App to pass Avatar directly as a child element, 
// bypassing intermediate components.
import React from 'react';

function Sidebar({ children }) {
  return <aside>{children}</aside>;
}

function Layout({ children }) {
  return <div className="layout">{children}</div>;
}

export default function App() {
  const user = { name: 'Bob', avatar: 'bob.png' };
  return (
    <Layout>
      <Sidebar>
        <Avatar user={user} />
      </Sidebar>
    </Layout>
  );
}

function Avatar({ user }) {
  return <img src={user.avatar} alt={user.name} />;
}
```
*Note: For complex, global data structures (like theme preferences, auth sessions, or language locales), use the **Context API** (Topic 08).*

---

## 4. Declaring Component Names in Lowercase

**The Mistake**: Starting a component function declaration with a lowercase letter.
**Why it is bad**: React differentiates HTML elements from custom components based on casing. Lowercase names fail to compile as component references.

### ❌ Bad Code
```jsx
// ❌ Babel compiles this as document.createElement("badge") instead of mounting a React component
import React from 'react';

function badge({ text }) {
  return <span className="badge">{text}</span>;
}

export default function BadgePanel() {
  return <badge text="New" />; // Compilation warning or browser parse error
}
```

### ✅ Good Code
```jsx
// ✅ Correct PascalCase notation
import React from 'react';

function Badge({ text }) {
  return <span className="badge">{text}</span>;
}

export default function BadgePanel() {
  return <Badge text="New" />;
}
```
