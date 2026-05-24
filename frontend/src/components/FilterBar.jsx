import React from 'react';

export default function FilterBar({ filter, setFilter, counts }) {
  const filters = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'active', label: 'Active', count: counts.active },
    { key: 'completed', label: 'Done', count: counts.completed },
  ];

  return (
    <div className="filter-bar">
      {filters.map(f => (
        <button
          key={f.key}
          className={`filter-btn ${filter === f.key ? 'active' : ''}`}
          onClick={() => setFilter(f.key)}
        >
          {f.label}
          <span className="filter-count">{f.count}</span>
        </button>
      ))}
    </div>
  );
}
