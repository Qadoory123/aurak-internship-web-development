# TaskFlow - Project & Task Manager

## Pitch
A lightweight project and task manager where users organize work into
projects, track each task's status, and see progress at a glance on
a dashboard.

## Problem & Target User
Freelancers, students, and small teams juggle tasks across multiple
projects with no simple way to see overall progress. TaskFlow groups
tasks under projects and gives a single dashboard view of what's done,
in progress, and pending. Target user: a student or freelancer managing
a handful of active projects.

## Core Features
1. Create, view, and delete projects
2. Create, view, edit, and delete tasks within a project
3. Task status tracking (todo / in-progress / done)
4. Task priority tagging (low / medium / high)
5. Dashboard showing task counts by status across all projects
6. Filter tasks by status within a project

## Data Model

### Project
- id
- name
- description
- createdAt

### Task
- id
- projectId
- title
- description
- status (todo | in-progress | done)
- priority (low | medium | high)
- createdAt

## API Endpoints

### Projects
- GET    /api/projects        - list all projects
- POST   /api/projects        - create a project
- GET    /api/projects/:id    - get one project
- DELETE /api/projects/:id    - delete a project

### Tasks
- GET    /api/tasks           - list all tasks (optional ?projectId= filter)
- POST   /api/tasks           - create a task
- GET    /api/tasks/:id       - get one task
- PUT    /api/tasks/:id       - update a task
- DELETE /api/tasks/:id       - delete a task
