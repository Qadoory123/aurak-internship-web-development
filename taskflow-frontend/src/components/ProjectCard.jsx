import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Button from "./Button";
import ConfirmDialog from "./ConfirmDialog";

export default function ProjectCard({ project }) {
  const { tasks, deleteProject } = useApp();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const doneCount = projectTasks.filter((t) => t.status === "done").length;

  function handleDelete() {
    deleteProject(project.id);
    setConfirmOpen(false);
  }

  return (
    <div className="card">
      <Link
        to={`/projects/${project.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="card-title">{project.name}</div>
        <p className="card-meta">{project.description}</p>
        <span className="card-meta">
          {doneCount}/{projectTasks.length} tasks done
        </span>
      </Link>
      <div className="card-actions">
        <Button variant="danger" onClick={() => setConfirmOpen(true)}>
          Delete
        </Button>
      </div>

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Project"
        message={`Delete "${project.name}" and all its tasks? This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
