const pool = require("../index");

// Get all todos
const getAllTodos = async () => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  return result.rows;
};

// Get only incomplete todos
const getIncompleteTodos = async () => {
  const result = await pool.query(
    "SELECT * FROM todos WHERE completed = false ORDER BY id DESC"
  );
  return result.rows;
};

// Create a new todo
const createTodo = async ({ title, description }) => {
  const result = await pool.query(
    "INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *",
    [title, description]
  );
  return result.rows[0];
};

// Update a todo's completed status
const toggleTodoCompleted = async (id, completed) => {
  const result = await pool.query(
    "UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *",
    [completed, id]
  );
  return result.rows[0];
};

// Delete a todo
const deleteTodo = async (id) => {
  await pool.query("DELETE FROM todos WHERE id = $1", [id]);
};

module.exports = {
  getAllTodos,
  getIncompleteTodos,
  createTodo,
  toggleTodoCompleted,
  deleteTodo,
};
