# 4.2 Project: HTML Survey System

## 1. Objective
Build a comprehensive **Survey Form** using **pure HTML**. This project will test your understanding of forms, inputs, input types, and form attributes.

## 2. Requirements
1.  **Form Structure**: Use proper `<form>` tags.
2.  **Personal Details**: Name, Email, Age (number).
3.  **Dropdown**: "Which option describes you best?" (Student, Professional, etc.).
4.  **Radio Buttons**: "Would you recommend us?" (Definitely, Maybe, Not sure).
5.  **Checkboxes**: "What would you like to see improved?" (Videos, Projects, Notes).
6.  **Comments**: A `<textarea>` for additional feedback.
7.  **Submit**: A button to send the form.

---

## 3. Step-by-Step Implementation

### Step 1: correct Inputs
```html
<form>
    <!-- Text Input -->
    <label for="name">Name:</label>
    <input type="text" id="name" placeholder="Enter your name" required>
    <br><br>

    <!-- Email Input -->
    <label for="email">Email:</label>
    <input type="email" id="email" placeholder="Enter your email" required>
    <br><br>

    <!-- Number Input -->
    <label for="age">Age:</label>
    <input type="number" id="age" min="10" max="99" placeholder="Age">
    <br><br>
```

### Step 2: Dropdowns and Options
```html
    <label for="role">Which option describes you best?</label>
    <select id="role">
        <option value="student">Student</option>
        <option value="job">Full Time Job</option>
        <option value="learner">Learner</option>
    </select>
    <br><br>
```

### Step 3: Radio Buttons (Grouped)
*Note: The `name` attribute must be the same for all radio buttons in a group.*
```html
    <p>Would you recommend us to a friend?</p>
    <input type="radio" name="recommend" value="yes"> Definitely<br>
    <input type="radio" name="recommend" value="maybe"> Maybe<br>
    <input type="radio" name="recommend" value="no"> Not sure<br>
    <br>
```

### Step 4: Checkboxes
```html
    <p>What would you like to see improved?</p>
    <input type="checkbox" value="videos"> Front-end Projects<br>
    <input type="checkbox" value="notes"> Back-end Projects<br>
    <input type="checkbox" value="challenges"> Data Visualization<br>
    <br>
```

### Step 5: Textarea and Submit
```html
    <label for="comments">Any comments or suggestions?</label><br>
    <textarea id="comments" rows="5" cols="30" placeholder="Enter your comment here..."></textarea>
    <br><br>

    <button type="submit">Submit</button>
</form>
```

## 4. Final Verification
- Ensure `name` attributes are used for radio buttons so only one can be selected.
- Use `<label>` tags with `for` attributes correctly linked to input `id`s for accessibility.
