import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import "../App.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formErrors, setFormErrors] = useState({});

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

  function handleSubmit(e) {
    e.preventDefault();

    const errors = {};
    if (!formName.trim()) errors.name = "Name is required.";
    if (!formEmail.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) {
      errors.email = "Please enter a valid email.";
    }
    if (!formCompany.trim()) errors.company = "Company is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formName.trim(),
      email: formEmail.trim(),
      company: { name: formCompany.trim() },
    };

    setUsers([...users, newUser]);
    setFormName("");
    setFormEmail("");
    setFormCompany("");
    setFormErrors({});
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="status-message">Loading...</p>;
  if (error)
    return <p className="status-message">Something went wrong: {error}</p>;

  return (
    <div className="page">
      <form className="add-form" onSubmit={handleSubmit} noValidate>
        <h2 className="form-title">Add a New User</h2>
        <div className="form-field">
          <input
            type="text"
            placeholder="Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className={`form-input ${formErrors.name ? "input-error" : ""}`}
          />
          {formErrors.name && (
            <p className="error-message">{formErrors.name}</p>
          )}
        </div>
        <div className="form-field">
          <input
            type="email"
            placeholder="Email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            className={`form-input ${formErrors.email ? "input-error" : ""}`}
          />
          {formErrors.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </div>
        <div className="form-field">
          <input
            type="text"
            placeholder="Company"
            value={formCompany}
            onChange={(e) => setFormCompany(e.target.value)}
            className={`form-input ${formErrors.company ? "input-error" : ""}`}
          />
          {formErrors.company && (
            <p className="error-message">{formErrors.company}</p>
          )}
        </div>
        <button type="submit" className="submit-btn">
          Add User
        </button>
      </form>

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
            <Link key={user.id} to={`/users/${user.id}`} className="card-link">
              <Card user={user} index={index} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="empty-state">No users match "{searchTerm}"</p>
      )}
    </div>
  );
}

export default Home;
