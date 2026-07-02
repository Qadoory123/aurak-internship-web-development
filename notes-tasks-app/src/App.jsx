import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TaskDetail from "./pages/TaskDetail";
import AddTask from "./pages/AddTask";
import "./App.css";

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/add" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
