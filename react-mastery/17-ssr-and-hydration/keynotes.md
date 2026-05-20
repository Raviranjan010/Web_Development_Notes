# 📝 SSR & Hydration Keynotes: Core Rendering Rules

- **First Paint Visibility**: SSR pre-renders component logic into static HTML on the server, speeding up the first contentful paint.
- **Hydration Definition**: Hydration attaches event listeners (e.g. click handlers) to the pre-rendered HTML on the client.
- **Hydration Mismatch Error**: Occurs when the client-rendered Virtual DOM differs from the server-rendered HTML.
- **Server API Restriction**: Accessing browser APIs (`window`, `document`) directly inside the render path causes server crashes.
- **Dynamic Render Exemption**: Do not render date timestamps or random values directly in JSX, as they will differ during hydration.
- **Strict HTML nesting**: Avoid placing block-level elements (`div`, `p`, `section`) inside inline elements to prevent browser auto-corrections.
- **useEffect Execution**: The `useEffect` hook runs only on the client, making it safe for browser-only operations.
- **Selective Hydration**: React 18 uses `<Suspense>` boundaries to stream HTML chunks and hydrate interactive elements independently.
- **suppressHydrationWarning**: Use `suppressHydrationWarning` on elements displaying dynamic timestamps to ignore minor mismatches.
- **Dynamic Import Option**: Use dynamic imports with `ssr: false` in Next.js to disable server rendering for client-only components.
