const express = require("express");
const cors = require("cors");

const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Resource routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`TaskFlow backend running on port ${PORT}`);
});
