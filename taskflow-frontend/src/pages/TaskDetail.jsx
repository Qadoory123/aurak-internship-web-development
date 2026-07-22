import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import { useApp } from "../context/AppContext";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, projects, deleteTask, loading } = useApp();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  if (loading) {
    return (
      <div className="status-message">
        <div className="spinner" />
        Loading...
      </div>
    );
  }

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <div className="status-message">
        <p>Task not found.</p>
        <Link to="/">Back to Dashboard</Link>
      </div>
    );
  }

  const project = projects.find((p) => p.id === task.projectId);

  async function handleDelete() {
    setDeleteError("");
    try {
      await deleteTask(task.id);
      navigate("/");
    } catch (err) {
      setDeleteError("Failed to delete task. Please try again.");
      setConfirmOpen(false);
    }
  }

  return (
    <div className="page-container">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "8px",
          }}
        >
          <h2 className="card-title">{task.title}</h2>
          <StatusBadge status={task.status} />
        </div>

        <p className="card-meta">
          <strong>Project:</strong>{" "}
          {project ? (
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
          ) : (
            "Unknown"
          )}
        </p>

        <p className="card-meta" style={{ textTransform: "capitalize" }}>
          <strong>Priority:</strong> {task.priority}
        </p>

        {task.description && (
          <p className="card-meta">
            <strong>Description:</strong> {task.description}
          </p>
        )}

        {deleteError && <p className="form-error">{deleteError}</p>}

        <div className="card-actions">
          <Link to={`/tasks/${task.id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Task"
        message={`Delete "${task.title}"? This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
