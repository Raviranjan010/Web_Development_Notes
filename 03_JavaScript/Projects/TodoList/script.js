let inputs = document.querySelector('input');
let btn = document.querySelector('#addBtn');
let taskList = document.getElementById('task-list');

// State
let task = [];

// 1. Load from LocalStorage
let localstoragedata = localStorage.getItem("task array");
if (localstoragedata != null) {
    task = JSON.parse(localstoragedata);
    renderTodos();
}

// 2. Add New Task
btn.addEventListener("click", function () {
    let query = inputs.value;
    inputs.value = "";

    if (query.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let taskObj = {
        id: Date.now(),
        text: query
    };

    task.push(taskObj);
    saveAndRender();
});

// 3. Render Function
function renderTodos() {
    taskList.innerHTML = "";

    for (let i = 0; i < task.length; i++) {
        let { id, text } = task[i];
        let element = document.createElement('div');
        element.classList.add('todo');

        element.innerHTML = `
            <span class="task" contenteditable="false">\${text}</span>
            <div class="actions">
                <button class='edit'>Edit</button>
                <button class='delete'>Delete</button>
            </div>
        `;

        // Event Delegation (Handling clicks inside the element)
        let delbtn = element.querySelector('.delete');
        let editbtn = element.querySelector('.edit');
        let taskText = element.querySelector('.task');

        // Delete Logic
        delbtn.addEventListener("click", function () {
            task = task.filter(t => t.id !== id);
            saveAndRender();
        });

        // Edit Logic
        editbtn.addEventListener("click", function () {
            if (editbtn.innerText === 'Edit') {
                taskText.setAttribute('contenteditable', 'true');
                taskText.focus();
                editbtn.innerText = 'Save';
            } else {
                taskText.setAttribute('contenteditable', 'false');
                let updatedText = taskText.innerText.trim();

                if (updatedText !== "") {
                    // Update array
                    task = task.map(t => {
                        if (t.id === id) t.text = updatedText;
                        return t;
                    });
                    saveAndRender();
                }
                editbtn.innerText = 'Edit';
            }
        });

        taskList.appendChild(element);
    }
}

// Helper to Save and Update UI
function saveAndRender() {
    localStorage.setItem("task array", JSON.stringify(task));
    renderTodos();
}
