# JavaScript Learning Notes

## let / const vs var
`let` and `const` provide block scope, making code safer and easier to manage than `var`, which has function scope. `const` is used for values that do not change, while `let` is used for variables that may be reassigned.

Example:
```javascript
const name = "Abdalqader";
let age = 21;
```

## Arrow Functions
Arrow functions provide a shorter syntax for writing functions.

Example:
```javascript
const greet = () => {
    console.log("Hello");
};
```

## Array Methods

### map()
Creates a new array by transforming each element.

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
```

### filter()
Creates a new array containing elements that meet a condition.

```javascript
const numbers = [1, 2, 3, 4];
const even = numbers.filter(num => num % 2 === 0);
```

### reduce()
Reduces an array to a single value.

```javascript
const numbers = [1, 2, 3];
const sum = numbers.reduce((total, num) => total + num, 0);
```

### forEach()
Executes a function once for each array element.

```javascript
const fruits = ["Apple", "Banana"];
fruits.forEach(fruit => console.log(fruit));
```

## Template Literals
Template literals allow variables to be embedded within strings using backticks.

Example:
```javascript
const name = "Ali";
console.log(`Hello, ${name}!`);
```

## Destructuring
Destructuring extracts values from arrays or objects into variables.

Example:
```javascript
const person = { name: "Sara", age: 20 };
const { name, age } = person;
```

## DOM Manipulation

### querySelector()
Selects the first element that matches a CSS selector.

```javascript
const button = document.querySelector("button");
```

### addEventListener()
Attaches an event handler to an element.

```javascript
button.addEventListener("click", () => {
    console.log("Clicked");
});
```

### Dynamic UI Updates
JavaScript can modify webpage content without refreshing the page.

Example:
```javascript
document.querySelector("h1").textContent = "Updated Title";
```

## Working With APIs

### What is an API?

An API (Application Programming Interface) is a way for two systems to communicate. In web development, it usually means a server that provides data which your browser or application can request. Instead of building everything yourself, you can use an API to get real information like weather, users, or news.

### Request and Response

When a browser wants data, it sends a **request** to a server. The request includes the URL of the API and the type of action (usually GET to retrieve data). The server receives the request, processes it, and sends back a **response**. The response contains a status code (like 200 for success or 404 for not found) and the actual data.

### JSON Format

APIs send data in **JSON** (JavaScript Object Notation) format. JSON is a structured text format that looks like a JavaScript object. It is easy to read and easy for JavaScript to work with.

Example:
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "email": "Sincere@april.biz"
}
```

### fetch(), Promises, and async/await

`fetch()` is the built-in browser function used to send requests to an API. It returns a **Promise**, which represents a value that will be available in the future — either successfully (resolved) or with an error (rejected).

`async/await` is a cleaner way to work with Promises. Marking a function as `async` allows you to use `await` inside it, which pauses execution until the Promise resolves.

### Converting Responses with .json()

The response returned by `fetch()` is a raw HTTP response, not usable data yet. Calling `.json()` on it reads the response body and converts the JSON text into a real JavaScript object that can be accessed and rendered.

### Error Handling with try/catch

Network requests can fail. Wrapping the fetch logic inside a `try/catch` block ensures that if anything goes wrong, a bad URL, no internet connection, or a server error, the error is caught and handled gracefully instead of breaking the application.

Example:
```javascript
async function loadUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Request failed:', error);
  }
}
```

### How It All Connects

When `fetch()` is called, the browser sends a request to the API URL. The server responds with JSON data. `.json()` converts that into a JavaScript object. The data is then available inside the function and can be used to create elements and update the page dynamically without any page refresh.

## Component-Based Thinking

A component is a self-contained, reusable piece of UI that combines three things:
- **UI** — the HTML structure it produces
- **Data** — the information passed into it
- **Behavior** — any events or interactions it handles

Modern applications are built from components because it avoids repeating the same code. Instead of writing the same card layout ten times, you write it once as a function and call it with different data each time. This makes the codebase easier to read, update, and scale.

Example:
```javascript
function createUserCard(user) {
  const card = document.createElement("div");
  card.textContent = user.name;
  return card;
}
```

## Separation of Concerns

Separation of concerns means each file has one clear responsibility:
- **HTML** → defines the structure of the page
- **CSS** → controls how the page looks
- **JavaScript** → handles behavior and logic

