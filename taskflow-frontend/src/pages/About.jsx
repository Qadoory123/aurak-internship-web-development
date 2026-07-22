export default function About() {
  return (
    <div className="page-container">
      <h1>About TaskFlow</h1>
      <p>
        TaskFlow is a full-stack project and task manager built with React on
        the frontend and a custom Node.js / Express REST API on the backend.
        Data is fetched live from the API rather than stored in localStorage, so
        projects and tasks persist on the server.
      </p>
      <h3>Tech Stack</h3>
      <ul>
        <li>React (Vite)</li>
        <li>React Router</li>
        <li>Context API for global state</li>
        <li>Node.js + Express REST API</li>
        <li>Fetch API for client-server communication</li>
      </ul>
    </div>
  );
}
