let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const subjectInput = document.getElementById("subjectInput");
  const dateInput = document.getElementById("dateInput");

  if (taskInput.value === "") return;

  const task = {
    text: taskInput.value,
    subject: subjectInput.value,
    date: dateInput.value,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  subjectInput.value = "";
  dateInput.value = "";
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const searchValue = document.getElementById("searchInput").value.toLowerCase();

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;
    if (!task.text.toLowerCase().includes(searchValue)) return;

    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${task.text}</strong><br/>
      <small>${task.subject} | ${task.date}</small>
      <button class="delete-btn" onclick="deleteTask(${index})">X</button>
    `;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.onclick = () => toggleComplete(index);

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();

let filter = "all";

function setFilter(type) {
  filter = type;
  renderTasks();
}

function clearAll() {
  tasks = [];
  saveTasks();
  renderTasks();
}