const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

// Shared in-memory "database"
let tasks = [
  { id: 1, title: "Learn Express basics", category: "Backend" },
  { id: 2, title: "Build first server", category: "Backend" },
  { id: 3, title: "Test API endpoints", category: "Testing" },
];

// GET / - welcome message
app.get("/", (req, res) => {
  res.send("Welcome to my backend server!");
});

// GET /api/health - server health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// GET /api/tasks - all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// GET /api/tasks/:id - single task by id
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// POST /api/tasks - create a new task
app.post("/api/tasks", (req, res) => {
  const { title, category } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

  const newTask = {
    id: newId,
    title: title.trim(),
    category: category || "Uncategorized",
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - update an existing task
app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, category } = req.body;

  if (title !== undefined) {
    if (title.trim() === "") {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    task.title = title.trim();
  }

  if (category !== undefined) {
    task.category = category;
  }

  res.json(task);
});

// DELETE /api/tasks/:id - remove a task
app.delete("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks = tasks.filter((t) => t.id !== Number(req.params.id));

  res.json({ message: "Task deleted", task });
});

app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});
