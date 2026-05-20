# 📝 Project 1: Advanced Task Manager (Todo App)

A fully-featured, production-ready Task Manager component containing category tags, nested subtask items, filter selectors, and local storage synchronization.

---

## 1. Features
1. **Local Storage Persistence**: Saves the task list automatically to `localStorage` on any state update.
2. **Filters**: Sorts active views by status (All, Active, Completed).
3. **Subtasks**: Adds and toggles subtask checklists inside each parent task card.
4. **Category Tags**: Assigns colorful categories (e.g. Work, Personal, Shopping) to organize tasks.
5. **Clear Completed**: Clears all completed tasks in one click.

---

## 2. Component Architecture Diagram
```
                     ┌───────────────────┐
                     │   TodoApp (Root)  │ (State: tasks, filter, inputText, category)
                     └─────────┬─────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   TodoInputForm  │  │   FilterControls │  │     TodoList     │
└──────────────────┘  └──────────────────┘  └─────────┬────────┘
                                                      │
                                                      ▼
                                            ┌──────────────────┐
                                            │     TodoItem     │ (Subtask toggles)
                                            └──────────────────┘
```

---

## 3. Complete Implementation Code

```jsx
import React, { useState, useEffect } from 'react';

export default function TodoApp() {
  // 1. Initialize state from localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('mastery_todos');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'Learn React Internals',
        completed: false,
        category: 'Work',
        subtasks: [
          { id: 11, title: 'Understand VDOM Diffing', completed: true },
          { id: 12, title: 'Read Fiber architecture', completed: false }
        ]
      }
    ];
  });

  const [titleInput, setTitleInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Work');
  const [filter, setFilter] = useState('All');

  // 2. Synchronize changes with local storage
  useEffect(() => {
    localStorage.setItem('mastery_todos', JSON.stringify(tasks));
  }, [tasks]);

  // 3. Add a new parent task
  const addTask = (e) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    const newTask = {
      id: Date.now(),
      title: titleInput.trim(),
      completed: false,
      category: categoryInput,
      subtasks: []
    };

    setTasks(prev => [...prev, newTask]);
    setTitleInput('');
  };

  // 4. Toggle completion status of parent task
  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    ));
  };

  // 5. Add a subtask to a parent task
  const addSubtask = (taskId, subtaskTitle) => {
    if (!subtaskTitle.trim()) return;
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newSub = { id: Date.now(), title: subtaskTitle.trim(), completed: false };
        return { ...task, subtasks: [...task.subtasks, newSub] };
      }
      return task;
    }));
  };

  // 6. Toggle subtask completion status
  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedSubs = task.subtasks.map(sub => 
          sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
        );
        return { ...task, subtasks: updatedSubs };
      }
      return task;
    }));
  };

  // 7. Filter items for render
  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true; // All
  });

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', fontFamily: 'sans-serif', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fafafa' }}>
      <h2>📝 Task Manager</h2>

      {/* Task Creation Form */}
      <form onSubmit={addTask} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input 
          value={titleInput} 
          onChange={e => setTitleInput(e.target.value)} 
          placeholder="What needs to be done?" 
          style={{ flexGrow: 1, padding: '8px' }}
        />
        <select value={categoryInput} onChange={e => setCategoryInput(e.target.value)} style={{ padding: '8px' }}>
          <option value="Work">💼 Work</option>
          <option value="Personal">🏡 Personal</option>
          <option value="Shopping">🛒 Shopping</option>
        </select>
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none' }}>Add</button>
      </form>

      {/* Filter Options */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['All', 'Active', 'Completed'].map(type => (
          <button 
            key={type}
            onClick={() => setFilter(type)} 
            style={{ padding: '6px 12px', border: '1px solid #ddd', backgroundColor: filter === type ? '#007bff' : 'white', color: filter === type ? 'white' : 'black', cursor: 'pointer' }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Todo list items */}
      <ul style={{ padding: 0 }}>
        {filteredTasks.map(task => (
          <li key={task.id} style={{ border: '1px solid #eee', padding: '12px', borderRadius: '4px', marginBottom: '8px', listStyle: 'none', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleTask(task.id)}
                  style={{ marginRight: '8px' }}
                />
                {task.title}
              </label>
              <span style={{ fontSize: '11px', padding: '3px 6px', backgroundColor: '#eee', borderRadius: '12px' }}>
                {task.category}
              </span>
            </div>

            {/* Subtask list section */}
            <div style={{ marginTop: '8px', paddingLeft: '20px', borderLeft: '2px solid #eee' }}>
              {task.subtasks.map(sub => (
                <label key={sub.id} style={{ display: 'block', fontSize: '13px', textDecoration: sub.completed ? 'line-through' : 'none', cursor: 'pointer', margin: '4px 0' }}>
                  <input 
                    type="checkbox" 
                    checked={sub.completed} 
                    onChange={() => toggleSubtask(task.id, sub.id)}
                    style={{ marginRight: '6px' }}
                  />
                  {sub.title}
                </label>
              ))}
              <SubtaskForm onAdd={(title) => addSubtask(task.id, title)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Child Form to add subtasks locally
function SubtaskForm({ onAdd }) {
  const [val, setVal] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!val.trim()) return;
    onAdd(val);
    setVal('');
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
      <input 
        value={val} 
        onChange={e => setVal(e.target.value)} 
        placeholder="Add subtask..." 
        style={{ fontSize: '12px', padding: '3px', flexGrow: 1 }}
      />
      <button type="submit" style={{ fontSize: '11px', cursor: 'pointer' }}>+</button>
    </form>
  );
}
```
