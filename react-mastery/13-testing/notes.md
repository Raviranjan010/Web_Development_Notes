# 🧪 Testing in React: Vitest, React Testing Library, and MSW

## 1. Testing Philosophy: Behavior, Not Implementation

A core philosophy of **React Testing Library (RTL)** is: **"The more your tests resemble the way your software is used, the more confidence they can give you."**

Avoid testing internal implementation details like:
- The component's private state values (e.g., checking if `isOpen` is `true`).
- Internal class methods or hook signatures.

Instead, test the **visual behavior** of the interface from the user's perspective:
- Does clicking the "Open" button render the modal on the screen?
- Does typing an invalid email show an error message badge?

---

## 2. RTL Query Selector Priorities

React Testing Library provides a set of query methods to locate DOM elements. To ensure your tests are accessible, always use queries in the following priority order:

1. **`getByRole`**: Locates elements by their accessibility roles (e.g. `button`, `heading`, `textbox`). This verifies that screen readers can navigate your UI correctly.
2. **`getByLabelText`**: Best for form fields (associates inputs with `<label>` tags).
3. **`getByPlaceholderText`**: Locates inputs by their placeholder text.
4. **`getByText`**: Locates non-interactive text elements (e.g. paragraphs, span labels).
5. **`getByTestId`**: A fallback option when locating elements by text or role is difficult. Wrap elements in `data-testid="item-card"` attributes.

### Query Behavior Comparison

| Query Prefix | Returns Match | Returns `null` if no match | Throws Error if no match | Returns Promise (Async) |
| :--- | :--- | :--- | :--- | :--- |
| **`getBy...`** | First matching node | No | **Yes** | No |
| **`queryBy...`** | First matching node | **Yes** | No | No |
| **`findBy...`** | First matching node | No | **Yes** (after timeout) | **Yes** |

*Use **`queryBy...`** when asserting that an element is **not** present in the DOM (e.g., `expect(screen.queryByText('Loading...')).toBeNull()`).*

---

## 3. Simulating User Events: `fireEvent` vs `user-event`

- **`fireEvent`**: Directly triggers browser events (e.g. `click` or `change`) in the DOM. It does not simulate full browser event loops. For instance, calling `fireEvent.change` on an input does not trigger hover, focus, tab, or keydown events.
- **`user-event`**: Simulates complete browser interaction cycles. Clicking a button using `user-event` triggers hover, focus, mouse-down, mouse-up, and click events in order. Always prefer **`user-event`** to test user flows accurately.

```javascript
import userEvent from '@testing-library/user-event';

test('click simulation', async () => {
  const user = userEvent.setup();
  render(<MyButton />);
  
  // Simulates hover, focus, and click sequences asynchronously
  await user.click(screen.getByRole('button', { name: 'Submit' }));
});
```

---

## 4. Real-World Project: API-Connected Component Test

Below is a complete, runnable test script for a search component. It uses **Mock Service Worker (MSW)** to mock API endpoints, testing loading states and DOM changes.

```jsx
// 1. Target Component: UserSearch.jsx
import React, { useState } from 'react';

export function UserSearch() {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setIsLoading(true);
    setError(null);
    setUser(null);

    try {
      const res = await fetch(`/api/users?name=${query}`);
      if (!res.ok) throw new Error("Profile not found.");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ fontFamily: 'sans-serif' }}>
      <input 
        placeholder="Enter user name..." 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
      />
      <button type="submit">Search</button>
      {isLoading && <p>Loading user details...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user && (
        <div data-testid="user-profile">
          <h4>{user.name}</h4>
          <p>Email: {user.email}</p>
        </div>
      )}
    </form>
  );
}

// 2. Integration Test File: UserSearch.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

// Setup Mock Service Worker (MSW) to intercept fetch requests
const server = setupServer(
  http.get('/api/users', ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (name === 'Alice') {
      return HttpResponse.json({ name: 'Alice Smith', email: 'alice@domain.com' });
    }
    return new HttpResponse(null, { status: 404 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('searches and renders user profile details on success', async () => {
  const user = userEvent.setup();
  render(<UserSearch />);

  const inputEl = screen.getByPlaceholderText('Enter user name...');
  const searchBtn = screen.getByRole('button', { name: 'Search' });

  // Type search query
  await user.type(inputEl, 'Alice');
  // Click search button
  await user.click(searchBtn);

  // Assert loading indicator is visible
  expect(screen.getByText('Loading user details...')).toBeInTheDocument();

  // Wait for async changes and assert user profile is rendered
  await waitFor(() => {
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
  });

  expect(screen.getByText('Alice Smith')).toBeInTheDocument();
  expect(screen.getByText('Email: alice@domain.com')).toBeInTheDocument();
  expect(screen.queryByText('Loading user details...')).not.toBeInTheDocument();
});
```
