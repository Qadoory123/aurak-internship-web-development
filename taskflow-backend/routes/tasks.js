const express = require("express");
const router = express.Router();

let tasks = [
  {
    id: 1,
    projectId: 1,
    title: "Design homepage mockup",
    description: "",
    status: "in-progress",
    priority: "high",
  },
  {
    id: 2,
    projectId: 1,
    title: "Write new copy for About page",
    description: "",
    status: "todo",
    priority: "medium",
  },
  {
    id: 3,
    projectId: 2,
    title: "Set up push notifications",
    description: "",
    status: "todo",
    priority: "medium",
  },
  {
    id: 4,
    projectId: 2,
    title: "Fix login crash on Android",
    description: "",
    status: "in-progress",
    priority: "high",
  },
  {
    id: 5,
    projectId: 3,
    title: "Build ops dashboard skeleton",
    description: "",
    status: "done",
    priority: "low",
  },
];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

router.post("/", (req, res) => {
  const { title, projectId, description, status, priority } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }
  if (!projectId) {
    return res.status(400).json({ error: "projectId is required" });
  }

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    projectId: Number(projectId),
    title: title.trim(),
    description: description || "",
    status: status || "todo",
    priority: priority || "medium",
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, projectId, description, status, priority } = req.body;
  if (title !== undefined) task.title = title;
  if (projectId !== undefined) task.projectId = Number(projectId);
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;

  res.json(task);
});

router.delete("/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  const [deletedTask] = tasks.splice(index, 1);
  res.json(deletedTask);
});

module.exports = router;
module.exports.tasks = tasks;
