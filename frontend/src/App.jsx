import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import FilterBar from './components/FilterBar';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch {
      setError('Failed to connect to API. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      if (newTask.id) setTasks(prev => [newTask, ...prev]);
    } catch {
      setError('Failed to create task.');
    }
  };

  const handleUpdate = async (taskData) => {
    try {
      const updated = await updateTask(editTask.id, { ...editTask, ...taskData });
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
      setEditTask(null);
    } catch {
      setError('Failed to update task.');
    }
  };

  const handleToggle = async (task) => {
    try {
      const updated = await updateTask(task.id, { ...task, completed: !task.completed });
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
    } catch {
      setError('Failed to update task.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch {
      setError('Failed to delete task.');
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  const completionPct = tasks.length
    ? Math.round((counts.completed / tasks.length) * 100)
    : 0;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-top">
            <div>
              <div className="logo-tag">TASK//TRACKER</div>
              <h1 className="heading">Your Work,<br/>Organized.</h1>
            </div>
            <div className="progress-ring-wrap">
              <svg className="progress-ring" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="var(--border)" strokeWidth="6"/>
                <circle
                  cx="40" cy="40" r="32" fill="none"
                  stroke="var(--accent)" strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - completionPct / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
                <text x="40" y="45" textAnchor="middle" className="ring-text">{completionPct}%</text>
              </svg>
              <span className="ring-label">done</span>
            </div>
          </div>

          {error && (
            <div className="error-banner">
              ⚠ {error}
              <button onClick={() => setError('')}>✕</button>
            </div>
          )}
        </header>

        <section className="form-section">
          <div className="section-label">{editTask ? '— editing task' : '— new task'}</div>
          <TaskForm
            onSubmit={editTask ? handleUpdate : handleCreate}
            editTask={editTask}
            onCancel={() => setEditTask(null)}
          />
        </section>

        <section className="list-section">
          <FilterBar filter={filter} setFilter={setFilter} counts={counts} />

          {loading ? (
            <div className="state-msg">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="state-msg empty">
              <span className="empty-icon">◎</span>
              <span>{filter === 'all' ? 'No tasks yet. Add one above.' : `No ${filter} tasks.`}</span>
            </div>
          ) : (
            <div className="task-list">
              {filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onEdit={setEditTask}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="footer">
          <span>{counts.active} task{counts.active !== 1 ? 's' : ''} remaining</span>
          <span>Task Tracker v1.0</span>
        </footer>
      </div>
    </div>
  );
}
