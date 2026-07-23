const express = require("express");
const router = express.Router();

let projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Revamp the company marketing site",
  },
  {
    id: 2,
    name: "Mobile App Launch",
    description: "Ship v1 of the iOS/Android app",
  },
  {
    id: 3,
    name: "Internal Tools",
    description: "Build internal dashboards for the ops team",
  },
];

router.get("/", (req, res) => {
  res.json(projects);
});

router.get("/:id", (req, res) => {
  const project = projects.find((p) => p.id === Number(req.params.id));
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

router.post("/", (req, res) => {
  const { name, description } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  const newProject = {
    id: projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1,
    name: name.trim(),
    description: description || "",
  };

  projects.push(newProject);
  res.status(201).json(newProject);
});

router.put("/:id", (req, res) => {
  const project = projects.find((p) => p.id === Number(req.params.id));
  if (!project) return res.status(404).json({ error: "Project not found" });

  const { name, description } = req.body;

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Name cannot be empty" });
    }
    project.name = name.trim();
  }
  if (description !== undefined) project.description = description;

  res.json(project);
});

router.delete("/:id", (req, res) => {
  const index = projects.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Project not found" });

  const [deletedProject] = projects.splice(index, 1);

  const { tasks } = require("./tasks");
  for (let i = tasks.length - 1; i >= 0; i--) {
    if (tasks[i].projectId === deletedProject.id) {
      tasks.splice(i, 1);
    }
  }

  res.json(deletedProject);
});

module.exports = router;
module.exports.projects = projects;
