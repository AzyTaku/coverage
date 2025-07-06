import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // 🔁 Fetch all tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/todos");
    const data = await res.json();
    // Filter only incomplete and take top 5
    const incompleteOnly = data.filter((t) => !t.completed).slice(0, 5);
    setTasks(incompleteOnly);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ Add new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    setNewTask({ title: "", description: "" });
    fetchTasks();
  };

  // ✅ Mark as done
  const markAsDone = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });

    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Add Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Task Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Task Description
              </label>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows={4}
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Tasks */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Tasks in TODO</h2>
          <div className="p-10 mx-auto space-y-5 max-w-[900px]">
            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks available</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 border rounded-lg bg-gray-300 flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-600">
                      {task.description}
                    </p>
                  </div>
                  <button
                    onClick={() => markAsDone(task.id)}
                    className="bg-transparent text-black px-3 py-1 rounded-sm border border-black hover:bg-white cursor-pointer"
                  >
                    DONE
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
