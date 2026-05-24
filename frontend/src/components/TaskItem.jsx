import React from 'react';

const PRIORITY_LABELS = { low: 'LOW', medium: 'MED', high: 'HIGH' };

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
      <button
        className={`checkbox ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggle(task)}
        aria-label="Toggle complete"
      >
        {task.completed && <span>✓</span>}
      </button>

      <div className="task-content">
        <div className="task-header">
          <span className="task-title">{task.title}</span>
          <span className={`priority-badge priority-${task.priority}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
        </div>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <span className="task-date">
          {new Date(task.created_at).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
          })}
        </span>
      </div>

      <div className="task-actions">
        <button className="icon-btn edit-btn" onClick={() => onEdit(task)} title="Edit">
          ✎
        </button>
        <button className="icon-btn delete-btn" onClick={() => onDelete(task.id)} title="Delete">
          ✕
        </button>
      </div>
    </div>
  );
}
