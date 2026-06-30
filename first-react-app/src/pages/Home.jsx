import { useState, useEffect } from "react";
import Card from "../components/Card";
import { useTheme } from "../context/ThemeContext";
import "../App.css";

function Home() {
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Request failed");
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

  function handleSubmit(e) {
    e.preventDefault();
    const errors = {};

    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format";
    if (!company.trim()) errors.company = "Company is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      company: { name: company },
    };

    setUsers((prev) => [...prev, newUser]);
    setName("");
    setEmail("");
    setCompany("");
    setFormErrors({});
  }

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="status-message">Loading users...</p>;
  if (error) return <p className="status-message">Error: {error}</p>;

  return (
    <div className={`page home ${theme}`}>
      <div className="header">
        <h1>User Directory</h1>
        <p className="subtitle">Browse, search, and add team members</p>
      </div>

      <form onSubmit={handleSubmit} className="add-form">
        <p className="form-title">Add New User</p>

        <div className="form-field">
          <input
            type="text"
            placeholder="Name"
            className={`form-input ${formErrors.name ? "input-error" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {formErrors.name && <p className="error-message">{formErrors.name}</p>}
        </div>

        <div className="form-field">
          <input
            type="text"
            placeholder="Email"
            className={`form-input ${formErrors.email ? "input-error" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {formErrors.email && <p className="error-message">{formErrors.email}</p>}
        </div>

        <div className="form-field">
          <input
            type="text"
            placeholder="Company"
            className={`form-input ${formErrors.company ? "input-error" : ""}`}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          {formErrors.company && <p className="error-message">{formErrors.company}</p>}
        </div>

        <button type="submit" className="submit-btn">Add User</button>
      </form>

      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <p className="result-count">{filteredUsers.length} result(s)</p>

      {filteredUsers.length === 0 ? (
        <p className="empty-state">No users match your search.</p>
      ) : (
        <div className="grid">
          {filteredUsers.map((user, index) => (
            <Card key={user.id} user={user} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
