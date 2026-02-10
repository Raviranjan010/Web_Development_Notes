# 1.7 HTML Tables

## 1. What is it?
HTML Tables allow you to arrange data into rows and columns containing text, images, links, etc.

## 2. Why it is used?
- **Data Representation**: Perfect for schedules, pricing plans, calendars, and financial reports.
- **NOT for Layout**: In the 90s, tables were used for page layout. Today, we use CSS Grid and Flexbox. **Only use tables for tabular data.**

## 3. Syntax / Structure
- `<table>`: The wrapper for the table.
- `<tr>`: Table Row.
- `<th>`: Table Header (Bold and centered by default).
- `<td>`: Table Data (Regular cell).

## 4. Detailed Explanation

### Table Sections
For better semantics and screen reader support, specific logical sections are used:
- `<thead>`: Header content (column titles).
- `<tbody>`: Body content (the data).
- `<tfoot>`: Footer content (summaries, totals).

### Spanning
- `colspan`: Merges cells horizontally (across columns).
- `rowspan`: Merges cells vertically (across rows).

## 5. Examples

### Basic Table
```html
<table border="1">
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>25</td>
  </tr>
  <tr>
    <td>Bob</td>
    <td>30</td>
  </tr>
</table>
```
*(Note: `border="1"` is an old attribute. Use CSS for borders in real projects.)*

### Semantic Table with Sections
```html
<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Laptop</td>
      <td>$1000</td>
    </tr>
    <tr>
      <td>Mouse</td>
      <td>$20</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>$1020</td>
    </tr>
  </tfoot>
</table>
```

### Merging Cells (Colspan & Rowspan)
```html
<table>
  <tr>
    <th>Name</th>
    <th colspan="2">Phone Numbers</th>
  </tr>
  <tr>
    <td>John</td>
    <td>555-1234</td>
    <td>555-5678</td>
  </tr>
</table>
```

## 6. Key Points to Remember
- `<th>` elements are automatically bold and centered.
- Use `<thead>, <tbody>, <tfoot>` for complex tables to help browsers and assistive technologies.
- Do not use tables to layout your entire website (like a sidebar and main content). Use `<div>` and CSS for that.

## 7. Common Mistakes
- **Mistake**: Mismatching the number of cells in rows.
  **Fix**: Ensure every `<tr>` has the same number of `<td>` or `<th>` elements (unless using colspan/rowspan).

## 8. Pro Tips / Tricks
- **Styling**: Tables look ugly by default. Use CSS `border-collapse: collapse;` to remove double borders and make them look clean.
- **Responsiveness**: Tables are notoriously bad on mobile. Wrap your table in a `div` with `overflow-x: auto;` to allow horizontal scrolling on small screens.

## 9. Related Topics
- [12_Accessibility_and_SEO.md](./12_Accessibility_and_SEO.md) - Using `scope` attribute in tables.
- [../02_CSS/05_Box_Model.md](../02_CSS/05_Box_Model.md) - Understanding widths and padding.
