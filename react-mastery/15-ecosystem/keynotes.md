# 📝 Ecosystem Keynotes: Architecture and Tooling Rules

- **CRA Deprecation**: Create React App is officially deprecated; use Vite for client-side SPAs or Next.js for full-stack apps.
- **Server Components**: Server Components render on the server, cannot use React hooks, and do not ship JavaScript to the client.
- **Client Components**: Client Components are designated using the `"use client"` directive, allowing them to use hooks and handle user events.
- **Data Fetching Cache**: Use TanStack Query to manage query loading states, cache responses, and handle background refetches automatically.
- **State Selection**: Use lightweight libraries like Zustand to manage shared global state instead of using Context for high-frequency updates.
- **Styling Options**: CSS Modules localize classes, Tailwind CSS provides utility classes, and Styled Components write CSS in JavaScript.
- **Dynamic Imports**: Use `React.lazy` and `Suspense` to dynamic-import heavy components, split bundles, and speed up initial page loads.
- **Framework Routing**: Next.js uses file-system based routing, while Vite requires libraries like React Router.
- **Axios vs Fetch**: TanStack Query can wrap both native `fetch` or `axios` queries to manage caching and loading states.
- **Turbopack Dev Speed**: Turbopack/Vite provide near-instantaneous Hot Module Replacement (HMR) speeds compared to Webpack.
