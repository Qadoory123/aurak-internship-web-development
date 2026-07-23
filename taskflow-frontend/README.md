# TaskFlow Frontend

React frontend for TaskFlow, a full-stack project and task manager built for the Sohail Smart Solutions internship. Connects to a custom Node.js/Express backend rather than localStorage or a public API — all data is fetched live and persists on the server.

## Live App

[https://taskflow-qadoory.vercel.app](https://taskflow-qadoory.vercel.app)

## Features

- Dashboard with task stats (total, to-do, in-progress, done), live search, and status filtering
- Project list with add and delete
- Project detail page with its own filtered task list and delete-with-confirmation
- Shared Add/Edit task form with inline validation, used for both creating and editing
- Task detail page showing full task info with edit and delete actions
- Light/dark theme shared app-wide through Context API
- Responsive layout: mobile-first, with a collapsing navbar and adaptive grid layouts
- Reusable component system: Button, Modal, ConfirmDialog, FormField, Toast
- Graceful error handling: failed requests show inline error messages instead of failing silently, and an Error Boundary catches unexpected render errors instead of showing a blank white screen

## Tech Stack

- React (Vite)
- React Router
- Context API for global state
- Fetch API for communicating with the backend

## Project Structure

- `src/context/AppContext.jsx` — fetches projects and tasks from the API on mount, exposes add/update/delete functions and theme state app-wide
- `src/components/` — reusable UI pieces (cards, buttons, modal, form field, toast, error boundary, etc.)
- `src/pages/` — one component per route (Dashboard, ProjectList, ProjectDetail, AddEditTask, TaskDetail, About)

## Run Instructions

npm install
npm run dev

Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend's URL before running:
VITE_API_URL=http://localhost:5000

To build for production:
npm run build

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the TaskFlow backend API |

## API Endpoints Consumed

Full details in the backend README. This app consumes:
- `GET / POST / PUT / DELETE /api/projects`
- `GET / POST / PUT / DELETE /api/tasks`

## Deployment Notes

This app is a single-page application using client-side routing (React Router). A `vercel.json` rewrite rule is included so that refreshing or directly visiting a nested route (e.g. `/tasks/5`) is correctly served instead of returning a 404.
