# 2.8 CSS Grid

## 1. What is it?
**CSS Grid Layout** is the most powerful layout system available in CSS. It is a **two-dimensional** system, meaning it can handle both columns and rows simultaneously.

## 2. Why it is used?
While Flexbox is great for 1D (a row of buttons), Grid is built for the entire page layout (Header, Sidebar, Main Content, Footer) and complex photo galleries.

## 3. Syntax / Structure
Like Flexbox, you define a container and items.
```css
.grid-container {
    display: grid;
    grid-template-columns: 200px auto 200px;
    grid-template-rows: 100px auto;
}
```

## 4. Detailed Explanation

### Parent Properties
1.  **`display: grid`**: Activates grid context.
2.  **`grid-template-columns`**: Defines the width of columns.
    - Units: `px`, `%`, `fr` (Fractional Unit - *Very useful*).
3.  **`grid-template-rows`**: Defines the height of rows.
4.  **`gap`**: Space between rows and columns (e.g., `20px`).
5.  **`grid-template-areas`**: A visual "map" of your layout using names.

### Child Properties
1.  **`grid-column`**: Start and end lines (e.g., `1 / 3` spans from line 1 to 3).
2.  **`grid-row`**: Start and end lines for rows.
3.  **`grid-area`**: Assigns a name to an item (used with `grid-template-areas`).

## 5. Examples

### Basic 3-Column Layout
```css
.container {
    display: grid;
    /* 3 columns: 1st is 1 fraction, 2nd is 2 fractions, 3rd is 1 fraction */
    grid-template-columns: 1fr 2fr 1fr; 
    gap: 10px;
}
```
*Result: The middle column is twice as wide as the side columns.*

### The "Holy Grail" Page Layout
**HTML**:
```html
<div class="layout">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="content">Content</main>
  <footer class="footer">Footer</footer>
</div>
```

**CSS**:
```css
.layout {
  display: grid;
  height: 100vh;
  grid-template-columns: 250px 1fr; /* Sidebar fixed, content flexes */
  grid-template-rows: auto 1fr auto; /* Header/Footer fit content, middle fills space */
  grid-template-areas: 
    "header header"
    "sidebar content"
    "footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
```

## 6. Key Points to Remember
- **The `fr` Unit**: Stands for "fraction". `1fr 1fr 1fr` creates 3 equal columns. It consumes available free space.
- **Lines vs Tracks**: Grid lines are the numbered lines dividing rows/cols `(1, 2, 3...)`. Tracks are the space between lines (the actual columns/rows).

## 7. Common Mistakes
- **Mistake**: Confusing Flexbox and Grid.
  - Use **Flexbox** for: Small components, alignment inside elements, 1D lists.
  - Use **Grid** for: Overall page structure, rigid 2D layouts.
- **Mistake**: Not counting lines correctly. A grid with 3 columns has **4** vertical lines. `grid-column: 1 / 4` spans all 3 columns.

## 8. Pro Tips / Tricks
- **`repeat()` Function**: Tired of typing `1fr 1fr 1fr 1fr`? Use `repeat(4, 1fr)`.
- **`minmax()` Function**: Ensure a column is at least 200px but can grow. `minmax(200px, 1fr)`.
- **Responsive Grid without Media Queries**:
  ```css
  /* Auto-fit columns that are at least 250px wide */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  ```
  *This one line of CSS creates a fully responsive card layout.*

## 9. Related Topics
- [07_Flexbox.md](./07_Flexbox.md) - The sibling technology.
- [../01_HTML/01_Introduction_to_HTML.md](../01_HTML/01_Introduction_to_HTML.md) - Elements to place in the grid.
