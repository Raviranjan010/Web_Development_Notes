# 📑 Troubleshooting Hydration Mismatches: A Step-by-Step Guide

Hydration mismatch errors can be difficult to debug because the mismatch warning in the console is often generic. Follow this step-by-step guide to diagnose and fix hydration mismatches.

---

## Step 1: Read the Console Warning Details

Modern versions of React print detailed warning logs when a hydration mismatch is detected:

```
Warning: Text content did not match. Server: "Login" Client: "Sign Out"
  in button (at Header.jsx:12)
  in div (at Header.jsx:10)
```

1. Look for **"Server:"** and **"Client:"** outputs to find the exact strings or values that differed.
2. Inspect the component name and file location (e.g., `Header.jsx:12`) in the stack trace to pinpoint the failing JSX tag.

---

## Step 2: Check for Invalid HTML Nesting

Browsers automatically restructure invalid HTML. If your JSX nests elements incorrectly, the browser parses them into a different DOM tree, causing a mismatch:

*   **Check Paragraphs**: Do you have a `<div>`, `<ul>`, or `<section>` nested inside a `<p>` tag? Paragraphs are inline containers and cannot hold block-level elements.
*   **Check Tables**: Do you have `<tr>` elements directly inside a `<table>` without a wrapper `<tbody>`? Browsers insert `<tbody>` automatically, mismatching React's structure.
*   **Check Anchors**: Do you have nested link tags (an `<a>` inside another `<a>`)?

### How to Fix:
Replace invalid tags with correct semantic structures (e.g., replace outer `<p>` with `<div>`).

---

## Step 3: Check for Browser API Usage in Render Scope

If a component reads values from the browser (like `window.innerWidth`, `navigator.userAgent`, or `localStorage`) during rendering, it will return `undefined` on the server but values on the client, triggering a mismatch:

```jsx
// ❌ FAILS: localStorage is missing on the server
const savedTheme = localStorage.getItem('theme') || 'light';
```

### How to Fix:
Initialize state with a static default value, and read the browser API inside a `useEffect` hook:

```jsx
// ✅ CORRECT: Defer to useEffect
const [theme, setTheme] = useState('light');

useEffect(() => {
  setTheme(localStorage.getItem('theme') || 'light');
}, []);
```

---

## Step 4: Check for Dynamic Dates and Times

Rendering timestamps dynamically on render runs (e.g. `new Date()`) will cause differences because the client hydrates the page slightly later than the server rendered it:

```jsx
// ❌ FAILS: Times will differ
return <div>Loaded at: {new Date().toLocaleTimeString()}</div>;
```

### How to Fix:
1. Wrap the text element in `suppressHydrationWarning` if a slight difference is acceptable:
   `<div suppressHydrationWarning>{new Date().toLocaleTimeString()}</div>`
2. Or use `useEffect` to set the date after the client has mounted.

---

## Step 5: Isolate Client-Only Sections

If a component cannot be easily adapted for SSR (like an interactive map or a canvas chart), wrap it in a `<ClientOnly>` component or use Next.js's dynamic import with `ssr: false` to disable server rendering for that section entirely.
