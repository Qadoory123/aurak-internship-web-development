# Notes/Tasks App — Plan

## Project Idea
A personal task tracker where you can add tasks with an optional category,
browse them as a list, filter by category, and view or delete a single task
on its own page. Data persists across sessions using localStorage.

## Features
- Add a new task (title, optional category, optional short description)
- View all tasks as a card list
- Filter the list by category (including an "Uncategorized" option)
- View a single task's detail page
- Delete a task
- Global dark/light theme toggle
- Tasks persist across refreshes via localStorage

## Pages
- `/` Home: task list + category filter
- `/tasks/:id` Task Detail: full info for one task, with a delete button
- `/add` Add Task: controlled form to create a new task

## Components
- `Navbar`: links to Home and Add Task, theme toggle button
- `TaskCard`: reusable card showing title, category (or "Uncategorized"), short preview
- `CategoryFilter`: buttons or dropdown to filter by category
- `TaskForm`: controlled form used on the Add Task page, category field optional

## State Breakdown
- **Context (global):** the `tasks` array (synced to localStorage), and `theme` (light/dark)
- **Local state:** the category filter value on the Home page, and the form input values in `TaskForm` until submitted
