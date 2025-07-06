const express = require("express");
const app = express();
const cors = require("cors");
const todosRouter = require("./routes/todo.js");
const initDB = require("./db/models/initDB.js");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/api/todos", todosRouter);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await initDB(); // Got backend running before db connected issue - fix by adding timeout 5 seconds - fix 02 Wait for DB ready and table creation
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to initialize DB and start server:", err);
    process.exit(1); // Exit if DB init fails
  }
}

startServer();
