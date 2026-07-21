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
`fetch()` is the built-in browser function used to send requests to an API. It returns a **Promise**, which represents a value that will be available in the future, either successfully (resolved) or with an error (rejected).

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

### State vs Props
State is data that a component manages internally and that can change over time. Unlike props, which are passed into a component from its parent and cannot be changed by the component itself, state belongs to the component and is fully controlled by it. When state changes, React automatically re-renders the component to reflect the new value, so the UI always stays in sync with the data.

### The useState Hook
The `useState` hook is how state is declared in a function component. Calling `useState(initialValue)` returns an array with two items: the current value and a function to update it. The common pattern is array destructuring, for example `const [searchTerm, setSearchTerm] = useState("")`. Calling the setter function (`setSearchTerm`) updates the state and tells React to re-render the component with the new value.

### Why React Re-Renders Automatically
React re-renders automatically because state updates trigger React to re-run the component function and compare the new output to what is currently on screen, updating only what changed. This is different from vanilla JavaScript, where I had to manually select elements with `querySelector` and update them with `innerHTML` or class toggling every time something changed.

### Handling Events in React
Events in React are handled using props like `onClick` and `onChange`, which take a function instead of a string like in HTML. For example, `onChange={(e) => setSearchTerm(e.target.value)}` runs every time the input value changes and updates state with the new text.

### The Core Difference
Props are data passed in from outside and are read-only from the component's perspective, while state is data a component owns and can update itself, which is what makes interactivity possible.

## useEffect & Live Data

### What is a Side Effect in React?
A side effect is anything a component does that reaches outside its own render cycle, fetching data from an API, setting a page title, starting a timer, or writing to local storage. These are called side effects because they affect something outside the component itself, not just what React renders on screen. Fetching data is the most common side effect in real applications, because the component needs to go out to a server, wait for a response, and then update its own state with the result.

### The useEffect Hook
`useEffect` is the React hook designed for running side effects. It takes two arguments: an effect function and a dependency array.

```jsx
useEffect(() => {
  // side effect runs here
}, []);
```

The dependency array controls when the effect re-runs. An empty array `[]` means the effect runs once, when the component first mounts (appears on screen), and never again after that. This is the correct choice for a one-time data fetch on page load. If the array is left out entirely, the effect runs after every single render, which causes infinite re-renders when fetching data, because fetch updates state, state causes a re-render, and the re-render triggers another fetch.

### Why fetch Must Not Be Called in the Component Body
If `fetch` is called directly in the component body (outside `useEffect`), it runs every time the component renders. When the data arrives and `setState` is called, that triggers a re-render, which calls `fetch` again, which triggers another render, an infinite loop. Wrapping the fetch inside `useEffect` with `[]` breaks that cycle by ensuring the fetch runs only once.

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

## Controlled Forms & Input Validation

### What a Controlled Component Is
A controlled component is a form input where React state is the single source of truth for the input's value. Instead of letting the browser manage what's typed, you bind the input's `value` to a state variable and update that variable on every keystroke through `onChange`. This means the input always reflects exactly what's in state, and state always reflects exactly what's in the input. The two stay in sync at all times.

### Why Controlled Inputs Are Preferred Over Reading the DOM Directly
In vanilla JavaScript, reading a form field means querying the DOM at the moment of submission to find out what the user typed. With controlled inputs, you always have the current value in state without touching the DOM at all. This makes validation easier because you can check state at any point, not just on submit. It also makes clearing the form straightforward: reset the state variables and the inputs clear automatically. The component becomes predictable because the UI is always a direct reflection of state.

### Handling Form Submission in React
Form submission is handled through the `onSubmit` prop on the `<form>` element. The handler receives an event object, and calling `e.preventDefault()` is the first thing you do inside it. Without that call, the browser's default behavior fires, which reloads the page and wipes the React state. After preventing the default, the handler runs the validation logic and processes the form data.

### Basic Validation
Validation checks run inside the `onSubmit` handler before anything is added to the list. Required field checks confirm that no state variable is an empty string after trimming whitespace. A basic email format check uses a regular expression to confirm the value contains an `@` and a domain. If any check fails, an error message is stored in a separate state variable and displayed inline next to the relevant field. If all checks pass, the new entry is added to the list and the form fields are cleared by resetting each state variable to an empty string.

## React Router & Client-Side Routing

### What Client-Side Routing Is
In a traditional website, clicking a link sends a request to the server and the browser loads a completely new HTML page. In a Single-Page Application (SPA), the browser loads one HTML file once and JavaScript handles everything after that. Client-side routing means React intercepts URL changes, matches the new path to a component, and swaps what is displayed on screen, all without a full page reload. The server is never contacted again just to navigate between views. This makes navigation feel instant and preserves all React state across page changes.

