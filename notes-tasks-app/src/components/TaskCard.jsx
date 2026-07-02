import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function TaskCard({ task }) {
  const { theme } = useTasks();

  return (
    <Link to={`/tasks/${task.id}`} className="task-link">
      <div className={`task-card ${theme}`}>
        <h3>{task.title}</h3>
        <span className="task-category">
          {task.category || "Uncategorized"}
        </span>
        {task.description && (
          <p className="task-preview">
            {task.description.slice(0, 60)}
            {task.description.length > 60 ? "..." : ""}
          </p>
        )}
      </div>
    </Link>
  );
}

export default TaskCard;
