import Card from './components/Card';
import './App.css';

const users = [
  { id: 1, name: "Leanne Graham", email: "Sincere@april.biz", university: "AURAK" },
  { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv", university: "AUS" },
  { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net", university: "ADU" },
  { id: 4, name: "Patricia Lebsack", email: "Julianne.OConner@kory.org", university: "UOWD" },
];

function App() {
  return (
    <div className="grid">
      {users.map(user => (
        <Card key={user.id} user={user} />
      ))}
    </div>
  );
}

export default App;
