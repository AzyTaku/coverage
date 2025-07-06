const pool = require("../index");

async function waitForDB(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query("SELECT 1");
      return;
    } catch (err) {
      console.log(`Waiting for DB to be ready... (${i + 1}/${retries})`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Database not ready after multiple retries");
}

async function initDB() {
  await waitForDB();

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE
      );
    `);
    console.log("'todos' table is ready.");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

module.exports = initDB;
