import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskText.trim() === "") {
      setError("Please enter a task.");
      return;
    }

    if (editId) {
      setTasks(
        tasks.map((task) =>
          task.id === editId ? { ...task, text: taskText } : task
        )
      );
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };

      setTasks([newTask, ...tasks]);
    }

    setTaskText("");
    setError("");
  };

  const editTask = (task) => {
    setTaskText(task.text);
    setEditId(task.id);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <div className="todo-card">
        <h1> Todo App</h1>
        

        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button type="submit">{editId ? "Update" : "Add"}</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty">No tasks found</p>
          ) : (
            filteredTasks.map((task) => (
              <div className="task-item" key={task.id}>
                <div>
                  <span
                    onClick={() => toggleTask(task.id)}
                    className={task.completed ? "completed" : ""}
                  >
                    {task.text}
                  </span>

                  <p className={task.completed ? "done-status" : "pending-status"}>
                    {task.completed ? "Completed" : "Pending"}
                  </p>
                </div>

                <div className="actions">
                  <button onClick={() => toggleTask(task.id)} className="complete-btn">
                    {task.completed ? "Undo" : "Complete"}
                  </button>

                  <button onClick={() => editTask(task)} className="edit">
                    Edit
                  </button>

                  <button onClick={() => deleteTask(task.id)} className="delete">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;