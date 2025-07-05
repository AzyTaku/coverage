const express = require("express");
const app = express();
const cors = require("cors");
const todosRouter = require("./routes/todo.js");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/api/todos", todosRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
