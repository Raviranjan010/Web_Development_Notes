# 2.10 CSS Backgrounds and Borders

## 1. CSS Backgrounds
The CSS background properties are used to define the background effects for elements.

### Properties
1.  **`background-color`**: Sets a solid color.
    ```css
    body { background-color: lightblue; }
    ```
2.  **`background-image`**: Sets an image. By default, it repeats.
    ```css
    body { background-image: url("paper.gif"); }
    ```
3.  **`background-repeat`**:
    - `repeat`: Default. Repeats both ways.
    - `repeat-x`: Repeats horizontally only.
    - `repeat-y`: Repeats vertically only.
    - `no-repeat`: Shows the image once.
4.  **`background-attachment`**:
    - `scroll`: Default. Background moves with the page.
    - `fixed`: Background stays still while page scrolls (Parallax effect).
5.  **`background-position`**: Starting position (e.g., `center`, `top right`).

### Shorthand
All background properties can be specified in one single property:
```css
/* color image repeat attachment position */
body {
    background: #ffffff url("img_tree.png") no-repeat right top;
}
```

---

## 2. CSS Borders
The CSS border properties allow you to specify the style, width, and color of an element's border.

### 1. Border Style (`border-style`)
**Required**. The border will not appear if this is not set.
- `solid`: A solid line.
- `dotted`: A dotted line.
- `dashed`: A dashed line.
- `double`: Two lines.
- `none`: No border.

```css
p.solid { border-style: solid; }
p.dashed { border-style: dashed; }
```

### 2. Border Width (`border-width`)
Set in pixels (`px`) or using keywords (`thin`, `medium`, `thick`).
```css
div {
    border-style: solid;
    border-width: 5px;
}
```

### 3. Border Color (`border-color`)
Set using color names, Hex, or RGB.
```css
div {
    border-style: solid;
    border-color: red;
}
```

### 4. Border Radius (`border-radius`)
Used to add rounded corners to an element.
```css
div {
    border: 2px solid red;
    border-radius: 10px; /* Rounded corners */
}
```

### 5. Individual Sides
You can specify different borders for each side.
```css
div {
    border-top: 6px solid red;
    border-bottom: 6px solid blue;
    border-right: 2px solid green;
    border-left: 2px solid green;
}
```

### 6. Shorthand
```css
/* width style color */
p {
    border: 5px solid red;
}
```
