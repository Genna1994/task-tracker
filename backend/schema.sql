-- Task Tracker Database Schema
-- Run this in your MySQL client to set up the database

CREATE DATABASE IF NOT EXISTS task_tracker;
USE task_tracker;

CREATE TABLE IF NOT EXISTS tasks (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  priority    ENUM('low', 'medium', 'high') DEFAULT 'medium',
  completed   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data (optional)
INSERT INTO tasks (title, description, priority) VALUES
  ('Set up project', 'Initialize the Task Tracker repository and install dependencies', 'high'),
  ('Design the UI', 'Create wireframes and choose color palette', 'medium'),
  ('Write unit tests', 'Cover API routes and React components', 'low');
