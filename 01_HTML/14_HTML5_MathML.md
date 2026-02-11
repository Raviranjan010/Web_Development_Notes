# 1.14 HTML5 MathML

## 1. What is MathML?
**MathML (Mathematical Markup Language)** is an XML-based language used to write mathematical formulas and equations directly in HTML.
It creates high-quality, accessible math content that looks better than inserting images of formulas.

## 2. Why use it?
- **Standard**: Integral part of HTML5.
- **Accessible**: Screen readers can "read" the math to visually impaired users.
- **Scalable**: It renders as text/vectors, so it stays crisp at any zoom level.

## 3. Basic Syntax
All MathML code must be wrapped in a `<math>` tag.

```html
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <!-- Math content goes here -->
</math>
```

## 4. Common Tags

| Tag | Description |
| :--- | :--- |
| `<math>` | Root element. |
| `<mrow>` | Groups elements into a horizontal row. |
| `<mn>` | Contains a **Number** (e.g., 2, 10). |
| `<mi>` | Contains an **Identifier** (e.g., x, y, variable names). |
| `<mo>` | Contains an **Operator** (e.g., +, -, =). |
| `<mfrac>` | Creates a **Fraction**. First child is numerator, second is denominator. |
| `<msup>` | Creates a **Superscript** (Power), e.g., $x^2$. |
| `<msub>` | Creates a **Subscript**, e.g., $H_2$. |
| `<msqrt>` | Creates a **Square Root**. |

---

## 5. Examples

### 1. Simple Fraction (1/2)
```html
<p>Here is a simple fraction:</p>
<math xmlns="http://www.w3.org/1998/Math/MathML">
    <mfrac>
        <mn>1</mn>
        <mn>2</mn>
    </mfrac>
</math>
```

### 2. Pythagorean Theorem ($a^2 + b^2 = c^2$)
```html
<p>Pythagorean theorem:</p>
<math xmlns="http://www.w3.org/1998/Math/MathML">
    <mrow>
        <msup><mi>a</mi><mn>2</mn></msup>
        <mo>+</mo>
        <msup><mi>b</mi><mn>2</mn></msup>
        <mo>=</mo>
        <msup><mi>c</mi><mn>2</mn></msup>
    </mrow>
</math>
```
- `<msup>` takes two children: the base (`a`) and the exponent (`2`).
- `<mrow>` keeps them grouped together.

### 3. Chemical Formula ($H_2O$)
Use `<msub>` for subscripts.
```html
<p>Water:</p>
<math xmlns="http://www.w3.org/1998/Math/MathML">
    <mrow>
        <mi>H</mi>
        <msub><mn>2</mn></msub>
        <mi>O</mi>
    </mrow>
</math>
```

### 4. Quadratic Formula (Complex)
```html
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>x</mi>
  <mo>=</mo>
  <mfrac>
    <mrow>
      <mo>-</mo>
      <mi>b</mi>
      <mo>±</mo>
      <msqrt>
        <msup><mi>b</mi><mn>2</mn></msup>
        <mo>-</mo>
        <mn>4</mn>
        <mi>a</mi>
        <mi>c</mi>
      </msqrt>
    </mrow>
    <mrow>
      <mn>2</mn>
      <mi>a</mi>
    </mrow>
  </mfrac>
</math>
```

---

## 6. Limitations
- **Browser Support**: While better than before, complex MathML styling usually requires Firefox or Safari. Chrome support is improving but can sometimes be inconsistent for very advanced layouts.
- **Not for Calculation**: It only *displays* math; it does not calculate it. You need JavaScript for that.
