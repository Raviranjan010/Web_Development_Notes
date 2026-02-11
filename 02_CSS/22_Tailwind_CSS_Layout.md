# 2.22 Tailwind CSS Layout Complete Reference

**Tailwind CSS** is a utility-first CSS framework for rapid custom UI. It is a highly customizable, low-level CSS framework that gives you all of the building blocks that you need. As we know, there are many CSS frameworks but people always choose the fast and easy framework to learn and use in the project. We can make the layout of a very nice page quickly using Tailwind CSS layout.

## Tailwind CSS Layout Classes

| Tailwind CSS Class | Description |
| :--- | :--- |
| **Container** | It fix the max-width of an element to match the min-width of the breakpoint. |
| **Box Sizing** | It defines how the user should calculate the total width and height of an element. |
| **Display** | It defines how the components (div, hyperlink, heading, etc) are going to be placed on the web page. |
| **Float** | It defines the flow of content for controlling the wrapping of content around an element. |
| **Clear** | It is used to specify which side of floating elements are not allowed to float. |
| **Object Fit** | It specifies how an image or video should be resized to fit its content box. |
| **Object Position** | It specifies how an image or video element is positioned with x/y coordinates. |
| **Overflow** | It tells whether to clip content or to add scroll bars. |
| **Overscroll Behavior** | It sets the behavior of the browser when the boundary of a scrolling area is reached. |
| **Position** | It is used for controlling how an element is positioned in the DOM. |
| **Top/Right/Bottom/Left** | These classes are used to control the alignment of a positioned element. |
| **Visibility** | It is used to specify whether an element is visible or not. |
| **Z-index** | It describes the z-index along the three-dimensional plane. |

## Example: Layout with Floats

The below example will give you a brief idea about the Layout of Tailwind CSS:

```html
<!DOCTYPE html>
<html>
<head>
    <link href="https://unpkg.com/tailwindcss@1.9.6/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="text-center">
    <h1 class="text-green-600 text-5xl font-bold">
        GeeksforGeeks
    </h1>
    <b>Tailwind CSS float Class</b>
    <div class="mx-10">
        <img class="float-right p-2" src="https://media.geeksforgeeks.org/wp-content/uploads/20190807114330/GFG115.png">

        <p class="text-justify ">
            How many times were you frustrated while looking out
            for a good collection of programming/algorithm/interview
            questions? What did you expect and what did you get?
            This portal has been created to provide well written,
            well thought and well explained solutions for selected
            questions. An IIT Roorkee alumnus and founder of
            GeeksforGeeks. He loves to solve programming problems
            in most efficient ways. Apart from GeeksforGeeks, he
            has worked with DE Shaw and Co. as a software developer
            and JIIT Noida as an assistant professor.It is a good
            platform to learn programming. It is an educational
            website. Prepare for the Recruitment drive of product
            based companies like Microsoft, Amazon, Adobe etc with
            a free online placement preparation course.
        </p>
    </div>
</body>
</html>
```
