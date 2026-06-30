import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Card({ user, index }) {
  const { theme } = useTheme();
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
  const avatarColor = colors[index % colors.length];

  return (
    <Link to={`/users/${user.id}`} className="card-link">
      <div className={`user-card ${theme}`}>
        <div className="avatar" style={{ backgroundColor: avatarColor }}>
          {user.name.charAt(0)}
        </div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.company?.name}</p>
      </div>
    </Link>
  );
}

export default Card;
