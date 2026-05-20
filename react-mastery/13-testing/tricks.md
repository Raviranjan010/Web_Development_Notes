# ⚡ Testing Tricks: Context Wrappers and Debugging Log Helpers

## 1. Custom Render Wrapper for Context API Providers

**The Problem**: If a component consumes global contexts (like Theme, Auth, or Router), mounting it with standard RTL `render(<Profile />)` throws errors because the context providers are missing. Wrapping every test component manually makes tests verbose.
**The Trick**: Create a custom render wrapper that automatically wraps components in all global providers. You can export this custom render function to reuse it across your test suites:

```jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from '../08-context-api/notes';

// Custom render helper
function render(ui, { theme = 'light', ...options } = {}) {
  // Define wrapper containing providers
  function Wrapper({ children }) {
    return (
      <ThemeProvider initialTheme={theme}>
        {children}
      </ThemeProvider>
    );
  }

  // Pass wrapper option to RTL's render function
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// Re-export testing library utilities
export * from '@testing-library/react';
export { render };

// Usage inside test file:
// import { render, screen } from './custom-render-helper';
// test('example', () => { render(<ProfileCard />) }); // Automatically gets Theme Context
```

---

## 2. Inspecting the DOM with `screen.debug()`

**The Problem**: A test is failing because it cannot locate an element, but you don't know what the active HTML structure looks like.
**The Trick**: Use `screen.debug()`. Calling this function prints the rendered HTML tree directly to your terminal. You can also pass a specific DOM node to inspect a subset of the tree:

```javascript
import { render, screen } from '@testing-library/react';
import React from 'react';

test('debug showcase', () => {
  render(<Navbar />);

  // Trick A: Print the entire rendered HTML structure to the terminal
  screen.debug();

  // Trick B: Print only a specific element to keep terminal logs clean
  const navElement = screen.getByRole('navigation');
  screen.debug(navElement);
});
```

---

## 3. MSW Network Interceptor Setup

**The Problem**: Mocking `window.fetch` or `axios` manually inside tests is fragile and leads to mock implementation leaks.
**The Trick**: Set up **Mock Service Worker (MSW)**. MSW intercepts fetch requests at the browser network layer, allowing you to test API integrations without modifying your component's fetch calls:

```javascript
// src/mocks/server.js
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Define request interceptors
export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { username } = await request.json();
    if (username === 'valid_user') {
      return HttpResponse.json({ token: 'abc-123-token' });
    }
    return new HttpResponse('Unauthorized', { status: 401 });
  })
];

export const server = setupServer(...handlers);

// vitest.setup.js (Global config)
import { server } from './src/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```
