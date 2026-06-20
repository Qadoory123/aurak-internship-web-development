const colors = ["#4F46E5", "#0F766E", "#B45309", "#BE185D"];

function Card({ user, index }) {
  const initial = user.name.charAt(0);
  const color = colors[index % colors.length];

  return (
    <div className="user-card">
      <div className="avatar" style={{ backgroundColor: color }}>
        {initial}
      </div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p className="university">{user.university}</p>
    </div>
  );
}

export default Card;
