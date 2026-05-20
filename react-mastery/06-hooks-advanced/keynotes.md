# 📝 Advanced Hooks Keynotes: Concurrent Features & Custom APIs

- **Layout Hook Synchronicity**: `useLayoutEffect` runs synchronously after DOM mutations but before the browser paints the screen.
- **Avoid Visual Jumps**: Use `useLayoutEffect` to read DOM geometry (positions, scroll layouts) to adjust UI layout before painting.
- **Exposing Child API**: Use `useImperativeHandle` with `forwardRef` to expose specific child functions (e.g. `focus()`) to the parent.
- **Concurrent Transition Hook**: `useTransition` marks state updates as non-urgent transitions that yield to higher-priority user inputs.
- **Prop Value Deferment**: `useDeferredValue` accepts a prop value and returns a deferred copy that updates when the main thread is idle.
- **External State Subscriptions**: `useSyncExternalStore` is used to subscribe to external stores safely during concurrent rendering.
- **Custom Hook Rules**: Custom hook functions must start with the `use` prefix to allow ESLint to validate the Rules of Hooks.
- **Return Signature Object Layout**: Return objects from custom hooks (e.g. `{ user, loading }`) to let consumers destructure only what they need.
- **Avoid Paint Blockers**: Never run data fetches or asynchronous tasks inside `useLayoutEffect` to prevent blocking the browser paint cycle.
- **Isolate Transition Logic**: Keep typing inputs urgent; only wrap heavy operations (like filtering long lists) in `startTransition`.
- **Dynamic CSS Transitions**: The `isPending` boolean returned by `useTransition` is used to display non-blocking loading spinner indicators.