Keeping these separate means a change in styling does not risk breaking the logic, and a change in logic does not affect the structure. As projects grow, this separation becomes essential for maintainability.

## Reusable UI Functions

A reusable UI function receives data, builds a DOM element, and returns it. The same function can be called many times with different inputs, producing consistent output each time without duplicating code.

Example:
```javascript
function createUserCard(user) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `${user.name}${user.email}`;
  return card;
}
```

## Project Organization

Small web applications are typically structured into folders by responsibility:

```
project/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── api.js
│   └── ui.js
└── assets/
```

- `api.js` handles all fetch requests and error handling
- `ui.js` handles creating elements and updating the page
- `index.html` only contains the page structure

This structure means anyone opening the project immediately knows where each type of logic lives, and adding new features does not require searching through one large file.

## React Fundamentals

### What is React and Why Frameworks Replaced Manual DOM Manipulation
React is a JavaScript library for building user interfaces. Instead of manually creating and updating DOM elements step by step, you describe what the UI should look like for a given set of data, and React handles creating, updating, and removing the actual DOM nodes. This is called a declarative approach, compared to the imperative approach used in vanilla JavaScript. Frameworks like React exist because manually keeping the DOM in sync with changing data becomes harder to manage as an application grows.

### React vs the Vanilla Component Approach
The `createUserCard(user)` function used in the Data Viewer project already followed the idea of a component: a function that takes data and returns a piece of UI. The difference is that `createUserCard` built a real DOM node directly using `document.createElement`, while a React component returns a JSX description of the UI, and React converts that description into actual DOM nodes itself.

```javascript
// Vanilla
function createUserCard(user) {
  const div = document.createElement("div");
  div.className = "user-card";
  div.innerHTML = `<h3>${user.name}</h3><p>${user.email}</p>`;
  return div;
}
```

```jsx
// React
function Card({ user }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

### JSX
JSX is a syntax extension that allows writing markup-like code directly inside JavaScript. It looks like HTML, but it is compiled into regular JavaScript function calls behind the scenes. A few differences from HTML: attributes use camelCase, such as `className` instead of `class`, curly braces `{}` allow JavaScript expressions to be inserted into the markup, and every component must return a single root element (or a Fragment `<>...</>`).

```jsx
function Welcome() {
  return <h1>Hello there</h1>;
}
```

### Components (Function Components)
A function component is a regular JavaScript function that returns JSX describing a piece of UI. Component names must start with a capital letter so React can tell them apart from regular HTML tags. Components let UI be broken into small, reusable, independent pieces, similar to how `createUserCard` was reused for every user, but with React managing the rendering.

### Props
Props are how data is passed from a parent component into a child component, similar to how `createUserCard(user)` received `user` as a function argument. In JSX, data is passed through attributes, which React collects into a single `props` object inside the component.

```jsx
function App() {
  const user1 = { name: "Leanne Graham", email: "Sincere@april.biz" };
  return <Card user={user1} />;
}
```

Props flow in one direction only, from parent to child. A component can read its props but cannot change them.

### Rendering Lists with .map()
`.map()` is used instead of `.forEach()` to render lists in React, because `.map()` returns a new array, which is required for JSX to render the result. `forEach()` only runs a function for each item and returns nothing, so it cannot be used directly inside JSX.

```jsx
function App({ users }) {
  return (
    <div className="grid">
      {users.map(user => (
        <Card key={user.id} user={user} />
      ))}
    </div>
  );
}
```

Each item in a rendered list needs a unique `key` prop so React can track which item is which across re-renders.

### Basic Project Structure
A typical Vite + React project looks like this:

```
my-first-react-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── components/
        └── Card.jsx
