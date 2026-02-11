# 2.4 CSS Colors and Units

## 1. CSS Colors
CSS colors are used to change the look of text, backgrounds, borders, and other elements.
- **Purpose**: Create contrast, highlight content, and improve visual design.

### Color Formats
| Format | Description | Example |
| :--- | :--- | :--- |
| **Color Names** | Predefined names (140+ supported). | `red`, `blue`, `forestgreen` |
| **Hex Codes** | Six-digit hexadecimal codes (`#RRGGBB`). | `#FF5733` (Red-Orange) |
| **RGB** | Red, Green, Blue values (0-255). | `rgb(255, 0, 0)` |
| **RGBA** | RGB + Alpha (Transparency 0.0 to 1.0). | `rgba(0, 255, 0, 0.5)` |
| **HSL** | Hue (0-360), Saturation (%), Lightness (%). | `hsl(120, 100%, 50%)` |
| **HSLA** | HSL + Alpha. | `hsla(120, 100%, 50%, 0.3)` |

### Use Cases & Examples
- **Background**: `background-color: #FF5733;`
- **Text**: `color: rgb(255, 0, 0);`
- **Border**: `border: 5px solid rgba(0, 255, 0, 0.5);`
- **Gradient**: `background: linear-gradient(to right, #FF5733, #33FF57);`

---

## 2. CSS Units
Units determine the size of elements, fonts, margins, etc.

### 1. Absolute Units
Fixed size. Not recommended for responsive screens (except pixels).
- **px**: Pixels. Most common. (1px = 1/96th inch).
- **pt, cm, in**: Print media units.

### 2. Relative Units
Scale based on other values. Essential for Responsive Design.

| Unit | Relative To | Use Case |
| :--- | :--- | :--- |
| **%** | **Parent** Element | Widths, Layouts. |
| **em** | **Parent's Font Size** | Components that scale with text. |
| **rem** | **Root (`html`) Font Size** | **Global sizing, Text (Best Practice)**. |
| **vw** | **Viewport Width** (1% of window) | Full-width banners, Responsive typography. |
| **vh** | **Viewport Height** (1% of window) | Full-screen sections (`100vh`). |

### Deep Dive: `em` vs `rem`
- **`rem` (Root EM)**: Consistent. If root is 16px, `2rem` is always 32px.
- **`em`**: Compounding. If parent is 20px, `2em` = 40px. If nested inside another 2em, it doubles again. **Use carefully**.

### Deep Dive: `px` vs `%`
- **`px`**: Static. `width: 200px` stays 200px on mobile.
- **`%`**: Fluid. `width: 50%` shrinks on mobile.
