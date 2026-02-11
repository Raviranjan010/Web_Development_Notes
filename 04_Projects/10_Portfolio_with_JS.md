# Portfolio Website with JavaScript Features

This project enhances a static HTML/CSS portfolio with JavaScript features like Dark Mode, Typing Animations, and Modals.

## 1. Directory Structure
```
root/
├── index.html
├── styles.css
└── script.js
```

## 2. Source Code

### index.html
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
    
    <!-- Portfolio Content Table -->
    <table border="1" width="100%">
        <tr>
            <td>
                <h3>Portfolio Highlights</h3>
                <ul>
                    <li>Responsive HTML Layout</li>
                    <li>E-commerce Storefront</li>
                    <li>Interactive Form Design</li>
                </ul>
            </td>
            <td>
                <h3>Career Achievements</h3>
                <p>Frontend Developer [Intern] at XYZ</p>
            </td>
            <td>
                <h3>Academic Qualifications</h3>
                <p>B.Tech (Computer Science)</p>
            </td>
        </tr>
    </table>

    <h3>Peer Reviews</h3>
    <table border="1" width="100%">
        <tr>
            <td>John Doe consistently delivers high-quality solutions. - Steven</td>
            <td>Great attention to detail. - David</td>
        </tr>
    </table>

    <footer style="text-align:center;">
        <!-- Dynamic Year will be inserted here -->
    </footer>
    <script src="script.js"></script>
</body>
</html>
```

### styles.css
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}
header {
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
}
table { width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: white; }
td { padding: 20px; border: 1px solid #ddd; }

/* Responsive */
@media (max-width: 768px) {
    table, tr, td { display: block; }
}
```

### script.js
```javascript
// 1. Dark Mode Toggle
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
};

const darkModeBtn = document.createElement('button');
darkModeBtn.innerText = 'Toggle Dark Mode';
Object.assign(darkModeBtn.style, {
    position: 'fixed', bottom: '20px', right: '20px', padding: '10px',
    backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer'
});
darkModeBtn.onclick = toggleDarkMode;
document.body.appendChild(darkModeBtn);

// Inject Dark Mode Styles
const darkStyle = document.createElement('style');
darkStyle.innerHTML = `
    .dark-mode { background-color: #1a1a1a; color: #f5f5f5; }
    .dark-mode table { background-color: #2c2c2c; }
    .dark-mode header, .dark-mode footer { background-color: #111; }
    .dark-mode td { border-color: #444; }
`;
document.head.appendChild(darkStyle);

// 2. Typing Animation
const title = document.querySelector('h2');
const text = "Web Developer and Designer";
let index = 0;
title.innerHTML = ""; // Clear initial text

const typeEffect = () => {
    if (index < text.length) {
        title.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 100);
    }
};
typeEffect();

typeEffect();

// 3. Popup Modal for Peer Reviews
// Add click event to table cells
const peerReviewTable = document.querySelectorAll('table')[1];
if (peerReviewTable) {
    peerReviewTable.querySelectorAll('td').forEach(td => {
        td.style.cursor = 'pointer';
        td.onclick = () => showModal(td.innerText);
    });
}

const showModal = (text) => {
    const modal = document.createElement('div');
    Object.assign(modal.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: '1000'
    });

    const modalContent = document.createElement('div');
    Object.assign(modalContent.style, {
        background: '#fff', padding: '20px', borderRadius: '10px', maxWidth: '600px'
    });
    
    modalContent.innerHTML = `<p>${text}</p><button style="margin-top:10px;">Close</button>`;
    modalContent.querySelector('button').onclick = () => document.body.removeChild(modal);
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
};

// 4. Dynamic Footer Year
const footer = document.querySelector('footer');
footer.innerHTML = `© ${new Date().getFullYear()} All rights reserved by John Doe`;

// 4. Scroll to Top
const scrollBtn = document.createElement('button');
scrollBtn.innerText = '↑ Top';
Object.assign(scrollBtn.style, {
    position: 'fixed', bottom: '60px', right: '20px', padding: '10px',
    backgroundColor: '#2c3e50', color: '#fff', border: 'none', borderRadius: '5px',
    cursor: 'pointer', display: 'none'
});
scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.body.appendChild(scrollBtn);

window.onscroll = () => {
    scrollBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
};
```
