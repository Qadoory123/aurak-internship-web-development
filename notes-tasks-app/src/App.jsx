import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider, useTasks } from "./context/TaskContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TaskDetail from "./pages/TaskDetail";
import AddTask from "./pages/AddTask";
import "./App.css";

function AppShell() {
  const { theme } = useTasks();
  return (
    <div className={`app-shell ${theme}`}>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/add" element={<AddTask />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
