# User Directory App

A full-stack-style React application built during a web development internship at Sohail Smart Solutions. It fetches live user data from a public API, lets you search and add users, and includes a detail page for each one.

## Features

- Live data fetched from the JSONPlaceholder API using `useEffect`
- Search filter that narrows results in real time
- Controlled form with validation to add new users
- Multi-page routing with React Router (Home, User Detail, About)
- Loading, empty, and error states on every view
- Clean component structure with `components/` and `pages/` folders

## Data Source

User data is fetched from the JSONPlaceholder API:
https://jsonplaceholder.typicode.com/users/

This is a free public REST API that returns 10 fake users, each with a name, email, phone, company, address, and website. The app uses this endpoint to populate the directory on load and to fetch individual user details on the detail page.

## Tech Stack

- React 18
- Vite
- React Router v6
- JSONPlaceholder API

## Screenshots

> Home page with user cards and search

![Home Page](screenshots/home.png)

> User cards displayed on the Home page

![User Cards](screenshots/users.png)

> User detail page

![User Detail](screenshots/detail.png)

> About page

![About Page](screenshots/Aboutpage.png)

## How to Run

1. Clone the repository:
```bash
   git clone https://github.com/Qadoory123/aurak-internship-web-development.git
```
2. Navigate to the project folder:
```bash
   cd aurak-internship-web-development/first-react-app
```
3. Install dependencies:
```bash
   npm install
```
4. Start the development server:
```bash
   npm run dev
```
5. Open your browser at `http://localhost:5173`

## Developer

**Abdalqader Ahmed**
Computer Engineering Student, AURAK
Internship at Sohail Smart Solutions, Dubai, UAE
