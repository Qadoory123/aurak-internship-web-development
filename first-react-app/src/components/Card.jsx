function Card({ user }) {
    return (
      <div className="user-card">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.university}</p>
      </div>
    );
  }
  
  export default Card;
