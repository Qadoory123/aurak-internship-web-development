const express = require("express");
const app = express();
const PORT = 5000;

// GET / - welcome message
app.get("/", (req, res) => {
  res.send("Welcome to my backend server!");
});

// GET /api/health - server health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// GET /api/tasks - hardcoded list of tasks
app.get("/api/tasks", (req, res) => {
  const tasks = [
    { id: 1, title: "Learn Express basics", category: "Backend" },
    { id: 2, title: "Build first server", category: "Backend" },
    { id: 3, title: "Test API endpoints", category: "Testing" },
  ];
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});
