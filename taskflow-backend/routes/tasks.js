const express = require("express");
const router = express.Router();

let tasks = [
  { id: 1, projectId: 1, title: "Design homepage mockup", status: "in-progress" },
  { id: 2, projectId: 1, title: "Write new copy for About page", status: "todo" },
  { id: 3, projectId: 2, title: "Set up push notifications", status: "todo" },
  { id: 4, projectId: 2, title: "Fix login crash on Android", status: "in-progress" },
  { id: 5, projectId: 3, title: "Build ops dashboard skeleton", status: "done" },
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
  const { title, projectId, status } = req.body;

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
    status: status || "todo",
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, projectId, status } = req.body;
  if (title !== undefined) task.title = title;
  if (projectId !== undefined) task.projectId = Number(projectId);
  if (status !== undefined) task.status = status;

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
