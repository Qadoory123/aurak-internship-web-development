import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, theme } = useTasks();

  const task = tasks.find((t) => t.id === Number(id));

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setCategory(task.category || "");
      setDescription(task.description || "");
    }
  }, [task]);

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    try {
      await updateTask(task.id, {
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
      });

      setErrors({});
      navigate(`/tasks/${task.id}`);
    } catch (err) {
      setErrors({ submit: "Could not update task. Is the server running?" });
    } finally {
      setSubmitting(false);
    }
  }

  if (!task) {
    return (
      <div className={`add-task-page ${theme}`}>
        <p>Task not found.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className={`add-task-page ${theme}`}>
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: null });
            }}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label>Category (optional)</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Study, Personal, Work"
          />
          <div className="quick-picks">
            {["Study", "Personal", "Work"].map((c) => (
              <button type="button" key={c} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {errors.submit && <span className="error">{errors.submit}</span>}
        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditTask;
