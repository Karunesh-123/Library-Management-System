# Library Management System (React + Express + MongoDB)

## Requirements
- Node.js and npm installed
- MongoDB Server running locally on `mongodb://127.0.0.1:27017`

## Windows quick start
1. Extract this ZIP.
2. Open the `library-management-system` folder in VS Code.
3. Double-click `setup-and-run.bat` in Windows File Explorer, or run `./setup-and-run.bat` from a PowerShell terminal opened in this folder.
4. Keep both server windows open.
5. Open the Vite URL printed in the frontend terminal (usually `http://localhost:5173`).
6. Check the backend at `http://localhost:5000/api/health`.

The setup script installs dependencies for the frontend and backend and starts them in separate terminal windows. The frontend UI components and stylesheet are retained from the supplied project; data operations are connected to the Express API and MongoDB. A due date earlier than the issue date is rejected, while past due dates remain allowed for overdue testing when the issue date is also in the past.

## Backend configuration
`backend/.env` defaults to the local MongoDB service. Change it only if your MongoDB connection differs. Database name: `library_management`.

## Important
Keep MongoDB Server running, along with both frontend and backend terminal windows, while using the app. Existing records in the `library_management` database are not deleted by the setup script.
