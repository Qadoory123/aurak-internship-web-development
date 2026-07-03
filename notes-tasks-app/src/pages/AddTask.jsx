import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function AddTask() {
  const { addTask, theme } = useTasks();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    addTask({
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
    });
    setTitle("");
    setCategory("");
    setDescription("");
    setErrors({});
    navigate("/");
  }

  return (
    <div className={`add-task-page ${theme}`}>
      <h1>Add a New Task</h1>
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
        <button type="submit" className="submit-btn">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
