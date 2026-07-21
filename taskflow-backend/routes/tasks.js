const express = require("express");
const router = express.Router();

// Seeded in-memory data. Each task links to a project via projectId,
// mirroring the relationship defined in PROJECT.md.
let tasks = [
  {
    id: 1,
    projectId: 1,
    title: "Design homepage mockup",
    status: "in-progress",
  },
  {
    id: 2,
    projectId: 1,
    title: "Write new copy for About page",
    status: "todo",
  },
  { id: 3, projectId: 2, title: "Set up push notifications", status: "todo" },
  {
    id: 4,
    projectId: 2,
    title: "Fix login crash on Android",
    status: "in-progress",
  },
  {
    id: 5,
    projectId: 3,
    title: "Build ops dashboard skeleton",
    status: "done",
  },
];

// GET /api/tasks -> all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET /api/tasks/:id -> single task, 404 if not found
router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

module.exports = router;
module.exports.tasks = tasks;
