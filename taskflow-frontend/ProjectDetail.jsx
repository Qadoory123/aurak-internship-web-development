import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { useApp } from "../context/AppContext";

export default function TaskCard({ task }) {
  const { deleteTask } = useApp();

  function handleDelete() {
    if (window.confirm(`Delete task "${task.title}"?`)) {
      deleteTask(task.id);
    }
  }

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h4>
          <Link to={`/tasks/${task.id}`}>{task.title}</Link>
        </h4>
        <StatusBadge status={task.status} />
      </div>
      {task.description && <p>{task.description}</p>}
      <span className={`priority priority-${task.priority}`}>
        {task.priority} priority
      </span>
      <div className="task-card-actions">
        <Link to={`/tasks/${task.id}/edit`}>Edit</Link>
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}
