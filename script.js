document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

   
    function addTask(taskText, save = true) {
        if (!taskText) return;

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn'); 
        removeButton.onclick = () => {
            taskList.removeChild(li);
            tasks = tasks.filter(t => t !== taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
        taskInput.value = '';

        if (save) {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }


    tasks.forEach(task => addTask(task, false));

    
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (!taskText) {
            alert('Please enter a task');
            return;
        }
        addTask(taskText);
    });

    
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (!taskText) {
                alert('Please enter a task');
                return;
            }
            addTask(taskText);
        }
    });
});
