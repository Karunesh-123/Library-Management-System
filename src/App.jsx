import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import BookManagement from "./components/BookManagement.jsx";
import StudentManagement from "./components/StudentManagement.jsx";
import StudentTracking from "./components/StudentTracking.jsx";
import BookIssueReturn from "./components/BookIssueReturn.jsx";
import OverdueTracking from "./components/OverdueTracking.jsx";
import BookAvailability from "./components/BookAvailability.jsx";

import { api } from "./api.js";
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

  const [books, setBooks] = useState(sampleBooks);
  const [students, setStudents] = useState(sampleStudents);
  const [issues, setIssues] = useState(sampleIssues);

  // Load all records from MongoDB through the Express API. Seed sample data only on a fresh database.
  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        const [savedBooks, savedStudents, savedIssues] = await Promise.all([
          api.getAll("books"), api.getAll("students"), api.getAll("issues")
        ]);
        if (cancelled) return;
        if (!savedBooks.length && !savedStudents.length && !savedIssues.length) {
          await Promise.all([
            ...sampleBooks.map((item) => api.save("books", item)),
            ...sampleStudents.map((item) => api.save("students", item)),
            ...sampleIssues.map((item) => api.save("issues", item)),
          ]);
          if (cancelled) return;
          setBooks(sampleBooks); setStudents(sampleStudents); setIssues(sampleIssues);
        } else {
          setBooks(savedBooks); setStudents(savedStudents); setIssues(savedIssues);
        }
      } catch (error) {
        console.error(error);
        alert("Backend se connect nahi ho paaya. MongoDB aur backend server check karein, phir page refresh karein. Details: " + error.message);
      }
    }
    loadData();
    return () => { cancelled = true; };
  }, []);

  function changePage(page) {
    setActivePage(page);
    setMobileMenuOpen(false);
  }

  async function saveBook(bookToSave) {
    try { await api.save("books", bookToSave); } catch (e) { alert("Book save nahi hui: " + e.message); return; }
    const bookAlreadyExists = books.some(
      (book) => book.id === bookToSave.id
    );

    if (bookAlreadyExists) {
      setBooks(books.map((book) => book.id === bookToSave.id ? bookToSave : book));
      return;
    }

    setBooks([...books, bookToSave]);
  }

  async function deleteBook(bookToDelete) {
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
      try { await api.remove("books", bookToDelete.id); setBooks(books.filter((book) => book.id !== bookToDelete.id)); }
      catch (e) { alert("Book delete nahi hui: " + e.message); }
    }
  }

  async function saveStudent(studentToSave) {
    try { await api.save("students", studentToSave); } catch (e) { alert("Student save nahi hua: " + e.message); return; }
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

  async function deleteStudent(studentToDelete) {
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
      try { await api.remove("students", studentToDelete.id); setStudents(students.filter((student) => student.id !== studentToDelete.id)); }
      catch (e) { alert("Student delete nahi hua: " + e.message); }
    }
  }

  async function issueBook(newIssue) {
    try { await api.save("issues", newIssue); setIssues([...issues, newIssue]); }
    catch (e) { alert("Book issue nahi hui: " + e.message); }
  }

  async function returnBook(issueToReturn) {
    // Return immediately; no confirmation popup is shown.
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const returnDate = `${year}-${month}-${day}`;

    const updatedIssue = { ...issueToReturn, returnDate };
    try { await api.save("issues", updatedIssue); setIssues(issues.map((issue) => issue.id === issueToReturn.id ? updatedIssue : issue)); }
    catch (e) { alert("Return update nahi hua: " + e.message); }
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
