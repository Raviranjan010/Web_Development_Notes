# 📑 JSX & Rendering Quick Reference Cheatsheet

## 1. JSX vs HTML Attribute Differences

| HTML Attribute | JSX Equivalent | React Syntax / Example |
| :--- | :--- | :--- |
| `class="btn"` | `className="btn"` | `<button className="btn">Text</button>` |
| `for="input-id"` | `htmlFor="input-id"` | `<label htmlFor="input-id">Label</label>` |
| `style="color:red;"` | `style={{ color: 'red' }}` | `<span style={{ color: 'red' }}>Text</span>` |
| `onclick="run()"` | `onClick={run}` | `<button onClick={run}>Click</button>` |
| `tabindex="1"` | `tabIndex={1}` | `<div tabIndex={1}>Focusable</div>` |
| `readonly` | `readOnly` | `<input readOnly={true} />` |
| `maxlength="10"` | `maxLength={10}` | `<input maxLength={10} />` |
| `autocomplete="on"`| `autoComplete="on"` | `<input autoComplete="on" />` |
| `autofocus` | `autoFocus` | `<input autoFocus />` |

---

## 2. Conditional Rendering Patterns Side-by-Side

### Pattern A: Early Return (if/else)
```jsx
if (!isUserLoaded) {
  return <LoadingSpinner />;
}
return <Dashboard />;
```

### Pattern B: Ternary (`condition ? true : false`)
```jsx
<div>
  {isOnline ? <Badge color="green" /> : <Badge color="gray" />}
</div>
```

### Pattern C: Logical AND (`&&`)
```jsx
<div>
  {hasUnsavedChanges && <AlertBanner text="You have unsaved work!" />}
</div>
```

### Pattern D: Switch Statement (Helper Function)
```jsx
const getStepUI = (step) => {
  switch (step) {
    case 1: return <AccountSetup />;
    case 2: return <PaymentInfo />;
    case 3: return <ConfirmDetails />;
    default: return null;
  }
};
```

---

## 3. List Rendering Patterns

### Standard List Map with Unique IDs
```jsx
<ul>
  {products.map((product) => (
    <li key={product.id}>
      <strong>{product.name}</strong> - ${product.price}
    </li>
  ))}
</ul>
```

### Destructuring List Parameters
```jsx
<div>
  {users.map(({ id, username, email }) => (
    <div key={id} className="user-row">
      <span>{username}</span>
      <a href={`mailto:${email}`}>{email}</a>
    </div>
  ))}
</div>
```

---

## 4. Fragment Syntax Options

### Short Syntax (No key support)
```jsx
<>
  <Sidebar />
  <ContentArea />
</>
```

### Full Syntax (Used when rendering lists of fragments with keys)
```jsx
import React from 'react';

return (
  <dl>
    {terms.map((item) => (
      <React.Fragment key={item.id}>
        <dt>{item.term}</dt>
        <dd>{item.definition}</dd>
      </React.Fragment>
    ))}
  </dl>
);
```

---

## 5. Common JSX Pitfalls Quick Reference

### ❌ The "Renders Literal 0" Bug
```jsx
// ❌ Renders "0" if items is empty
{items.length && <List items={items} />}

// ✅ Correct
{items.length > 0 && <List items={items} />}
```

### ❌ The "String Style" Bug
```jsx
// ❌ Crashes compilation
<div style="margin-top: 10px;" />

// ✅ Correct
<div style={{ marginTop: '10px' }} />
```

### ❌ The "Unclosed Tag" Bug
```jsx
// ❌ Syntax Error
<input type="text">

// ✅ Correct
<input type="text" />
```
