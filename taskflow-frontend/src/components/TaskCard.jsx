import { useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import Button from "./Button";
import ConfirmDialog from "./ConfirmDialog";
import { useApp } from "../context/AppContext";

export default function TaskCard({ task }) {
  const { deleteTask } = useApp();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function handleDelete() {
    setDeleteError("");
    try {
      await deleteTask(task.id);
      setConfirmOpen(false);
    } catch (err) {
      setDeleteError("Failed to delete task. Please try again.");
      setConfirmOpen(false);
    }
  }

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "8px",
        }}
      >
        <div className="card-title">
          <Link
            to={`/tasks/${task.id}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {task.title}
          </Link>
        </div>
        <StatusBadge status={task.status} />
      </div>
      {task.description && <p className="card-meta">{task.description}</p>}
      <p className="card-meta" style={{ textTransform: "capitalize" }}>
        {task.priority} priority
      </p>

      {deleteError && <p className="form-error">{deleteError}</p>}

      <div className="card-actions">
        <Link to={`/tasks/${task.id}/edit`} className="btn btn-secondary">
          Edit
        </Link>
        <Button variant="danger" onClick={() => setConfirmOpen(true)}>
          Delete
        </Button>
      </div>

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Task"
        message={`Delete task "${task.title}"? This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
