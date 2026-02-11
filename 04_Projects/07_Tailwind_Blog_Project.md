# 4.7 Project: Responsive Blog Layout (Tailwind CSS)

## Introduction
A blog layout is a fundamental component of many websites, enabling content creators to showcase their articles in an organized and visually appealing manner. We will explore how to create a responsive blog layout in Tailwind CSS for styling purposes.

## Step-by-Step Guide
**Step 1**: First, create a layout in HTML and integrate Tailwind CSS via CDN link, then create a div with the class "blog-post" to wrap each blog post. Inside the div, include an image, title, description, and a "Read More" button.

**Step 2**: Create a modal structure outside the main content area. The modal should have a unique ID and contain a close button, title, and detailed content related to the blog post.

**Step 3**: Style the modal to be initially hidden (`display: none`) and positioned fixed with a semi-transparent background for overlay effect.

**Step 4**: Use JavaScript to handle the click event on the "Read More" button. When the button is clicked, show the corresponding modal by setting its display property to "block". Add event listeners to the modal's close button and the overlay area to close the modal when clicked.

**Step 5**: Repeat steps 1-4 for each additional blog post and its corresponding modal, ensuring unique IDs for modals and proper content mapping between buttons and modals.

## Project Source Code

### HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Blog Layout</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="fixed top-0 left-0 h-full w-64 
                bg-white shadow-lg overflow-y-auto
                transform -translate-x-full 
                transition-transform duration-300
                ease-in-out z-50">
        <div class="p-6">
            <div class="text-center mb-4">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240429130139/employee.png"
                     alt="Profile Picture" 
                     class="rounded-full mx-auto mb-2">
                <h3 class="text-lg font-semibold">
                    Sahil Trivedi
                </h3>
                <p class="text-gray-600">
                    Web Developer
                </p>
            </div>
            <h4 class="text-xl font-semibold mb-2">
                About Me
            </h4>
            <p class="text-gray-700 mb-6">
                I'm a passionate web developer with
                a love for coding and creating amazing
                digital experiences.
            </p>
            <h4 class="text-xl font-semibold mb-2">
                Popular Posts
            </h4>
            <ul>
                <li class="flex items-center mb-4 
                           transition duration-300 
                           ease-in-out transform 
                           hover:-translate-x-2">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240117155347/responsive-web-design-copy.webp"
                         alt="Post Image" 
                         class="w-16 h-16 object-cover
                                rounded-md mr-2">
                    <div>
                        <a href="#" class="text-blue-500
                                             hover:underline read-more" 
                           data-title="Responsive Web Design">
                            Responsive Web Design
                        </a>
                        <p class="text-sm 
                                  text-gray-600">
                            March 21, 2024
                        </p>
                    </div>
                </li>
                <!-- More items... -->
                 <li class="flex items-center mb-4 
                           transition duration-300 
                           ease-in-out transform 
                           hover:-translate-x-2">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230809133232/JavaScript-Complete-Guide-copy-2.webp"
                         alt="Post Image" 
                         class="w-16 h-16 object-cover
                                rounded-md mr-2">
                    <div>
                        <a href="#" class="text-blue-500
                                             hover:underline 
                                           read-more" 
                           data-title="JavaScript Fundamentals">
                            JavaScript Fundamentals
                        </a>
                        <p class="text-sm text-gray-600">
                            March 18, 2024
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <!-- Toggle Button -->
    <div class="fixed top-0 left-0
                p-4 cursor-pointer
                z-50 transition 
                duration-300 ease-in-out
                transform hover:scale-110">

        <svg xmlns="https://www.w3.org/2000/svg" 
             class="h-8 w-8 text-gray-500 
                    hover:text-gray-700" 
             fill="none" viewBox="0 0 24 24" 
             stroke="currentColor">
            <path stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 6h16M4 12h16m-7 6h7">
            </path>
        </svg>
    </div>

    <div class="container mx-auto py-8 px-4 md:px-0">
        <h1 class="text-3xl font-semibold text-center mb-8">
            Welcome to GeeksforGeeks Blog
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <!-- Blog Posts -->
            <div class="blog-post bg-white
                        rounded-lg overflow-hidden
                        shadow-md hover:shadow-lg
                        transition duration-300 
                        ease-in-out transform 
                        hover:-translate-y-1">
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240117155347/responsive-web-design-copy.webp"
                     alt="Blog Post Image" 
                     class="w-full h-40 object-cover rounded-t-lg">
                <div class="p-6">
                    <h2 class="text-xl font-semibold mb-2">
                        Responsive Web Design
                    </h2>
                    <p class="text-gray-700 mb-4">
                        Learn how to create responsive
                        web designs that look great on all
                        devices.
                    </p>
                    <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-600">
                            March 21, 2024
                        </p>
                        <a href="#" class="text-blue-500 hover:underline read-more" 
                           data-title="Responsive Web Design">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Add more blog posts here following the same structure -->
            
        </div>
    </div>
    
    <!-- Modal -->
    <div class="bg-gray-800 bg-opacity-75 
                flex items-center justify-center
                z-50 hidden fixed top-0 left-0
                w-full h-full overflow-y-auto">
        <div class="bg-white p-8 rounded-lg max-w-xl w-full">
            <h2 id="modal-title" class="text-2xl font-semibold mb-4"></h2>
            <div id="modal-content" class="text-gray-700"></div>
            <button id="close-modal" class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Close
            </button>
        </div>
    </div>

    <script>
        const toggleButton = document.querySelector('.fixed.top-0.left-0.p-4.cursor-pointer.z-50');
        const sidebar = document.querySelector('.fixed.top-0.left-0.h-full.w-64.bg-white.shadow-lg.overflow-y-auto');
        const readMoreLinks = document.querySelectorAll('.read-more');
        const modal = document.querySelector('.bg-gray-800.bg-opacity-75.flex.items-center.justify-center.z-50.hidden');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        const closeModalButton = document.getElementById('close-modal');

        toggleButton.addEventListener('click', () => {
             // In the provided code, the selector for sidebar above might need adjustment to match the specific class string used for toggling, 
             // or we use the reference `sidebar` variable if classes match.
             // Based on user code logic:
            sidebar.classList.toggle('-translate-x-full');
            document.body.classList.toggle('blur');
        });

        readMoreLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const postTitle = link.dataset.title;
                modalTitle.textContent = postTitle;
                
                // Content Logic
                if (postTitle === 'Responsive Web Design') {
                    modalContent.innerHTML = `...specific content...`; 
                } 
                // ... (other conditions)
                
                modal.classList.remove('hidden');
            });
        });

        closeModalButton.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    </script>
</body>
</html>
```
