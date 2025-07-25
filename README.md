# 📝 COVERAGE Todo App (Full Stack: React + Node.js + PostgreSQL with Docker)

This is a full-stack todo app using:

- 📦 **Frontend:** React + Vite + Tailwind
- 🔧 **Backend:** Node.js + Express
- 🗄️ **Database:** PostgreSQL
- 🐳 **Containerized with Docker**

---

## 📂 Folder Structure

```
Coverage/
├── backend/
│   ├── db/
│   ├── routes/
│   ├── Dockerfile
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── vite.config.js
├── docker-compose.yml
```

---

## ⚙️ Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Internet connection (for image pulls)

---

## 🚀 How to Run the App

1. **Clone the repo (if needed)**

   ```bash
   git clone <your-repo-url>
   cd Coverage
   ```

2. **Build and run the app using Docker Compose**

   ```bash
   docker-compose up --build
   ```

   This will:

   - Build the **frontend** and **backend**
   - Pull and run a **PostgreSQL** container
   - Automatically create the `todos` table (via backend script)

3. **Access the app in your browser**

   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000/api/todos](http://localhost:5000/api/todos)

---

## 🧠 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, pg
- **Database:** PostgreSQL
- **Dev Tools:** Docker, Docker Compose

---

## 🐞 Troubleshooting

- **Frontend not loading (ERR_EMPTY_RESPONSE)?**

  - Ensure Vite binds to `0.0.0.0`. In `frontend/Dockerfile`, use:
    ```Dockerfile
    CMD ["npm", "run", "dev", "--", "--host"]
    ```
  - Or configure `vite.config.js`:
    ```js
    export default {
      server: {
        host: true,
        port: 5173,
      },
    };
    ```

- **Backend fails with "database is starting up"?**
  - The app includes a retry mechanism (`waitForDB()`) and timeout to wait for PostgreSQL to fully start.

---

## 📦 Environment Variables

In `backend/.env`:

```env
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=todo_db
PORT=5000
```

Make sure these match the `docker-compose.yml` setup.

---

## ✅ Useful Commands

- Rebuild containers:

  ```bash
  docker-compose up --build
  ```

- Stop and remove containers:
  ```bash
  docker-compose down
  ```

---

## 📌 Notes

- The backend automatically creates the `todos` table if it doesn't exist.
- Data persists using Docker volumes.
