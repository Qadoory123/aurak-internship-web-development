import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function UserDetail() {
  const { id } = useParams();
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  if (loading) return <p className="status-message">Loading...</p>;
  if (error) return <p className="status-message">Error: {error}</p>;

  return (
    <div className={`page user-detail ${theme}`}>
      <Link to="/" className="back-link">← Back to Home</Link>
      <div className="detail-card">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>City: {user.address?.city}</p>
        <p>Company: {user.company?.name}</p>
      </div>
    </div>
  );
}

export default UserDetail;
