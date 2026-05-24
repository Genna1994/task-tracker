const BASE_URL = process.env.REACT_APP_API_URL || '/api';

export const fetchTasks = () =>
  fetch(`${BASE_URL}/tasks`).then(r => r.json());

export const createTask = (task) =>
  fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  }).then(r => r.json());

export const updateTask = (id, task) =>
  fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  }).then(r => r.json());

export const deleteTask = (id) =>
  fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' }).then(r => r.json());
