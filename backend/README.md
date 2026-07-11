# Notes & Tasks — Backend API

A REST API built with Node.js and Express that stores and serves task data for the Notes & Tasks application. This backend replaces the frontend's earlier localStorage-based persistence with a real server, supporting full CRUD operations (Create, Read, Update, Delete).

## Tech Stack

- Node.js
- Express
- CORS (cross-origin request handling)
- In-memory data store (no database yet — data resets when the server restarts)

## Running Locally

1. Clone the repository and navigate to the backend folder:

```
   git clone https://github.com/Qadoory123/aurak-internship-web-development.git
   cd aurak-internship-web-development/backend
```

2. Install dependencies:

```
   npm install
```

3. Start the server:

```
   npm start
```

4. The server runs on port 5000. Confirm it's working by visiting:

```
   http://localhost:5000/api/health
```

   You should see `{ "status": "ok" }`.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Welcome message |
| GET | `/api/health` | Server health check |
| GET | `/api/tasks` | Returns all tasks |
| GET | `/api/tasks/:id` | Returns a single task by ID, 404 if not found |
| POST | `/api/tasks` | Creates a new task. Requires `title`; accepts `category` and `description`. Returns 201 on success, 400 if title is missing |
| PUT | `/api/tasks/:id` | Updates an existing task. Accepts `title`, `category`, and/or `description`. Only provided fields are updated. Returns 404 if the ID doesn't exist |
| DELETE | `/api/tasks/:id` | Deletes a task by ID. Returns the deleted task, 404 if the ID doesn't exist |

### Example Request Body (POST / PUT)

```json
{
  "title": "Finish backend README",
  "category": "Work",
  "description": "Document all endpoints clearly"
}
```

## Notes

- Data is stored in memory and resets every time the server restarts. There is no database connected yet — this is a planned next step.
- CORS is enabled to allow requests from the frontend, which runs on a separate origin/port during development.
- This backend is designed to run locally alongside the [Notes & Tasks frontend](../notes-tasks-app).
