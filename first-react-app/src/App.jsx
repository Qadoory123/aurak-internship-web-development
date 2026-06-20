import { useState } from 'react';
import Card from './components/Card';
import './App.css';

const users = [
  { id: 1, name: "Leanne Graham", email: "Sincere@april.biz", university: "AURAK" },
  { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv", university: "AUS" },
  { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net", university: "ADU" },
  { id: 4, name: "Patricia Lebsack", email: "Julianne.OConner@kory.org", university: "UOWD" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="grid">
        {filteredUsers.map(user => (
          <Card key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
