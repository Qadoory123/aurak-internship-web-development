import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Navbar() {
  const { theme, toggleTheme } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
        TaskFlow
      </Link>

      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>
          About
        </Link>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
