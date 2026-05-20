# 🚫 Testing Avoids: CSS Querying and Implementation Testing

## 1. Querying DOM Nodes Using CSS Class Selectors

**The Mistake**: Querying elements using internal styling classes (e.g., `container.querySelector('.btn-blue')`).
**Why it is bad**: CSS class names are styling details that change frequently during UI redesigns. Writing tests that depend on specific class selectors makes tests fragile. A developer refactoring styles (e.g., migrating to a different CSS library) will break the tests, even if the application's actual behavior remains exactly the same.

### ❌ Bad Code
```javascript
// ❌ Fragile test: Changing styling classes breaks the test
import { render } from '@testing-library/react';
import React from 'react';

test('renders button with correct name', () => {
  const { container } = render(<SubmitButton />);
  
  // ❌ WRONG: Querying by styling class
  const button = container.querySelector('.btn-primary-blue-large');
  expect(button.textContent).toBe('Submit');
});
```

### ✅ Good Code
```javascript
// ✅ CORRECT: Query by semantic accessibility roles
import { render, screen } from '@testing-library/react';
import React from 'react';

test('renders button with correct name', () => {
  render(<SubmitButton />);
  
  // ✅ Querying by role ensures accessible elements are found, surviving redesigns
  const button = screen.getByRole('button', { name: 'Submit' });
  expect(button).toBeInTheDocument();
});
```

---

## 2. Testing Component State and Implementation Details

**The Mistake**: Accessing a component's internal state variables or instance functions directly inside test assertions.
**Why it is bad**: Users do not care about state variables or function names. They only care about what is visible on the screen. Testing internal implementation details makes refactoring difficult. If you change a variable name or migrate from class states to custom hooks, your tests will fail, even if the component's output remains identical.

### ❌ Bad Code
```javascript
// ❌ Fragile test: Checking internal state variables directly
import { render } from '@testing-library/react';
import React from 'react';
import Counter from './Counter';

test('increments counter state', () => {
  const { container } = render(<Counter />);
  
  // ❌ WRONG: Testing internal state variables directly
  expect(Counter.state.count).toBe(0);
});
```

### ✅ Good Code
```javascript
// ✅ CORRECT: Verify what the user actually sees on the screen
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Counter from './Counter';

test('increments counter value display', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  // Assert default state text value is rendered
  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  // Click increment button
  const incrementBtn = screen.getByRole('button', { name: 'Increment' });
  await user.click(incrementBtn);

  // Assert UI updates count display
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

---

## 3. Forgetting to Reset MSW Mock Servers Between Tests

**The Mistake**: Running multiple tests that intercept HTTP requests using Mock Service Worker (MSW) without resetting handlers between runs.
**Why it is bad**: Test suites share the same mock server instance. If test A modifies an endpoint's return value to mock an error, that mock resolver remains active in test B, causing test B to fail unexpectedly.

**The Correction**:
- Always run `afterEach(() => server.resetHandlers())` inside the test setup file. This ensures each test starts with clean, default mock endpoints.
