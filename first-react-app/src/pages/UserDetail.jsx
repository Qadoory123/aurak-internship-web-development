import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
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
    <div className="page">
      <Link to="/" className="back-link">
        ← Back to Directory
      </Link>
      <div className="detail-card">
        <h2>{user.name}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Company:</strong> {user.company.name}
        </p>
        <p>
          <strong>City:</strong> {user.address.city}
        </p>
        <p>
          <strong>Website:</strong> {user.website}
        </p>
      </div>
    </div>
  );
}

export default UserDetail;
