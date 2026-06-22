function Card({ user, index }) {
  const colors = ["#4f46e5", "#0891b2", "#059669", "#d97706", "#dc2626"];
  const color = colors[index % colors.length];
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="user-card">
      <div className="avatar" style={{ backgroundColor: color }}>
        {initial}
      </div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.company.name}</p>
    </div>
  );
}

export default Card;
