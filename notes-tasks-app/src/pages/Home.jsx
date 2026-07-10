import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import CategoryFilter from "../components/CategoryFilter";

function Home() {
  const { tasks, loading, error, theme } = useTasks();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter(
          (task) => (task.category || "Uncategorized") === selectedCategory
        );

  return (
    <div className={`home-page ${theme}`}>
      <h1>My Tasks</h1>
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading ? (
        <p className="status-message">Loading tasks...</p>
      ) : error ? (
        <p className="status-message error">
          Could not load tasks: {error}. Is the backend server running?
        </p>
      ) : filteredTasks.length === 0 ? (
        <p className="empty-state">
          {tasks.length === 0
            ? "No tasks yet. Add your first one!"
            : "No tasks match this category."}
        </p>
      ) : (
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
