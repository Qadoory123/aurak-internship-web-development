import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import StatusFilter from "../components/StatusFilter";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, tasks, loading, error, deleteProject } = useApp();
  const [filter, setFilter] = useState("all");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  if (loading) return <p className="status-message">Loading...</p>;
  if (error) return <p className="status-message error">Error: {error}</p>;

  const project = projects.find((p) => p.id === Number(id));
  if (!project) return <p className="status-message">Project not found.</p>;

  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const filteredTasks =
    filter === "all"
      ? projectTasks
      : projectTasks.filter((t) => t.status === filter);

  async function handleDeleteProject() {
    setDeleteError("");
    try {
      await deleteProject(project.id);
      navigate("/projects");
    } catch (err) {
      setDeleteError("Failed to delete project. Please try again.");
      setConfirmOpen(false);
    }
  }

  return (
    <div className="page-container">
      <div className="dashboard-controls">
        <div>
          <h1>{project.name}</h1>
          <p className="card-meta">{project.description}</p>
        </div>
        <Button variant="danger" onClick={() => setConfirmOpen(true)}>
          Delete Project
        </Button>
      </div>

      {deleteError && <p className="form-error">{deleteError}</p>}

      <div className="dashboard-controls">
        <Link
          to={`/tasks/new?projectId=${project.id}`}
          className="btn btn-primary"
        >
          + Add Task
        </Link>
        <StatusFilter current={filter} onChange={setFilter} />
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState message="No tasks match this filter." />
      ) : (
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Project"
        message={`Delete "${project.name}" and all its tasks? This can't be undone.`}
        onConfirm={handleDeleteProject}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
