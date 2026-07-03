# Notes & Tasks

**Live App:** https://notes-tasks-app-mu.vercel.app/

A simple task management app built with React. Add tasks with an optional category and description, browse them as a filterable card list, view full details on a dedicated page, and delete tasks you no longer need. Tasks persist across page refreshes using localStorage, and the entire app supports light and dark themes through React Context.

This project was planned and built independently as a capstone project during a web development internship, applying everything learned across five weeks: components, props, state, useEffect, controlled forms, routing, and Context.

## Features

- Add tasks with a title (required), category (optional), and description (optional)
- Controlled form with inline validation on submission
- Browse all tasks in a responsive card grid
- Filter tasks by category, generated dynamically from existing task data
- View full task details on a dedicated page via dynamic routing
- Delete tasks from the detail page
- Tasks persist across refreshes using localStorage
- Light and dark theme toggle, shared globally via Context
- Graceful empty state when no tasks exist and "not found" handling for invalid task IDs

## Tech Stack

- React (Vite)
- React Router DOM
- React Context API
- localStorage for persistence
- CSS (custom, no framework)

## Screenshots

**Home Page**
![Home](assets/screenshots/home.png)

**Task Detail Page**
![Task Detail](assets/screenshots/task-detail.png)

**Add Task Page**
![Add Task](assets/screenshots/add-task.png)

## Project Structure

- `notes-tasks-app/`
  - `src/`
    - `components/`
      - `CategoryFilter.jsx`
      - `Navbar.jsx`
      - `TaskCard.jsx`
    - `context/`
      - `TaskContext.jsx`
    - `pages/`
      - `AddTask.jsx`
      - `Home.jsx`
      - `TaskDetail.jsx`
    - `App.jsx`
    - `App.css`
    - `index.css`
    - `main.jsx`
  - `vite.config.js`
  - `package.json`
## How to Run Locally

1. Clone the repository and navigate into the project folder:
git clone https://github.com/Qadoory123/aurak-internship-web-development.git
cd aurak-internship-web-development/notes-tasks-app
2. Install dependencies:
npm install
3. Start the development server:
npm run dev
4. Open the local URL shown in the terminal (usually `http://localhost:5173`)

## State Architecture

The `tasks` array and `theme` value both live in Context, since they're needed across multiple unrelated pages and components. The category filter value stays as local state inside the Home page, since only Home needs to know the currently selected filter. Tasks are lazy-initialized from localStorage on first render and synced back to localStorage whenever the tasks array changes.

## What I Learned

Building this project independently, without a guided daily structure, required deciding the state architecture myself before writing any code, specifically which state belongs in Context versus local state. It also reinforced patterns from earlier weeks, useParams, useNavigate, controlled forms, and Context, by applying them to a new data model rather than following a set structure.
