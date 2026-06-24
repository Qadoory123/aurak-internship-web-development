import "../App.css";

function About() {
  return (
    <div className="page">
      <div className="detail-card">
        <h2>About This App</h2>
        <p>
          This is a User Directory app built as part of a web development
          internship at Sohail Smart Solutions.
        </p>
        <p>
          It fetches live user data from the JSONPlaceholder API and displays
          each user as a card. You can search by name, add new users, and view a
          full detail page for each user.
        </p>
        <p>
          <strong>Built with:</strong> React, Vite, React Router
        </p>
        <p>
          <strong>Developer:</strong> Abdalqader Ahmed
        </p>
        <p>
          <strong>University:</strong> AURAK
        </p>
      </div>
    </div>
  );
}

export default About;
