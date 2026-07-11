import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, deleteTask, theme } = useTasks();
  const [deleteError, setDeleteError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const task = tasks.find((t) => t.id === Number(id));

  async function handleDelete() {
    try {
      setDeleting(true);
      setDeleteError(null);
      await deleteTask(task.id);
      navigate("/");
    } catch (err) {
      setDeleteError("Failed to delete task. Please try again.");
      setDeleting(false);
    }
  }

  if (!task) {
    return (
      <div className={`task-detail ${theme}`}>
        <p>Task not found.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className={`task-detail ${theme}`}>
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
      <h1>{task.title}</h1>
      <span className="task-category">{task.category || "Uncategorized"}</span>
      {task.description && <p>{task.description}</p>}

      {deleteError && <p className="status-message error">{deleteError}</p>}

      <div className="task-detail-actions">
        <Link to={`/tasks/${task.id}/edit`} className="edit-btn">
          Edit Task
        </Link>
        <button
          onClick={handleDelete}
          className="delete-btn"
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete Task"}
        </button>
      </div>
    </div>
  );
}

export default TaskDetail;
