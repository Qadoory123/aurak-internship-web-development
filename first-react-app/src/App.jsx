import { useState } from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    // keep your existing users array exactly as it is
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>User Directory</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="card-grid">
        {filteredUsers.map((user) => (
          <Card key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
