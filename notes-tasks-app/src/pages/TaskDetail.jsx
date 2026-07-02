import { useParams, useNavigate, Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, deleteTask, theme } = useTasks();

  const task = tasks.find((t) => t.id === Number(id));

  function handleDelete() {
    deleteTask(task.id);
    navigate("/");
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
      <button onClick={handleDelete} className="delete-btn">
        Delete Task
      </button>
    </div>
  );
}

export default TaskDetail;
