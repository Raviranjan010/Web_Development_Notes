# 1.7 HTML Tables

## 1. What is it?
HTML tables are used to organize and display data in a grid format, with rows and columns. They are perfect for financial reports, schedules, and comparison charts.

## 2. Syntax / Structure
An HTML table is built using the `<table>` tag, with `<tr>` for rows, `<th>` for headers, and `<td>` for data cells.

```html
<table>
    <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Age</th>
    </tr>
    <tr>
        <td>Priya</td>
        <td>Sharma</td>
        <td>24</td>
    </tr>
</table>
```

## 3. Table Elements Description

| Tag | Description |
| :--- | :--- |
| `<table>` | Defines the container for the table. |
| `<tr>` | **Table Row**: Defines a row of cells. |
| `<th>` | **Table Header**: Bold and centered by default. |
| `<td>` | **Table Data**: Standard data cell. |
| `<caption>` | A title or description for the entire table. |
| `<thead>` | Groups header content (semantically important). |
| `tbody` | Groups the main body content. |
| `tfoot` | Groups footer content (summaries/totals). |
| `<col>` / `<colgroup>` | Specifies column properties for styling. |

---

## 4. Styling Tables (CSS)
Tables look plain by default. Use CSS to make them professional.

### 1. Adding Borders
```css
table, th, td {
    border: 1px solid black;
}
```

### 2. Collapsing Borders (Crucial!)
By default, elements have separate borders. Use `border-collapse` to merge them into single lines.
```css
table {
    border-collapse: collapse;
}
```

### 3. Adding Padding
Adds space between the text and the border.
```css
th, td {
    padding: 15px;
}
```

### 4. Text Alignment
Headers are centered by default. You can left-align them.
```css
th {
    text-align: left;
}
```

### 5. Border Spacing
If you *don't* collapse borders, you can control the space between them.
```css
table {
    border-spacing: 5px;
}
```

### 6. Background Color
```css
table tr:nth-child(even) {
    background-color: #f2f2f2; /* Zebra striping */
}
th {
    background-color: #4CAF50;
    color: white;
}
```

---

## 5. Advanced Features

### Spanning Columns (`colspan`)
Make a cell span across multiple columns.
```html
<table>
  <tr>
    <th>Name</th>
    <th colspan="2">Phone Numbers</th> <!-- Spans 2 columns -->
  </tr>
  <tr>
    <td>John</td>
    <td>555-1234</td>
    <td>555-5678</td>
  </tr>
</table>
```

### Spanning Rows (`rowspan`)
Make a cell span across multiple rows.
```html
<table>
  <tr>
    <th>Name:</th>
    <td>Vikas</td>
  </tr>
  <tr>
    <th rowspan="2">Telephone:</th> <!-- Spans 2 rows -->
    <td>555-1234</td>
  </tr>
  <tr>
    <td>555-5678</td>
  </tr>
</table>
```

### Adding a Caption
Must be the **first** child of the `<table>` tag.
```html
<table>
    <caption>Monthly Savings</caption>
    <!-- rows -->
</table>
```

### Nested Tables
You can put a table inside a `<td>`.
```html
<table border="1">
    <tr>
        <td>Outer Cell</td>
        <td>
            <table border="1">
                <tr><td>Inner Cell 1</td></tr>
                <tr><td>Inner Cell 2</td></tr>
            </table>
        </td>
    </tr>
</table>
```
*(Note: Avoid nesting tables for layout as it gets messy. Use for data only.)*

---

## 6. Key Points to Remember
- Use `<thead>`, `<tbody>`, and `<tfoot>` for large tables to improve screen reader accessibility.
- **NEVER** use tables for page layout (e.g., positioning a sidebar). Use CSS Grid or Flexbox instead.
- Use `scope="col"` or `scope="row"` on `<th>` elements to explicitly define what the header applies to (great for accessibility).

## 7. Common Questions
- **How to fix row height?** Use CSS `height` property on `<tr>`.
- **How to fixed width?** Use CSS `width` on `<td>` or `<th>`.
- **Vertical Scroll?** Wrap the table in a `div` with `overflow-y: scroll;`.
