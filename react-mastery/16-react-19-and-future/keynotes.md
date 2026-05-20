# 📝 React 19 Keynotes: New Standard rules

- **Async Actions API**: Actions automate the lifecycle of asynchronous form submissions, handling pending, success, and error states automatically.
- **useActionState Hook**: Use `useActionState` to track async actions and retrieve response errors from form submissions.
- **useFormStatus State**: The `useFormStatus` hook lets nested child components read the pending state of their parent form.
- **The use() Hook API**: The `use` hook can read promises and context dynamic values inside conditional checks and loops.
- **No try-catch in use()**: Never wrap the `use()` hook inside a `try/catch` block, as this catches the promise thrown to trigger Suspense.
- **Simplified Ref Prop**: In React 19, `forwardRef` is deprecated. Pass `ref` as a normal prop directly to component functions.
- **Hoisted Metadata**: React 19 natively hoists `<title>`, `<meta>`, and `<link>` tags to the HTML document `<head>` during render.
- **React Compiler**: The React Compiler automatically optimizes rendering and memoization at build time, replacing manual `useMemo` and `useCallback` hooks.
- **Optimistic Updates**: Use the new `useOptimistic` hook to update the UI instantly during async form actions before the server responds.
- **Context as Provider**: You can now write `<ThemeContext>` directly instead of `<ThemeContext.Provider>` to share context values.
