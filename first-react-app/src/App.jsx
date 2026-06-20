import { useState } from "react";
import Card from "./components/Card";
import "./App.css";

const users = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    university: "AURAK",
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    university: "AUS",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    email: "Nathan@yesenia.net",
    university: "ADU",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    email: "Julianne.OConner@kory.org",
    university: "UOWD",
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