### React Router Basics
React Router is the standard library for adding routing to React apps. The four core pieces are:

- `BrowserRouter` wraps the entire app and gives React Router access to the browser's URL history API.
- `Routes` is a container that looks at the current URL and renders only the first `Route` that matches.
- `Route` maps a specific path (like `/about`) to a component that should render when that path is active.
- `Link` renders a navigation element that updates the URL without reloading the page.

### Route Parameters
A route like `/users/:id` uses `:id` as a dynamic segment. The colon tells React Router that this part of the URL is a variable, not a fixed string. When a user visits `/users/4`, React Router captures `4` and makes it available inside the component through the `useParams` hook. Calling `useParams()` returns an object like `{ id: "4" }`, which can then be used to find and display the matching record.

### Link vs a Tag
A standard HTML `<a href="/about">` tag causes a full browser navigation. The current page is unloaded, a new request goes to the server, and the entire React app restarts from scratch, wiping all state. A React Router `<Link to="/about">` intercepts the click, updates the browser's URL using the History API, and tells React Router to re-render the correct component, with no server request and no page reload. Using `<a>` tags for internal navigation in a React app defeats the purpose of client-side routing entirely.

## Integration & Portfolio Polish

### Clean Project Structure
Refactoring means reorganizing code without changing what it does. A professional React app separates concerns into a `components/` folder for reusable pieces (like `Card.jsx`) and a `pages/` folder for full views (like `Home.jsx`, `UserDetail.jsx`, `About.jsx`). Each file holds one component, nothing more. Keeping files small and focused makes the codebase easier to navigate, debug, and hand off to another developer.

### Loading, Empty, and Error States
Every view that fetches data or depends on user input needs three states handled: loading (a spinner or message while waiting), empty (a helpful prompt when no results match), and error (a clear message if something goes wrong). Skipping any of these leaves users with a broken or confusing experience. Handling all three is one of the clearest signals that a project is production-ready rather than just a demo.

### What Makes a Good README
A strong README includes a short project description, a feature list, the tech stack, screenshots, and step-by-step run instructions. It answers the question a recruiter or developer would ask before opening the code: what does this do, and how do I see it?

### Why a Live Link Matters
A deployed link lets anyone open the app in seconds without cloning, installing dependencies, or running a dev server. To a recruiter reviewing dozens of portfolios, the difference between a live link and a GitHub folder can decide whether they look further.

## Context API & Global State

### What Is Prop Drilling
Prop drilling happens when data needs to pass from a top-level component down to a deeply nested one, forcing every component in between to accept and forward that prop, even if it never uses it itself. As an app grows, this becomes painful: adding a new shared value means touching every file in the chain, and it gets harder to track where a prop actually came from versus where it's just passing through.

### What the Context API Solves
The Context API is React's built-in solution to prop drilling. It lets you define a piece of state once and make it available to any component in the tree, no matter how deeply nested, without manually passing it through props at every level.

### The Three Pieces
- `createContext()` creates the context object itself, an empty container for the shared value.
- A **Provider** component wraps the part of the app that needs access (usually the whole app, in `App.jsx`), holds the actual state with `useState`, and passes it down through the `value` prop.
- `useContext(MyContext)` is called inside any component that needs to read or update that state, returning the current value directly regardless of how deep that component sits in the tree.

```jsx
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Navbar />
      <Cards />
    </ThemeContext.Provider>
  );
}

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme
    </button>
  );
}
```

### When to Use Context vs Plain Props
Context is not meant to replace props everywhere. For state used only by a component and maybe one direct child, plain props are simpler and easier to trace. Context is best reserved for state that many unrelated components across the tree need, like theme, authentication, or current user, where prop drilling would otherwise be unavoidable.

## Deployment: Taking the App Live with Vercel

### Development vs Production
Up until now, everything I built only existed on localhost, running inside CodeSandbox's dev server. Development mode is meant for building: it includes hot-reloading, unminified code, and detailed error overlays, but none of that is meant for the public. Production is different. It is a live, permanent version of the app that anyone can open through a real URL, running optimized code with no dev tools attached.

### The Build Step
To get from source code to production, React apps go through a build step. Running `npm run build` uses Vite to bundle all the JavaScript into a small number of optimized files, minify the code so it loads faster, and output everything into a `dist/` folder. This is the version that actually gets deployed, since raw JSX and unbundled files are not something a browser or web server can run directly.

### Continuous Deployment with Vercel
Vercel connects to a GitHub repository and handles this automatically. Once linked, every push to the main branch triggers Vercel to pull the latest code, run the build command, and deploy the new output to a live production URL. This is called continuous deployment, and it means updates go live without any manual uploading.

### Environments and Production URLs
An environment refers to the context the app is running in, such as development or production, and each can behave differently. The production URL is the permanent public link representing the live main version of the app, separate from any preview links Vercel generates for other branches.

