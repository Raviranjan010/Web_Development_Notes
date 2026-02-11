# 4.3 Project: HTML Portfolio

## 1. Objective
Create a personal **Portfolio Website** to showcase your work, skills, and resume. This project focuses on **Layout** (using Tables for structure, as a learning exercise before CSS Grid/Flexbox), **Lists**, and **Semantic HTML**.

## 2. Project Preview
The site will include:
- **Header**: Name and Navigation.
- **Main Section**: 3-Column Layout (Highlights, Career, Qualifications).
- **Testimonials**: A table of peer reviews.
- **Footer**: Copyright info.

---

## 3. Full Source Code

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio of John Doe</title>
</head>
<body>
    <!-- HEADER -->
    <header>
        <h1 style="text-align:center;">John Doe</h1>
        <p style="text-align:center;">Home | Projects | Blogs | Contact</p>
    </header>

    <!-- TITLE -->
    <h2 style="text-align:center;">Web Developer and Designer</h2>

    <!-- MAIN CONTENT (Grid using Table) -->
    <table border="1" width="100%">
        <tr>
            <!-- Column 1: Highlights -->
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

            <!-- Column 2: Achievements -->
            <td>
                <h3>Career Achievements</h3>
                <p>Frontend Developer [Intern] at XYZ<br>
                Headed major product redesigns resulting in a 40% increase in user engagement.<br>
                <a href="#">View My LinkedIn Profile</a></p>
                
                <h3>Community Involvement</h3>
                <p>Active participant in local and online developer forums.<br>
                <a href="#">Visit My GitHub</a></p>
            </td>

            <!-- Column 3: Education -->
            <td>
                <h3>Academic Qualifications</h3>
                <p>B.Tech (Computer Science) from ABC University</p>
                <p>Specializations:</p>
                <ul>
                    <li>Systems Analysis</li>
                    <li>Advanced JavaScript Techniques</li>
                    <li>Web Accessibility Standards</li>
                    <li>Performance Optimization</li>
                </ul>
            </td>
        </tr>
    </table>

    <!-- TESTIMONIALS -->
    <h3>Peer Reviews</h3>
    <table border="1" width="100%">
        <tr>
            <td>John Doe consistently delivers high-quality, innovative solutions... - Steven, Project Lead</td>
            <td>John Doe is known for his precise attention to detail... - David, UI Designer</td>
            <td>John's approach to problem-solving has been instrumental... - Sarah, Frontend Developer</td>
        </tr>
    </table>

    <!-- FOOTER -->
    <footer style="text-align:center;">
        © [2025] All rights reserved by John Doe
    </footer>
</body>
</html>
```

## 4. Code Breakdown

### 1. Document Structure
- `<!DOCTYPE html>`: Tells the browser this is HTML5.
- `<meta name="viewport" ...>`: Crucial for mobile responsiveness.

### 2. Semantic Elements
- `<header>`, `<footer>`: Clearly define the top and bottom of the page.
- `<h1>`, `<h2>`, `<h3>`: Hierarchy of headings for SEO.

### 3. Layout Technique (Tables)
We used `<table>` to create a 3-column layout.
- `<tr>`: The single row holding the 3 columns.
- `<td>`: Each cell acts as a column content wrapper.
*Note: In modern development, we use CSS Grid/Flexbox for this, but understanding table layout is great for email templates and legacy code.*

### 4. Inline CSS
- `style="text-align:center;"`: Used to center text without an external CSS file.
