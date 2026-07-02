import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function Navbar() {
  const { theme, toggleTheme } = useTasks();

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-brand">Notes & Tasks</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/add">Add Task</Link>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
