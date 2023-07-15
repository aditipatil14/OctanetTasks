// Load tasks from local storage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks
function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.width = '18px';
    checkbox.style.height = '18px';
    checkbox.style.border = '2px solid black';
    checkbox.style.padding = '5px';
    checkbox.style.accentColor = '#E7CEA6';
    checkbox.style.borderRadius = '50%';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed || false;
    checkbox.addEventListener('change', () => toggleTaskStatus(index));

    const taskText = document.createElement('span');
    taskText.textContent = task.name;

    const dueDate = document.createElement('span');
    dueDate.textContent = task.dueDate;
    dueDate.className = 'due-date';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '<i class="delete-button-icon">&#10006;</i>';
    deleteButton.addEventListener('click', () => deleteTask(index));

    card.appendChild(checkbox);
    card.appendChild(taskText);
    card.appendChild(dueDate);
    card.appendChild(deleteButton);
    taskList.appendChild(card);

    // Check if task is overdue
    const isOverdue = isTaskOverdue(task.dueDate);
    const isChecked = checkbox.checked;

    if (isOverdue && !isChecked) {
      card.classList.add('overdue');
    } else if (!isChecked) {
      card.classList.add('not-completed');
    } else {
      card.classList.add('completed');
    }
  });
}


// Add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const dueDateInput = document.getElementById('dueDateInput');
  const taskName = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (taskName !== '') {
    const newTask = {
      name: taskName,
      dueDate: dueDate,
      completed: false
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    dueDateInput.value = '';
    displayTasks();
  }
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}

// Toggle task status
function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}


// Check if task is overdue
function isTaskOverdue(dueDate) {
  const now = new Date().setHours(0, 0, 0, 0);
  const taskDueDate = new Date(dueDate).setHours(0, 0, 0, 0);
  return now > taskDueDate;
}

displayTasks();