### A Note on Secrets
One important principle for future backend work is that API keys and secrets should never be hardcoded into source code, since a public GitHub repo would expose them to anyone. They belong in environment variables instead, kept out of the codebase entirely.

## Backend Foundations: Node.js, Express & HTTP

### The Client/Server Model
This task introduced me to the backend side of web development after five weeks of working only on the frontend. Until now, every project I built ran entirely in the browser and either used hardcoded data, localStorage, or a public API like JSONPlaceholder. Today I learned what happens on the other side of that API, the server that actually stores and returns the data.

A backend is code that runs on a server rather than in the user's browser. The frontend is the client, it requests data and displays it. The backend receives those requests, runs logic, and sends data back. This client/server relationship is the same one I have been interacting with every time I called `fetch()` against JSONPlaceholder, except now I am the one writing the server side of that exchange.

### Node.js and Express
Node.js is what makes this possible. It is a runtime that lets JavaScript run outside the browser, on a server or directly in a terminal, using the same language I already know from React.

Express is a framework built on top of Node.js that simplifies building a server. Instead of manually parsing raw HTTP connections, Express provides simple functions like `app.get()` and `app.post()` to define what the server should do when a specific request comes in.

### HTTP Methods and Routes
I also learned the four core HTTP methods. GET retrieves data, POST creates new data, PUT updates existing data, and DELETE removes it. A route, or endpoint, is a specific URL path combined with one of these methods, for example `GET /api/tasks`. When a matching request arrives, Express runs the function attached to that route.

### req and res
Every route handler function receives two objects, `req` and `res`. `req` represents the incoming request and can contain information like URL parameters or submitted data. `res` is used to send the response back to whoever made the request, most often using `res.json()` to return data in JSON format.

This task laid the foundation for everything else this week, since building an API that can create, update, and delete data depends entirely on understanding this request and response cycle.

## Building a REST API: Full CRUD with Express

### REST and RESTful APIs
Today I learned about REST and building a complete CRUD API. REST stands for Representational State Transfer, and it is a convention for designing APIs around resources rather than actions. Instead of having a separate URL for every possible operation, a RESTful API uses one URL per resource, like `/api/tasks`, and relies on the HTTP method to say what should happen to that resource. This keeps the API predictable, since the same URL pattern always refers to the same resource no matter what method is used.

### CRUD Mapped to HTTP Methods
This connects directly to CRUD, which stands for Create, Read, Update, and Delete, the four basic operations almost every application performs on data. Each one maps to a specific HTTP method: Create maps to POST, Read maps to GET, Update maps to PUT or PATCH, and Delete maps to DELETE. Yesterday's server only had GET endpoints, so it could hand out data but not change it. Adding the other three methods is what turns a read-only server into a real backend.

### Middleware and express.json()
To read data sent in a POST or PUT request, I needed middleware, specifically `express.json()`. Middleware is a function that runs before the actual route handler, and `express.json()` parses the raw JSON text sent in a request body and attaches it to `req.body`, so the route handler can use it directly instead of dealing with raw text.

### Route Parameters on the Backend
I also used route parameters on the backend for the first time, defining routes like `/api/tasks/:id`. This is the server-side equivalent of `useParams` from React Router. Express captures whatever value appears in place of `:id` and makes it available as `req.params.id`, which I used to find the matching task in the array.

### HTTP Status Codes
Finally, I learned to return proper HTTP status codes instead of always defaulting to 200: 201 for a successful POST, 400 when required fields are missing, and 404 when a requested id does not exist.

## Full-Stack Connection: CORS & Wiring React to My Own API

Today I connected my React frontend to the Express backend I built over the last two days, which meant running into CORS for the first time. CORS exists because browsers enforce the Same-Origin Policy, which treats protocol, hostname, and port together as an origin. Since my React app runs on Vite's dev server port and my Express server runs on port 5000, the browser treats them as two different origins even though both are on localhost. Without any fix, the browser still sends the request and Express still processes it, but the browser blocks my JavaScript from reading the response unless it sees an Access-Control-Allow-Origin header saying it's safe to do so. The cors middleware in Express adds that header automatically, so app.use(cors()) is enough to let my frontend read responses from my backend. For POST requests specifically, the browser also sends a hidden preflight OPTIONS request first, asking the server whether the real POST is allowed before sending it, and cors() handles that automatically too.

The bigger shift today was realizing I wasn't adding fetch from scratch, I was replacing the data layer inside TaskContext. Previously TaskContext read and wrote tasks using localStorage. Now it calls fetch against my own Express API instead. The rest of the app, Home, TaskCard, the Add Task form, never needed to know where the data came from in the first place, since they only ever talked to TaskContext through the useTasks hook. That is the real benefit of Context: the data source underneath can change completely without touching the components that consume it.

