document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const newTaskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                ${task.text}
                <div>
                    <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="removeTask(${index})">Remove</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }
    function addTask(task) {
        tasks.push({ text: task, completed: false });
        saveTasks();
        renderTasks();
    }
    function removeTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = newTaskInput.value.trim();
        if (newTask) {
            addTask(newTask);
            newTaskInput.value = '';
        }
    });
    renderTasks();
    window.removeTask = removeTask;
    window.toggleTask = toggleTask;
});
