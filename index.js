let form = document.querySelector("#task-form");
let taskList = document.querySelector("#task-list");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let taskName = document.querySelector("#task-input").value;
  let dueDate = document.querySelector("#due-date-input").value;
  let priority = document.querySelector("#priority-input").value;
  let status = document.querySelector("#status-input").value;

  tasks.push({
    name: taskName,
    dueDate: dueDate,
    priority: priority,
    status: status,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  let li = document.createElement("li");

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  let editButton = document.createElement("button");
  editButton.textContent = "Edit";

  deleteButton.addEventListener("click", function () {
    let index = tasks.findIndex(
      (task) => task.name === taskName && task.dueDate === dueDate
    );
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskList.removeChild(li);
  });

  editButton.addEventListener("click", function () {
    let input = document.createElement("input");
    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    input.value = li.textContent.slice(0, -11);

    li.textContent = "";
    li.append(input, saveButton, deleteButton);

    saveButton.addEventListener("click", function () {
      let index = tasks.findIndex(
        (task) => task.name === taskName && task.dueDate === dueDate
      );
      tasks[index] = { name: input.value, dueDate: dueDate };
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    li.textContent = `${input.value} - Due: ${dueDate} `;
    li.append(editButton, deleteButton);
  });

  li.textContent = `${taskName} - Due: ${dueDate} `;
  li.append(editButton, deleteButton);

  taskList.appendChild(li);
});

let taskss = [
  { name: "Do homework", dueDate: "2023-09-01" },
  { name: "Buy groceries", dueDate: "2023-09-02" },
  
];

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  for (let task of tasks) {
    createTaskElement(task.name, task.dueDate);
  }
}

window.addEventListener("DOMContentLoaded", loadTasks);

function createTaskElement(taskName, dueDate, priority, status) {
  
  li.textContent = `${taskName} - Due: ${dueDate} - Priority: ${priority} - Status: ${status}`;

  let dueDateP = document.createElement('p');
    dueDateP.textContent = 'Due: ' + dueDate;
    li.appendChild(dueDateP);
  }

li.draggable = true;

li.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text', this.textContent);
});

ul.addEventListener('dragover', function(event) {
    event.preventDefault();
});

ul.addEventListener('drop', function(event) {
    event.preventDefault();
    let taskName = event.dataTransfer.getData('text');
    let taskIndex = tasks.findIndex(task => task.name === taskName);
    tasks[taskIndex].status = 'Done';  
    localStorage.setItem('tasks', JSON.stringify(tasks));
     renderTasks();
});

let filterForm = document.querySelector("#filter-form");

filterForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let filter = document.querySelector("#filter-input").value;
    
    let filteredTasks = tasks.filter(task => {
        if (filter === 'all') {
            return true;
        } else if (filter === 'to-do') {
            return task.status === 'To-do';
        } else if (filter === 'in-progress') {
            return task.status === 'In progress';
        } else if (filter === 'done') {
            return task.status === 'Done';
        }
    });
    
  
    renderTasks(filteredTasks);
});

function renderTasks(tasksToRender = tasks) {
   
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    tasksToRender.forEach(task => {
        let li = createTaskElement(task.name, task.dueDate, task.priority, task.status);
        ul.appendChild(li);
    });
}

function updateTaskCounts() {
    let toDoCount = tasks.filter(task => task.status === 'To-do').length;
    let inProgressCount = tasks.filter(task => task.status === 'In progress').length;
    let doneCount = tasks.filter(task => task.status === 'Done').length;

    document.querySelector('#to-do-count').textContent = 'To-do: ' + toDoCount;
    document.querySelector('#in-progress-count').textContent = 'In Progress: ' + inProgressCount;
    document.querySelector('#done-count').textContent = 'Done: ' + doneCount;
}

taskForm.addEventListener('submit', function(event) {
    
    event.preventDefault();
    
    let taskInput = document.querySelector('#task-input');
    let dueDateInput = document.querySelector('#due-date-input');
    
   
    if (taskInput.value) {
       
        let newTask = new Task(taskInput.value, dueDateInput.value);
    
    }
    
   
    updateTaskCounts();
});

ul.addEventListener('click', function(event) {
    
    updateTaskCounts();
});

ul.addEventListener('change', function(event) {
   
    updateTaskCounts();
});

class Task {
    constructor(name, dueDate, priority = 'Medium', status = 'To-do') {
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }
}

let themeSwitchButton = document.querySelector('#theme-switch');

themeSwitchButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
});

let searchInput = document.querySelector('#search-input');

searchInput.addEventListener('input', function(e) {
    let searchQuery = e.target.value.toLowerCase();

    let filteredTasks = tasks.filter(function(task) {
        return task.name.toLowerCase().includes(searchQuery);
    });

    displayTasks(filteredTasks);
});

function displayTasks(tasksToDisplay) {
    
    taskList.innerHTML = '';
    
    
    tasksToDisplay.forEach(function(task) {
        addTaskToList(task);
    });
}