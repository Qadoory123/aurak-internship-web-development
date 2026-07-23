# TaskFlow Backend

REST API for TaskFlow, a full-stack project and task manager built for the Sohail Smart Solutions internship. Handles two related resources, projects and tasks, with full CRUD support, validation, and cascading deletes.

## Features

- Full CRUD for both projects and tasks
- Cascading delete: deleting a project also deletes all of its tasks
- Input validation on create/update routes, with proper 400 responses for invalid input
- 404 responses for any request targeting a project or task that doesn't exist
- Global 404 handler for unknown routes and a global error handler for uncaught errors, both returning consistent JSON
- CORS enabled so the React frontend can call this API from a different origin

## Tech Stack

- Node.js
- Express
- cors

## Project Structure

- `server.js` — app setup, middleware, health check, mounts the two resource routers, 404/error handlers
- `routes/projects.js` — all `/api/projects` routes
- `routes/tasks.js` — all `/api/tasks` routes

## Run Instructions
npm install
npm start

The server runs on `http://localhost:5000` by default.

For local development with automatic restarts on file changes:

npm run dev
## API Endpoints

### Health
| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Returns `{ status: "ok" }` |

### Projects
| Method | Route | Description |
|---|---|---|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get a single project by id (404 if not found) |
| POST | `/api/projects` | Create a project — `name` required, `description` optional (400 if invalid) |
| PUT | `/api/projects/:id` | Update a project's `name` and/or `description` (404 if not found) |
| DELETE | `/api/projects/:id` | Delete a project and cascade-delete its tasks (404 if not found) |

### Tasks
| Method | Route | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task by id (404 if not found) |
| POST | `/api/tasks` | Create a task — `title` and `projectId` required, `description`/`status`/`priority` optional (400 if invalid) |
| PUT | `/api/tasks/:id` | Update any provided task field (404 if not found) |
| DELETE | `/api/tasks/:id` | Delete a task (404 if not found) |

## Error Handling

Every route returns proper HTTP status codes: `200` for success, `201` for creation, `400` for invalid input, `404` for a missing resource. Requests to undefined routes return a `404` with a JSON error message instead of Express's default HTML error page, and any unexpected server error is caught by a global handler and returned as a `500` with a JSON message, so the API never leaks a raw stack trace or crashes silently.


## Deployment Status

This backend is not deployed to a permanent cloud host for this capstone. It runs locally (or on a temporary CodeSandbox devbox URL during development/demo), and the deployed frontend points at that URL via `VITE_API_URL`. Deploying this API to a permanent host (Render, Railway, etc.) is the documented next step — see **Next Steps** below.


## Next Steps

- **Deploy to a permanent host:** move off a local/CodeSandbox devbox onto Render or Railway so the API has a stable, always-on URL.
- **Persistent storage:** replace the in-memory `projects` and `tasks` arrays with a real database (MongoDB or PostgreSQL/SQL) so data survives server restarts.
- **Authentication:** add user accounts and require a valid session for write operations, associating each project and task with the user who created it.
