# 📝 Routing Keynotes: SPA Architecture Rules

- **SPA Routing**: SPA routing updates the DOM dynamically on the client-side, avoiding full page refreshes.
- **Link Components**: Always use `<Link>` or `<NavLink>` instead of standard `<a>` tags to prevent state-destroying page reloads.
- **NavLink Styling**: `<NavLink>` accepts an `isActive` callback to apply active styles or class names dynamically.
- **Layout Outlet Rendering**: The `<Outlet>` component renders nested child routes inside parent layout components.
- **Dynamic URL Parameters**: Read dynamic path parameters (e.g. `/user/:id`) inside your components using the `useParams` hook.
- **Programmatic Navigation**: Use the `useNavigate` hook to redirect users programmatically (e.g., after form submissions).
- **Catch-All Fallbacks**: Always add a catch-all route `<Route path="*" element={<404 />} />` to handle invalid URLs gracefully.
- **Relative Path Bindings**: Use relative paths inside nested layouts to decouple children from parent route changes.
- **Dynamic Document Titles**: Sync document titles with active routes inside a custom hook or effect on mount.
- **Lazy Load Splitting**: Use `React.lazy` and `<Suspense>` to load page bundles only when the user navigates to them.
