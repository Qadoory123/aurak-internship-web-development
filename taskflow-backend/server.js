const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ---------- In-memory data ----------
let projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Rebuild the marketing site",
    createdAt: new Date().toISOString(),
  },
];

let tasks = [
  {
    id: 1,
    projectId: 1,
    title: "Set up repo",
    description: "",
    status: "done",
    priority: "medium",
    createdAt: new Date().toISOString(),
  },
];

let nextProjectId = 2;
let nextTaskId = 2;

// ---------- Root & health ----------
app.get("/", (req, res) => {
  res.json({ message: "TaskFlow API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ---------- PROJECTS ----------
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.get("/api/projects/:id", (req, res) => {
  const project = projects.find((p) => p.id === Number(req.params.id));
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

app.post("/api/projects", (req, res) => {
  const { name, description } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Project name is required" });
  }
  const newProject = {
    id: nextProjectId++,
    name: name.trim(),
    description: description || "",
    createdAt: new Date().toISOString(),
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.delete("/api/projects/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Project not found" });

  const [deleted] = projects.splice(index, 1);
  // Also remove tasks that belonged to this project
  tasks = tasks.filter((t) => t.projectId !== id);

  res.json(deleted);
});

// ---------- TASKS ----------
app.get("/api/tasks", (req, res) => {
  const { projectId } = req.query;
  if (projectId) {
    return res.json(tasks.filter((t) => t.projectId === Number(projectId)));
  }
  res.json(tasks);
});

app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

app.post("/api/tasks", (req, res) => {
  const { projectId, title, description, status, priority } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Task title is required" });
  }
  if (!projectId) {
    return res.status(400).json({ error: "projectId is required" });
  }
  const newTask = {
    id: nextTaskId++,
    projectId: Number(projectId),
    title: title.trim(),
    description: description || "",
    status: status || "todo",
    priority: priority || "medium",
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, description, status, priority } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;

  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  const [deleted] = tasks.splice(index, 1);
  res.json(deleted);
});

// ---------- Start server ----------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`TaskFlow API listening on port ${PORT}`);
});
