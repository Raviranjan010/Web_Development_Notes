# 📝 Testing Keynotes: Test Automation Rules

- **Behavioral Focus**: Test the visual behavior of components from the user's perspective rather than testing internal implementation details.
- **Accessibility Roles**: Use `getByRole` as your primary selector to ensure elements are semantic and accessible.
- **Not-Found Assertions**: Use the `queryBy...` prefix to assert that an element is **not** present in the DOM.
- **Asynchronous Waits**: Use `findBy...` or `waitFor()` to write assertions for elements that render asynchronously (e.g. after API fetches).
- **User Event Priority**: Prefer `@testing-library/user-event` over `fireEvent` to simulate complete browser interaction loops.
- **MSW Mocks**: Use Mock Service Worker (MSW) to mock HTTP requests at the network level rather than mocking libraries like `axios`.
- **MSW Isolation**: Reset MSW handlers between tests using `afterEach(() => server.resetHandlers())` to prevent test contamination.
- **Context Wrappers**: Create custom render functions that wrap test components in the required context providers (e.g., Theme, Auth, Router).
- **Avoid Implementation Ties**: Do not write assertions against component state variables, styling class names, or private helper functions.
- **Screen Debugging**: Use `screen.debug()` during test execution to inspect the rendered HTML structure in the terminal.
