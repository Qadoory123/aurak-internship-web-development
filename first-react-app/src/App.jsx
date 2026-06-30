import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import About from "./pages/About";
import "./App.css";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${theme}`}>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </nav>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
