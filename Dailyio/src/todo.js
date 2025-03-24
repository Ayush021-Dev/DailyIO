import React, { useState } from "react";
import "./todo.css";

const ToDo = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "📝 Complete daily report", completed: false },
    { id: 2, text: "🏃‍♂️ Evening workout", completed: false },
    { id: 3, text: "📚 Read chapter 5", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-page">
            {/* To-Do List Container */}
      <div className="todo-container">
        <div className="todo-card">
          <h2 className="todo-header">To-Do List</h2>

          {/* Input Field */}
          <input
            type="text"
            className="todo-input"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />

          {/* Task List */}
          <div className="todo-list">
            {tasks.map((task) => (
              <div key={task.id} className={`todo-item ${task.completed ? "completed" : ""}`}>
                <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
                <div className="todo-actions">
                  <button className="todo-complete-btn" onClick={() => toggleComplete(task.id)}>✓</button>
                  <button className="todo-delete-btn" onClick={() => deleteTask(task.id)}>✕</button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ToDo;