The full round trip now looks like this: a component mounts, useEffect runs inside TaskContext, fetch sends a GET request to my own Express server at /api/tasks, Express matches the route and returns the in-memory tasks array as JSON, the browser allows my code to read the response because of CORS, TaskContext updates its state with the parsed data, and every component using useTasks re-renders with the new tasks. Fetch never touches the DOM directly, it only ever updates state, and React handles the actual UI update from there.

I also thought about why frontend and backend are usually kept as separate projects instead of one combined app. A built React app compiles down to static HTML, CSS, and JavaScript that the browser downloads and runs, it does not keep running anywhere. Express is different, it stays online continuously, waiting for requests, handling logic, and eventually talking to a database. Keeping them separate means I can update one without touching the other, and in theory the same backend could serve more than one frontend, not just this specific React app.

### Full-Stack Connection (Part 2): Complete, Polish & Document

Today I completed the full CRUD loop by wiring update and delete into the frontend, matching the pattern already used for create. Both `updateTask` and `deleteTask` in `TaskContext.jsx` now send real requests to the Express API, using `PUT` and `DELETE` respectively, and only update local state after the server confirms success. This means every action in the UI, adding, editing, and deleting a task, now flows through my own backend rather than local state alone.

Building the edit feature meant creating a new page, `EditTask.jsx`, closely modeled on the existing `AddTask.jsx` form. It pre-fills its fields from the matching task using `useEffect`, then calls `updateTask` instead of `addTask` on submit. While building this, I noticed my `PUT` route on the backend only accepted `title` and `category`, the same gap I had already flagged with `POST` in yesterday's task. I fixed this by extending both the backend route and the frontend's `updateTask` call to also handle `description`, closing a gap I had intentionally left open the day before.

The rest of today focused on polish rather than new features. Reviewing my own files for dead code, I found that `index.css` still contained several leftover defaults from the original Vite template, including a `color-scheme: light dark` property, the same setting that caused an invisible search input bug back in Week 3. Since my app manages its own light/dark theme through Context, these leftover rules were unnecessary and risked conflicting with my actual theme system, so I stripped `index.css` down to a minimal reset and confirmed all styling now lives intentionally in `App.css`.

I also found that my backend's `package.json` still had its original CodeSandbox template values, including `main: "index.js"`, a file that does not exist in my project, since my actual server file is `server.js`. Running `npm start` as written would have failed for anyone cloning the repository. I corrected `main` and the `start` script to point to `server.js`, and added a `dev` script using Node's `--watch` flag so the server restarts automatically on file changes, addressing a recurring annoyance from earlier in the week where CodeSandbox would not pick up server edits without a manual restart.

Finally, I wrote complete READMEs for both the frontend and backend repositories, covering setup instructions, tech stack, and a full list of API endpoints with their methods and purposes. Writing the backend README right after fixing its `package.json` reinforced why documentation and configuration accuracy go hand in hand. A README that describes a run command that does not actually work is worse than no README at all.

### Key Takeaway

Today's task had no new concept to learn, and that was the point. Completing a feature, testing it, cleaning up after myself, and documenting it accurately is a different kind of work than building something for the first time, and it is just as real a part of professional development. The bugs I caught today, a leftover CSS property, an untouched template file, were not new mistakes. They were old habits from earlier weeks resurfacing, which is exactly why a dedicated polish and documentation pass matters even when the underlying features already work.

### Complete CRUD API for Capstone Resource

Today's task extended TaskFlow's backend from read-only to a full CRUD API, adding create, update, and delete on top of yesterday's GET endpoints.

CRUD maps directly onto HTTP methods: POST creates, GET reads, PUT updates, and DELETE removes. For tasks, my main resource, I implemented all four. POST /api/tasks validates that both title and projectId are present, returning 400 if either is missing, and 201 with the newly created task on success, using a simple max-id-plus-one approach to generate new ids since there's no database yet. PUT /api/tasks/:id updates only the fields actually provided in the request body, leaving the rest untouched, and returns 404 if the id doesn't exist. DELETE /api/tasks/:id removes the matching task using splice() and returns the deleted item, also with 404 handling for a missing id.

For projects, my secondary resource, I added POST /api/projects with the same validation pattern, requiring a name and returning 400 if it's missing, 201 with the new project on success.

The validation and status code logic followed the same shape across every route: check the input first, return an early 400 if something required is missing, only touch the in-memory array once the input is valid, and return the right status code, 201 for created, 200 for a normal success, 404 when the target id can't be found. Seeing that pattern repeat consistently across both resources confirmed it's a real convention and not something specific to a single route.

Testing every case in Postman, valid POST, invalid POST, PUT on a real id, PUT on a missing id, and DELETE on both a real and missing id, confirmed all the status codes behave exactly as expected before touching the frontend tomorrow.
