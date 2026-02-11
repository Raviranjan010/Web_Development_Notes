# 4.3 Project: Portfolio Styling (CSS)

## 1. Objective
In the previous project (**4.2 HTML Portfolio**), we built the structure of a personal portfolio using semantic HTML and tables. Now, we will bring it to life using **CSS**.

**Goal**: Transform the plain HTML into a visually appealing, professional, and mobile-responsive website.

## 2. Project Preview
The final result will feature:
- A styled **Header** and **Navigation** bar.
- A **Hero Section** (Name and Title) with centered text.
- A **3-Column Layout** for content (Highlights, Career, Education) that stacks vertically on mobile devices.
- **Styled Tables** and **Lists**.
- A polished **Footer**.

---

## 3. Source Code

### HTML Structure (`index.html`)
This is the HTML we created previously, with a link to our new CSS file.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio of John Doe</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1 style="text-align:center;">John Doe</h1>
        <p style="text-align:center;">Home | Projects | Blogs | Contact</p>
    </header>
    <h2 style="text-align:center;">Web Developer and Designer</h2>
    
    <!-- Main Content Table -->
    <table border="1" width="100%">
        <tr>
            <td>
                <h3>Portfolio Highlights</h3>
                <ul>
                    <li>Responsive HTML Layout</li>
                    <li>E-commerce Storefront</li>
                    <li>Interactive Form Design</li>
                    <li>Event Countdown Widget</li>
                    <li>Prototype Landing Pages</li>
                </ul>
            </td>
            <td>
                <h3>Career Achievements</h3>
                <p>Frontend Developer [Intern] at XYZ<br>Headed major product redesigns resulting in a 40% increase in user engagement.<br><a href="#">View My LinkedIn Profile</a></p>
                <h3>Community Involvement</h3>
                <p>Active participant in local and online developer forums. Regularly contribute to web development blogs and GitHub projects.<br><a href="#">Visit My GitHub</a></p>
            </td>
            <td>
                <h3>Academic Qualifications</h3>
                <p>B.Tech (Computer Science) from ABC University</p>
                <p>Specializations:</p>
                <ul>
                    <li>Systems Analysis</li>
                    <li>Advanced JavaScript Techniques</li>
                    <li>Web Accessibility Standards</li>
                    <li>Performance Optimization in Web Applications</li>
                    <li>Cloud Computing Infrastructure</li>
                    <li>Security in Web Applications</li>
                    <li>Advanced Algorithms</li>
                </ul>
            </td>
        </tr>
    </table>

    <h3>Peer Reviews</h3>
    <table border="1" width="100%">
        <tr>
            <td>John Doe consistently delivers high-quality, innovative solutions that exceed project expectations. - Steven, Project Lead</td>
            <td>John Doe is known for his precise attention to detail and his ability to mentor younger developers. - David, UI Designer</td>
            <td>John's approach to problem-solving has been instrumental in our success. - Sarah, Frontend Developer</td>
        </tr>
    </table>

    <footer style="text-align:center;">
        © [2025] All rights reserved by John Doe
    </footer>
</body>
</html>
```

### CSS Styling (`styles.css`)
Save this code in a file named `styles.css` in the same folder as your HTML.

```css
/* 1. Reset default margins and paddings */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 2. Body styling */
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
    max-width: 1200px;
    margin: 0 auto; /* Center the container */
    padding: 20px;
}

/* 3. Header styling */
header {
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
}

header h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
}

header p {
    font-size: 1.1em;
}

/* Header Links */
header p a {
    color: #3498db;
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.3s;
}

header p a:hover {
    color: #2980b9;
}

/* 4. Main heading */
h2 {
    color: #2c3e50;
    margin: 20px 0;
    font-size: 1.8em;
}

/* 5. Table styling */
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Subtle shadow for depth */
}

table td {
    padding: 20px;
    vertical-align: top;
    border: 1px solid #ddd;
}

h3 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 1.4em;
}

/* 6. List styling */
ul {
    list-style-type: none;
    padding-left: 20px;
}

ul li {
    margin-bottom: 10px;
    position: relative;
}

/* Custom bullet points */
ul li::before {
    content: '•';
    color: #3498db;
    position: absolute;
    left: -20px;
}

/* 7. Links */
a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s;
}

a:hover {
    color: #2980b9;
    text-decoration: underline;
}

/* Paragraph spacing */
p {
    margin-bottom: 10px;
}

/* 8. Footer styling */
footer {
    background-color: #2c3e50;
    color: white;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
}

/* 9. Responsive design (Media Query) */
@media (max-width: 768px) {
    /* Make table elements block-level to stack them */
    table, table tbody, table tr, table td {
        display: block;
        width: 100%;
    }
    
    table tr {
        margin-bottom: 20px;
    }
    
    table td {
        border: none;
        border-bottom: 1px solid #ddd;
    }
    
    /* Adjust font sizes for mobile */
    header h1 {
        font-size: 2em;
    }
    
    h2 {
        font-size: 1.5em;
    }
}
```

---

## 4. Key Takeaways

1.  **Reset**: We used `* { margin: 0; padding: 0; box-sizing: border-box; }` to ensure consistent spacing across browsers.
2.  **Typography**: Changed fonts (`Arial`), colors (`#333`, `#2c3e50`), and line heights for better readability.
3.  **Visual Hierarchy**: Used font sizes and colors to distinguish Headers (`h1`, `h2`) from body text.
4.  **Decorations**: Added `border-radius` for soft corners and `box-shadow` to give the table depth (card effect).
5.  **Responsiveness**: The `@media` query transforms the table layout into a single-column layout on smaller screens (`max-width: 768px`). This is crucial for mobile users.

## 5. Challenges
-   **Experiment**: Try changing the color scheme to your favorite colors.
-   **Interactive**: Add a hover effect to the table rows (`tr:hover { background-color: #f9f9f9; }`).
