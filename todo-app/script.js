function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = taskText;

    // STATUS BUTTON (Done / Not Done)
    let statusBtn = document.createElement("button");
    statusBtn.textContent = "Mark Done";

    statusBtn.onclick = function () {
        if (span.style.textDecoration === "line-through") {
            span.style.textDecoration = "none";
            statusBtn.textContent = "Mark Done";
        } else {
            span.style.textDecoration = "line-through";
            statusBtn.textContent = "Mark Undone";
        }
    };

    // DELETE BUTTON
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function () {
        li.remove();
    };

    // styling container inside each task
    span.style.marginRight = "10px";

    li.appendChild(span);
    li.appendChild(statusBtn);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}
