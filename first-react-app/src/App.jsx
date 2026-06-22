import { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="status-message">Loading...</p>;
  if (error) return <p className="status-message">Something went wrong: {error}</p>;

  return (
    <div className="page">
      <header className="header">
        <h1>User Directory</h1>
        <p className="subtitle">Search the team by name</p>
      </header>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <p className="result-count">
        Showing {filteredUsers.length} of {users.length} users
      </p>

      {filteredUsers.length > 0 ? (
        <div className="grid">
          {filteredUsers.map((user, index) => (
            <Card key={user.id} user={user} index={index} />
          ))}
        </div>
      ) : (
        <p className="empty-state">No users match "{searchTerm}"</p>
      )}
    </div>
  );
}

export default App;
