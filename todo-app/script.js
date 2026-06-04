console.log("JS loaded");

document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  let li = document.createElement("li");

  let check = document.createElement("div");
  check.className = "check";

  let checkIcon = document.createElement("i");
  checkIcon.className = "ti ti-check check-icon";
  check.appendChild(checkIcon);

  check.onclick = function() {
    li.classList.toggle("completed");
  };

  let span = document.createElement("span");
  span.textContent = taskText;

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "del-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = function() {
    li.remove();
  };

  li.appendChild(check);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);

  input.value = "";
  input.focus();
}
