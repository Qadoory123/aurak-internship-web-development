import { useState } from "react";
import { useApp } from "../context/AppContext";
import ProjectCard from "../components/ProjectCard";
import EmptyState from "../components/EmptyState";

export default function ProjectList() {
  const { projects, loading, error, addProject } = useApp();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Project name is required");
      return;
    }
    setSubmitting(true);
    setFormError("");
    try {
      await addProject({ name, description });
      setName("");
      setDescription("");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="status-message">Loading projects...</p>;
  if (error) return <p className="status-message error">Error: {error}</p>;

  return (
    <div className="page">
      <h1>Projects</h1>

      <form onSubmit={handleSubmit} className="project-form">
        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (formError) setFormError("");
          }}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Project"}
        </button>
        {formError && <span className="form-error">{formError}</span>}
      </form>

      {projects.length === 0 ? (
        <EmptyState message="No projects yet. Add one above." />
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
