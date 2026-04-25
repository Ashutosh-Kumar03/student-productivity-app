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
  <button class="edit-btn" onclick="editTask(${index})">Edit</button>
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

  // remove active from all
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.classList.remove("active-filter");
  });

  // add active to clicked
  if (type === "all") {
    document.querySelector(".all-btn").classList.add("active-filter");
  } else if (type === "pending") {
    document.querySelector(".pending-btn").classList.add("active-filter");
  } else {
    document.querySelector(".completed-btn").classList.add("active-filter");
  }

  renderTasks();
}

function clearAll() {
  tasks = [];
  saveTasks();
  renderTasks();
}

if (task.completed) {
  li.classList.add("completed");
}

const today = new Date().toISOString().split("T")[0];

if (task.date && task.date <= today && !task.completed) {
  li.classList.add("urgent");
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  const newSubject = prompt("Edit subject:", tasks[index].subject);
  const newDate = prompt("Edit date (YYYY-MM-DD):", tasks[index].date);

  if (newText !== null && newText !== "") {
    tasks[index].text = newText;
    tasks[index].subject = newSubject;
    tasks[index].date = newDate;
    saveTasks();
    renderTasks();
  }
}
setFilter("all");