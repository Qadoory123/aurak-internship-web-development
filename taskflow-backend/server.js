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

// 404 handler — catches any request to a route that doesn't exist
app.use((req, res) => {
  res
    .status(404)
    .json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global error handler — catches anything thrown or passed to next(err)
// in any route above. Must be defined last, with 4 arguments, for Express
// to recognize it as an error handler.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`TaskFlow backend running on port ${PORT}`);
});
