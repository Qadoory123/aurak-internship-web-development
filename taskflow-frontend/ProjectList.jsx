import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ProjectCard({ project }) {
  const { tasks, deleteProject } = useApp();
  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const doneCount = projectTasks.filter((t) => t.status === "done").length;

  function handleDelete(e) {
    e.preventDefault();
    if (window.confirm(`Delete "${project.name}" and all its tasks?`)) {
      deleteProject(project.id);
    }
  }

  return (
    <div className="project-card">
      <Link to={`/projects/${project.id}`}>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <span className="task-count">
          {doneCount}/{projectTasks.length} tasks done
        </span>
      </Link>
      <button onClick={handleDelete} className="delete-btn">
        Delete
      </button>
    </div>
  );
}
