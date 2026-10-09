import { useState } from "react";
import PageHeader from "./PageHeader.jsx";
import IssueBookButton from "./IssueBookButton.jsx";
import IssueBookForm from "./IssueBookForm.jsx";
import IssueSummaryCard from "./IssueSummaryCard.jsx";
import IssueRecordsTable from "./IssueRecordsTable.jsx";
import { getToday } from "../utils.js";

export default function BookIssueReturn({ books, students, issues, onIssueBook, onReturnBook }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    studentId: "",
    bookId: "",
    issueDate: getToday(),
    dueDate: "",
    today: getToday(),
  });

  const activeIssues = issues.filter((issue) => !issue.returnDate);
  const returnedIssues = issues.filter((issue) => issue.returnDate);

  function getAvailableCopies(book) {
    const issuedCopies = activeIssues.filter((issue) => issue.bookId === book.id).length;
    return Number(book.totalCopies) - issuedCopies;
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function openIssueForm() {
    setForm({ studentId: "", bookId: "", issueDate: getToday(), dueDate: "", today: getToday() });
    setShowForm(true);
  }

  function handleIssueSubmit(event) {
    event.preventDefault();

    const selectedBookId = Number(form.bookId);
    const selectedBook = books.find((book) => book.id === selectedBookId);
    const studentExists = students.some((student) => student.studentId === form.studentId);

    if (!studentExists) {
      alert("Please select a student.");
      return;
    }

    if (!selectedBook || getAvailableCopies(selectedBook) < 1) {
      alert("This book is not currently available to issue.");
      return;
    }

    // Past due dates are allowed intentionally so overdue records can be tested.
    onIssueBook({
      id: Date.now(),
      studentId: form.studentId,
      bookId: selectedBookId,
      issueDate: form.issueDate,
      dueDate: form.dueDate,
      returnDate: "",
    });

    setShowForm(false);
  }

  return (
    <>
      <PageHeader
        title="Book Issue & Return"
        description="Record a book issue and mark it returned when it comes back."
        action={<IssueBookButton onClick={openIssueForm} />}
      />

      <div className="mini-summary-row">
        <IssueSummaryCard label="Active issue records" value={activeIssues.length} color="blue-dot" />
        <IssueSummaryCard label="Returned records" value={returnedIssues.length} color="green-dot" />
      </div>

      <IssueRecordsTable
        issues={issues}
        books={books}
        students={students}
        onReturnBook={onReturnBook}
      />

      {showForm && (
        <IssueBookForm
          form={form}
          students={students}
          books={books}
          availableCopies={getAvailableCopies}
          onChange={handleFormChange}
          onSubmit={handleIssueSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}
