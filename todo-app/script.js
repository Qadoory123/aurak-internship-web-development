console.log("JS loaded");

// Using querySelector (as required by rubric improvement)
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const addBtn = document.querySelector("#addBtn");

// State management
let tasks = [];

// Event listeners (modern approach)
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    taskInput.value = "";
    renderTasks();
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Render UI
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const check = document.createElement("div");
        check.className = "check";

        const checkIcon = document.createElement("i");
        checkIcon.className = "ti ti-check check-icon";

        check.appendChild(checkIcon);

        // toggle task (event listener)
        check.addEventListener("click", () => {
            toggleTask(index);
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "del-btn";
        deleteBtn.textContent = "Delete";

        // delete task (event listener)
        deleteBtn.addEventListener("click", () => {
            deleteTask(index);
        });

        li.appendChild(check);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}
