# 🚫 JSX & Rendering Avoids: Common Pitfalls and Bad Practices

## 1. Using Array Index as the `key` Prop

**The Mistake**: Passing the array index parameter as the unique identifier for lists (`key={index}`).
**Why it is bad**: If the list is static (never filtered, sorted, appended, or prepended), this is safe but bad practice. If the list is dynamic, using the index causes visual bugs and degraded performance. 
When React diffs the list after a reorder, the keys remain `0, 1, 2...` in the exact same positions. React assumes the elements have not moved and only updates their contents, destroying local DOM state (such as focus, cursor position, CSS animations, or unchecked state inside list items).

### ❌ Bad Code
```jsx
// ❌ DANGER: Reordering or deleting elements will cause DOM inputs/states to bind to the wrong items.
import React, { useState } from 'react';

export default function BrokenTodoList() {
  const [todos, setTodos] = useState([
    { text: 'Write report' },
    { text: 'Deploy application' }
  ]);

  const handleDelete = (indexToDelete) => {
    setTodos(todos.filter((_, idx) => idx !== indexToDelete));
  };

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <input type="text" defaultValue={todo.text} />
          <button onClick={() => handleDelete(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

### ✅ Good Code
```jsx
// ✅ CORRECT: Unique, persistent identifiers from data models are used as keys.
import React, { useState } from 'react';

export default function WorkingTodoList() {
  const [todos, setTodos] = useState([
    { id: 'todo-a1', text: 'Write report' },
    { id: 'todo-b2', text: 'Deploy application' }
  ]);

  const handleDelete = (idToDelete) => {
    setTodos(todos.filter(todo => todo.id !== idToDelete));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input type="text" defaultValue={todo.text} />
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 2. Using Falsy `0` in Logical AND `&&` Expressions

**The Mistake**: Writing `{items.length && <List items={items} />}` to conditionally render a component when a list is not empty.
**Why it is bad**: In JavaScript, the expression `0 && expression` evaluates to `0`. React does not render boolean `false`, but it *does* render the number `0`. If your list is empty, a literal `0` will appear on the screen, spoiling the UI design.

### ❌ Bad Code
```jsx
// ❌ If items is empty, this renders "0" to the screen.
import React from 'react';

export default function BadNotificationBadge({ notifications }) {
  return (
    <div>
      {notifications.length && (
        <span className="badge">{notifications.length} alerts</span>
      )}
    </div>
  );
}
```

### ✅ Good Code
```jsx
// ✅ Explicit boolean coercion or comparison prevents "0" rendering.
import React from 'react';

export default function GoodNotificationBadge({ notifications }) {
  return (
    <div>
      {/* Option A: Explicit comparison */}
      {notifications.length > 0 && (
        <span className="badge">{notifications.length} alerts</span>
      )}

      {/* Option B: Boolean cast */}
      {/* {!!notifications.length && <span className="badge">{notifications.length} alerts</span>} */}
    </div>
  );
}
```

---

## 3. Nesting Ternary Operators in JSX

**The Mistake**: Stacking ternary checks inside JSX templates to handle three or more UI states.
**Why it is bad**: Nested ternaries are hard to read and debug. They make templates look cluttered and increase the likelihood of developer error.

### ❌ Bad Code
```jsx
// ❌ Nested ternaries reduce code readability.
import React from 'react';

export default function BadStatusWidget({ status }) {
  return (
    <div>
      {status === 'success' ? (
        <p className="green">Operation complete!</p>
      ) : status === 'loading' ? (
        <p className="blue">Processing...</p>
      ) : status === 'error' ? (
        <p className="red">Failed to write data.</p>
      ) : (
        <p>Status unknown</p>
      )}
    </div>
  );
}
```

### ✅ Good Code
```jsx
// ✅ Logic is clean and easy to read when extracted above the return block.
import React from 'react';

export default function GoodStatusWidget({ status }) {
  const renderStatus = () => {
    switch (status) {
      case 'success':
        return <p className="green">Operation complete!</p>;
      case 'loading':
        return <p className="blue">Processing...</p>;
      case 'error':
        return <p className="red">Failed to write data.</p>;
      default:
        return <p>Status unknown</p>;
    }
  };

  return <div>{renderStatus()}</div>;
}
```

---

## 4. Writing HTML Style Attributes as Strings

**The Mistake**: Passing CSS style definitions as strings to the `style` attribute (e.g. `style="color: red; margin: 10px"`).
**Why it is bad**: React expects the `style` attribute to be a key-value object containing camelCased CSS property names. Passing a string throws a compile-time warning or outright crash.

### ❌ Bad Code
```jsx
// ❌ Crashes the React compiler.
import React from 'react';

export default function BadStyledCard() {
  return (
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px;">
      Card Content
    </div>
  );
}
```

### ✅ Good Code
```jsx
// ✅ Correct syntax: pass an object with camelCased keys.
import React from 'react';

export default function GoodStyledCard() {
  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '4px' }}>
      Card Content
    </div>
  );
}
```

---

## 5. Mutating Objects/Arrays inside JSX Expressions

**The Mistake**: Reordering or modifying input arrays or objects directly in the return block.
**Why it is bad**: Mutating state or props during rendering violates the rule of pure components, which state that rendering should not produce side effects. Doing so can trigger infinite re-render loops or unexpected UI behaviors.

### ❌ Bad Code
```jsx
// ❌ DANGER: .sort() mutates the original prop array in place during rendering.
import React from 'react';

export default function BadLeaderboard({ players }) {
  return (
    <ol>
      {players.sort((a, b) => b.score - a.score).map(player => (
        <li key={player.id}>{player.name}: {player.score}</li>
      ))}
    </ol>
  );
}
```

### ✅ Good Code
```jsx
// ✅ Correct: create a shallow copy first or compute above the return.
import React from 'react';

export default function GoodLeaderboard({ players }) {
  // Sort on a copied array reference to preserve props immutability
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <ol>
      {sortedPlayers.map(player => (
        <li key={player.id}>{player.name}: {player.score}</li>
      ))}
    </ol>
  );
}
```
