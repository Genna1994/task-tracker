# ✅ Task Tracker

A full-stack task management app built with **React**, **Node.js/Express**, and **MySQL**.

## Features

- ➕ Add tasks with title, description, and priority
- ✏️ Edit existing tasks inline
- 🗑️ Delete tasks
- ✅ Toggle task completion
- 🔍 Filter by status (All / Active / Completed)
- 🏷️ Priority levels: Low, Medium, High

---

## Project Structure

```
task-tracker/
├── backend/          # Node.js + Express API
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │   └── tasks.js
│   └── package.json
└── frontend/         # React app
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── TaskForm.jsx
    │   │   ├── TaskItem.jsx
    │   │   └── FilterBar.jsx
    │   └── index.js
    └── package.json
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://dev.mysql.com/downloads/) 8.0+

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/task-tracker.git
cd task-tracker
```

### 2. MySQL Database

Log into MySQL and run:

```sql
CREATE DATABASE task_tracker;
USE task_tracker;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_tracker
PORT=5000
```

Start the server:

```bash
npm run dev
```

API runs at `http://localhost:5000`

### 4. Frontend

```bash
cd ../frontend
npm install
npm start
```

App runs at `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint        | Description        |
|--------|-----------------|--------------------|
| GET    | /api/tasks      | Get all tasks      |
| POST   | /api/tasks      | Create a task      |
| PUT    | /api/tasks/:id  | Update a task      |
| DELETE | /api/tasks/:id  | Delete a task      |

---

## Deployment

### Backend (Railway / Render)
- Push to GitHub
- Connect repo to [Railway](https://railway.app) or [Render](https://render.com)
- Add environment variables
- Deploy

### Frontend (Vercel / Netlify)
- Set `REACT_APP_API_URL` to your deployed backend URL
- Deploy `/frontend` folder

---

## License

MIT
