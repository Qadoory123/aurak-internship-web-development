import { createContext, useContext, useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "https://gdtq5t-5000.csb.app";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("light");

  async function loadAll() {
    setLoading(true);
    setError(null);
    try {
      const [projectsRes, tasksRes] = await Promise.all([
        fetch(`${API_URL}/api/projects`),
        fetch(`${API_URL}/api/tasks`),
      ]);
      if (!projectsRes.ok || !tasksRes.ok) {
        throw new Error("Failed to load data from server");
      }
      const projectsData = await projectsRes.json();
      const tasksData = await tasksRes.json();
      setProjects(projectsData);
      setTasks(tasksData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function addProject(project) {
    const res = await fetch(`${API_URL}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create project");
    }
    const newProject = await res.json();
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  }

  async function deleteProject(id) {
    const res = await fetch(`${API_URL}/api/projects/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete project");
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setTasks((prev) => prev.filter((t) => t.projectId !== id));
  }

  async function addTask(task) {
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create task");
    }
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }

  async function updateTask(id, updates) {
    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update task");
    const updated = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }

  async function deleteTask(id) {
    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  const value = {
    projects,
    tasks,
    loading,
    error,
    theme,
    toggleTheme,
    addProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    reload: loadAll,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
