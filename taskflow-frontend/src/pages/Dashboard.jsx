import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import DashboardStats from "../components/DashboardStats";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";
import StatusFilter from "../components/StatusFilter";
import EmptyState from "../components/EmptyState";

export default function Dashboard() {
  const { projects, tasks, loading, error } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  if (loading) return <p className="status-message">Loading dashboard...</p>;
  if (error) return <p className="status-message error">Error: {error}</p>;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-container">
      <div className="dashboard-controls">
        <h1>Dashboard</h1>
        <Link to="/tasks/new" className="btn btn-primary">
          + Add Task
        </Link>
      </div>

      <DashboardStats tasks={tasks} />

      <h2>Your Projects</h2>
      {projects.length === 0 ? (
        <EmptyState message="No projects yet. Create one to get started." />
      ) : (
        <div className="card-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <h2>All Tasks</h2>
      <div className="dashboard-controls">
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <StatusFilter current={statusFilter} onChange={setStatusFilter} />
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState message="No tasks match your search or filter." />
      ) : (
        <div className="card-grid">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
