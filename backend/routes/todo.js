const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  createTodo,
  toggleTodoCompleted,
  deleteTodo,
} = require("../db/models/todoModel");

// GET all todos
router.get("/", async (req, res) => {
  const todos = await getAllTodos();
  res.json(todos);
});

// POST a new todo
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const todo = await createTodo({ title, description });
  res.status(201).json(todo);
});

// PUT toggle completed
router.put("/:id", async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;

  const updated = await toggleTodoCompleted(id, completed);
  res.json(updated);
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deleteTodo(id);
  res.status(204).end();
});

module.exports = router;
