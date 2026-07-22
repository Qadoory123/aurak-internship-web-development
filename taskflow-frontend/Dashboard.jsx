import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { theme, toggleTheme } = useApp();

  return (
    <nav className="navbar">
      <div className="navbar-brand">TaskFlow</div>
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/about">About</Link>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </nav>
  );
}
