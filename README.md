HEAD
# Library Management System

A frontend-only React + Vite project built with JavaScript and regular CSS. It does not use Tailwind CSS, Redux Toolkit, or a backend.

## Run locally

```bash
npm install
npm run dev
```

## Component structure

- `App.jsx`: top-level state, navigation and shared data.
- `components/Sidebar.jsx`: main navigation; `SidebarRefreshButton.jsx` is the refresh action.
- `components/Dashboard.jsx`: dashboard calculations and statistic cards; `DashboardWelcome.jsx` is the welcome section.
- `components/BookManagement.jsx`: book records and form state; catalogue, table, rows, fields, and action buttons are in separate files.
- `components/StudentManagement.jsx`: student record state; `StudentTable.jsx`, `StudentTableRow.jsx`, `StudentForm.jsx`, each student field, and form actions are separate files.
- `components/StudentTracking.jsx`: student-specific issue history; `StudentSearch.jsx` handles the name/ID search interface.
- `components/BookIssueReturn.jsx`: issue/return page state; issue form, date field, selectors, summary cards, records table, and return button are separate components.
- `components/OverdueTracking.jsx`: overdue list; `OverdueSummary.jsx` renders overdue summary cards.
- `components/BookAvailability.jsx`: availability search by book name or author.
- `data/sampleData.js`: sample books, students and issue records.
- `utils.js`: date formatting and local-storage reading helpers.

## Notes

Data is stored in the browser's LocalStorage. The issue date accepts today or an earlier date. Due dates can be in the past to allow overdue testing. A book is overdue when its due date is before today and it has not been returned. Returning a book updates its return date immediately without a confirmation popup.
=======
# Library-Management-System
A Library Management System built with React.js, JavaScript, HTML, and CSS. Manage books, student records, book issuing and returns, overdue tracking, and book availability. Features include a dashboard, student-wise tracking, reusable React components, and LocalStorage for data persistence.
2d958843f93e8da44919e473821e8986924f4aba
