import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import BookManagement from "./components/BookManagement.jsx";
import StudentManagement from "./components/StudentManagement.jsx";
import StudentTracking from "./components/StudentTracking.jsx";
import BookIssueReturn from "./components/BookIssueReturn.jsx";
import OverdueTracking from "./components/OverdueTracking.jsx";
import BookAvailability from "./components/BookAvailability.jsx";

import { readSavedData } from "./utils.js";
import {
  sampleBooks,
  sampleIssues,
  sampleStudents,
} from "./data/sampleData.js";

const pageTitles = {
  dashboard: "Dashboard",
  books: "Book Management",
  students: "Student Management",
  tracking: "Student-wise Tracking",
  "issue-return": "Book Issue & Return",
  overdue: "Overdue Tracking",
  availability: "Book Availability",
};

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load saved records when the app starts. Sample data is used for a first visit.
  const [books, setBooks] = useState(() =>
    readSavedData("lms-books-v1", sampleBooks)
  );
  const [students, setStudents] = useState(() =>
    readSavedData("lms-students-v1", sampleStudents)
  );
  const [issues, setIssues] = useState(() =>
    readSavedData("lms-issues-v1", sampleIssues)
  );

  // Save each list when its state changes.
  useEffect(() => {
    localStorage.setItem("lms-books-v1", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("lms-students-v1", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("lms-issues-v1", JSON.stringify(issues));
  }, [issues]);

  function changePage(page) {
    setActivePage(page);
    setMobileMenuOpen(false);
  }

  function saveBook(bookToSave) {
    const bookAlreadyExists = books.some(
      (book) => book.id === bookToSave.id
    );

    if (bookAlreadyExists) {
      setBooks(
        books.map((book) =>
          book.id === bookToSave.id ? bookToSave : book
        )
      );
      return;
    }

    setBooks([...books, bookToSave]);
  }

  function deleteBook(bookToDelete) {
    const bookIsStillIssued = issues.some(
      (issue) => issue.bookId === bookToDelete.id && !issue.returnDate
    );

    if (bookIsStillIssued) {
      alert(
        "This book cannot be deleted while copies are issued. Return the book first."
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete "${bookToDelete.name}" from the catalogue?`
    );

    if (confirmed) {
      setBooks(books.filter((book) => book.id !== bookToDelete.id));
    }
  }

  function saveStudent(studentToSave) {
    const studentAlreadyExists = students.some(
      (student) => student.id === studentToSave.id
    );

    if (studentAlreadyExists) {
      setStudents(
        students.map((student) =>
          student.id === studentToSave.id ? studentToSave : student
        )
      );
      return;
    }

    setStudents([...students, studentToSave]);
  }

  function deleteStudent(studentToDelete) {
    const studentHasIssuedBooks = issues.some(
      (issue) =>
        issue.studentId === studentToDelete.studentId && !issue.returnDate
    );

    if (studentHasIssuedBooks) {
      alert(
        "This student still has books issued. Return those books before deleting the student."
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete student "${studentToDelete.name}"?`
    );

    if (confirmed) {
      setStudents(
        students.filter((student) => student.id !== studentToDelete.id)
      );
    }
  }

  function issueBook(newIssue) {
    setIssues([...issues, newIssue]);
  }

  function returnBook(issueToReturn) {
    // Return immediately; no confirmation popup is shown.
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const returnDate = `${year}-${month}-${day}`;

    setIssues(
      issues.map((issue) =>
        issue.id === issueToReturn.id ? { ...issue, returnDate } : issue
      )
    );
  }

  // Each page is a separate component, so its UI stays in its own file.
  function renderCurrentPage() {
    if (activePage === "books") {
      return (
        <BookManagement
          books={books}
          issues={issues}
          onSaveBook={saveBook}
          onDeleteBook={deleteBook}
        />
      );
    }

    if (activePage === "students") {
      return (
        <StudentManagement
          students={students}
          issues={issues}
          onSaveStudent={saveStudent}
          onDeleteStudent={deleteStudent}
        />
      );
    }

    if (activePage === "tracking") {
      return (
        <StudentTracking
          books={books}
          students={students}
          issues={issues}
        />
      );
    }

    if (activePage === "issue-return") {
      return (
        <BookIssueReturn
          books={books}
          students={students}
          issues={issues}
          onIssueBook={issueBook}
          onReturnBook={returnBook}
        />
      );
    }

    if (activePage === "overdue") {
      return (
        <OverdueTracking
          students={students}
          books={books}
          issues={issues}
        />
      );
    }

    if (activePage === "availability") {
      return <BookAvailability books={books} issues={issues} />;
    }

    return <Dashboard books={books} students={students} issues={issues} />;
  }

  return (
    <div className="app-shell">
      {mobileMenuOpen && (
        <button
          type="button"
          className="mobile-scrim"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <div
        className={
          mobileMenuOpen ? "sidebar-holder mobile-open" : "sidebar-holder"
        }
      >
        <Sidebar activePage={activePage} onChangePage={changePage} />
      </div>

      <main className="main-area">
        <header className="topbar">
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>

          <div className="breadcrumb">
            <span>Library</span>
            <span className="breadcrumb-separator">/</span>
            <strong>{pageTitles[activePage]}</strong>
          </div>

          <div className="topbar-right">
            <div className="topbar-date">
              <span className="online-dot" />
              Library desk is active
            </div>
            <div className="topbar-avatar">L</div>
          </div>
        </header>

        <div className="page-content">
          {renderCurrentPage()}
          <footer className="app-footer">
            <span>Library Management System</span>
            <span>Library records · Stored in this browser</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