```

`index.html` contains only a single empty `<div id="root"></div>`, unlike the Data Viewer project where the HTML had visible structure. `main.jsx` is the entry point that renders `App` into that root div. `App.jsx` is the main component, and `components/` is a folder used by convention to organize reusable pieces like `Card.jsx`.

## React State Fundamentals

State is data that a component manages internally and that can change over time. Unlike props, which are passed into a component from its parent and cannot be changed by the component itself, state belongs to the component and is fully controlled by it. When state changes, React automatically re-renders the component to reflect the new value, so the UI always stays in sync with the data.

The useState hook is how state is declared in a function component. Calling useState(initialValue) returns an array with two items: the current value and a function to update it. The common pattern is array destructuring, for example const [searchTerm, setSearchTerm] = useState(""). Calling the setter function (setSearchTerm) updates the state and tells React to re-render the component with the new value.

React re-renders automatically because state updates trigger React to re-run the component function and compare the new output to what is currently on screen, updating only what changed. This is different from Vanilla JavaScript, where I had to manually select elements with querySelector and update them with innerHTML or class toggling every time something changed.

Events in React are handled using props like onClick and onChange, which take a function instead of a string like in HTML. For example, onChange={(e) => setSearchTerm(e.target.value)} runs every time the input value changes and updates state with the new text.

The core difference: props are data passed in from outside and are read-only from the component's perspective, while state is data a component owns and can update itself, which is what makes interactivity possible.

## useEffect & Live Data

### What is a Side Effect in React?

A side effect is anything a component does that reaches outside its own render cycle — fetching data from an API, setting a page title, starting a timer, or writing to local storage. These are called side effects because they affect something outside the component itself, not just what React renders on screen. Fetching data is the most common side effect in real applications, because the component needs to go out to a server, wait for a response, and then update its own state with the result.

### The useEffect Hook

`useEffect` is the React hook designed for running side effects. It takes two arguments: an effect function and a dependency array.

```jsx
useEffect(() => {
  // side effect runs here
}, []);
```

The dependency array controls when the effect re-runs. An empty array `[]` means the effect runs once, when the component first mounts (appears on screen), and never again after that. This is the correct choice for a one-time data fetch on page load. If the array is left out entirely, the effect runs after every single render, which causes infinite re-renders when fetching data — because fetch updates state, state causes a re-render, and the re-render triggers another fetch.

### Why fetch Must Not Be Called in the Component Body

If `fetch` is called directly in the component body (outside `useEffect`), it runs every time the component renders. When the data arrives and `setState` is called, that triggers a re-render, which calls `fetch` again, which triggers another render — an infinite loop. Wrapping the fetch inside `useEffect` with `[]` breaks that cycle by ensuring the fetch runs only once.

### The Three States of a Data Fetch

Every fetch request has three possible outcomes, and a real application must handle all three:

- **Loading** — the request has been sent but no response has arrived yet. The UI should show a loading indicator so the user knows something is happening.
- **Success (data)** — the response arrived and the data was parsed successfully. The UI should render the data.
- **Error** — something went wrong, whether a bad URL, no internet connection, or a server failure. The UI should show a clear error message instead of leaving the user with a blank screen.

Handling only the success case (the happy path) is a common mistake. The other two states are just as real, and ignoring them makes an application feel broken when conditions are not perfect.

```jsx
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function fetchUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  fetchUsers();
}, []);
```

Controlled Forms & Input Validation
What a controlled component is
A controlled component is a form input where React state is the single source of truth for the input's value. Instead of letting the browser manage what's typed, you bind the input's value to a state variable and update that variable on every keystroke through onChange. This means the input always reflects exactly what's in state, and state always reflects exactly what's in the input. The two stay in sync at all times.
Why controlled inputs are preferred over reading the DOM directly
In vanilla JavaScript, reading a form field means querying the DOM at the moment of submission to find out what the user typed. With controlled inputs, you always have the current value in state without touching the DOM at all. This makes validation easier because you can check state at any point, not just on submit. It also makes clearing the form straightforward: reset the state variables and the inputs clear automatically. The component becomes predictable because the UI is always a direct reflection of state.
Handling form submission in React
Form submission is handled through the onSubmit prop on the <form> element. The handler receives an event object, and calling e.preventDefault() is the first thing you do inside it. Without that call, the browser's default behavior fires, which reloads the page and wipes the React state. After preventing the default, the handler runs the validation logic and processes the form data.
Basic validation
Validation checks run inside the onSubmit handler before anything is added to the list. Required field checks confirm that no state variable is an empty string after trimming whitespace. A basic email format check uses a regular expression to confirm the value contains an @ and a domain. If any check fails, an error message is stored in a separate state variable and displayed inline next to the relevant field. If all checks pass, the new entry is added to the list and the form fields are cleared by resetting each state variable to an empty string.
