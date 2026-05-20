# 📝 JSX & Rendering Keynotes: Core Syntax Rules

- **Not HTML**: JSX is an XML-like syntax extension to JavaScript that compiles down to React element function calls.
- **Single Parent**: Every return block must have a single root element; use `<React.Fragment>` or empty tags `<>` to wrap sibling nodes.
- **Attribute Formats**: HTML attributes map to camelCase parameters in JSX (e.g., `class` becomes `className`, `onclick` becomes `onClick`).
- **Tag Closure**: Every JSX tag must be closed explicitly (e.g., self-closing tags like `<br />` or `<img />` are mandatory).
- **Evaluating Code**: Any expression placed inside curly braces `{}` is evaluated as standard JavaScript inside the JSX template.
- **Lists and Keys**: The `key` prop is a mandatory string attribute that React uses to track identity in list updates, insertions, and deletions.
- **Avoid Indices**: Do not use array indexes as keys in dynamic lists to prevent element desynchronization and UI bugs.
- **Logic Placement**: Keep JSX clean by placing calculations, sorting, and conditional setups above the return block.
- **Falsy Zeros**: Never use a raw number value on the left side of `&&` checks; coerce it to a boolean to prevent a literal `0` from rendering.
- **Rendering Nothing**: To render nothing, return `null`. React ignores booleans (`true`/`false`) and `undefined` when building DOM trees.
- **Inline CSS**: CSS inline styles must be passed as JavaScript objects with camelCased keys (e.g. `style={{ fontSize: '12px' }}`).
- **XSS Protection**: React automatically escapes all string variables in JSX before rendering to prevent malicious HTML injection.
- **Bypassing Escapes**: Use `dangerouslySetInnerHTML={{ __html: trustedMarkup }}` to render rich HTML, ensuring the input is sanitized first.
