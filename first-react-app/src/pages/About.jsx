import { useTheme } from "../context/ThemeContext";

function About() {
  const { theme } = useTheme();

  return (
    <div className={`page about ${theme}`}>
      <div className="header">
        <h1>About This Project</h1>
      </div>
      <p>
        This is a User Directory app built with React. It fetches live data
        from the JSONPlaceholder API, supports search filtering, controlled
        form input with validation, multi-page routing with React Router,
        and global theme state using the Context API.
      </p>
      <p>Tech stack: React, Vite, React Router, Context API</p>
      <p>Developer: Abdalqader Ahmed</p>
    </div>
  );
}

export default About;
