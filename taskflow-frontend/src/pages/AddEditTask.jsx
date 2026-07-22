import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import FormField from "../components/FormField";
import Button from "../components/Button";
import Toast from "../components/Toast";

function AddEditTask() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const projectIdFromQuery = searchParams.get("projectId");
  const isEditMode = Boolean(id);

  const { projects, tasks, addTask, updateTask } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    projectId: projectIdFromQuery || "",
    status: "todo",
    priority: "medium",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isEditMode) return;

    const existingTask = tasks.find((t) => t.id === Number(id));

    if (!existingTask) {
      setNotFound(true);
      return;
    }

    setFormData({
      title: existingTask.title || "",
      projectId:
        existingTask.projectId != null ? String(existingTask.projectId) : "",
      status: existingTask.status || "todo",
      priority: existingTask.priority || "medium",
      description: existingTask.description || "",
    });
  }, [isEditMode, id, tasks]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.projectId) {
      newErrors.projectId = "Please select a project";
    }

    if (!["todo", "in-progress", "done"].includes(formData.status)) {
      newErrors.status = "Please select a valid status";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        projectId: Number(formData.projectId),
        status: formData.status,
        priority: formData.priority,
        description: formData.description.trim(),
      };

      if (isEditMode) {
        await updateTask(Number(id), payload);
      } else {
        await addTask(payload);
      }

      setSuccessMessage(isEditMode ? "Task updated!" : "Task added!");
      setTimeout(() => navigate(-1), 700);
    } catch (err) {
      setSubmitError(
        err.message ||
          "Something went wrong saving this task. Please try again."
      );
      setSubmitting(false);
    }
  }

  if (isEditMode && notFound) {
    return <p className="status-message">Task not found.</p>;
  }

  return (
    <div className="page-container">
      <h1>{isEditMode ? "Edit Task" : "Add Task"}</h1>

      <form onSubmit={handleSubmit} className="form-container" noValidate>
        <FormField label="Title" htmlFor="title" error={errors.title}>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Project" htmlFor="projectId" error={errors.projectId}>
          <select
            id="projectId"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Status" htmlFor="status">
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </FormField>

        <FormField label="Priority" htmlFor="priority">
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </FormField>

        <FormField label="Description" htmlFor="description">
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
        </FormField>

        {submitError && <p className="form-error">{submitError}</p>}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : isEditMode ? "Save Changes" : "Add Task"}
        </Button>
      </form>

      <Toast
        message={successMessage}
        type="success"
        onClose={() => setSuccessMessage("")}
      />
    </div>
  );
}

export default AddEditTask;
