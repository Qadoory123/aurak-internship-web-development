const express = require("express");
const router = express.Router();

// Seeded in-memory data. This will be replaced by a real database
// after the internship - for now it just needs to behave like one.
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

// GET /api/projects -> all projects
router.get("/", (req, res) => {
  res.json(projects);
});

// GET /api/projects/:id -> single project, 404 if not found
router.get("/:id", (req, res) => {
  const project = projects.find((p) => p.id === Number(req.params.id));

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.json(project);
});

module.exports = router;
module.exports.projects = projects; // exported so tasks.js can validate against real project ids
