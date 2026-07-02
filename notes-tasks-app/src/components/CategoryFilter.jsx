import { useTasks } from "../context/TaskContext";

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const { tasks } = useTasks();

  const categories = [
    ...new Set(tasks.map((task) => task.category || "Uncategorized")),
  ];

  return (
    <div className="category-filter">
      <button
        className={selectedCategory === "All" ? "active" : ""}
        onClick={() => setSelectedCategory("All")}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? "active" : ""}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
