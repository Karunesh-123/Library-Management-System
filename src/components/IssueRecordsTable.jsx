import { formatDate, getToday } from "../utils.js";
import ReturnBookButton from "./ReturnBookButton.jsx";

function IssueRecordRow({ issue, book, student, onReturnBook }) {
  const isOverdue = !issue.returnDate && issue.dueDate < getToday();

  return (
    <tr>
      <td>
        <div className="table-primary">{book ? book.name : "Deleted book"}</div>
        <div className="table-secondary">{book ? book.author : "—"}</div>
      </td>
      <td>
        <div className="table-primary">{student ? student.name : "Unknown student"}</div>
        <div className="table-secondary">{issue.studentId}</div>
      </td>
      <td>{formatDate(issue.issueDate)}</td>
      <td>{formatDate(issue.dueDate)}</td>
      <td>
        <span className={`status-pill ${issue.returnDate ? "returned" : isOverdue ? "overdue" : "issued"}`}>
          {issue.returnDate ? "RETURNED" : isOverdue ? "OVERDUE" : "ISSUED"}
        </span>
      </td>
      <td>
        {issue.returnDate
          ? <span className="returned-date">Returned {formatDate(issue.returnDate)}</span>
          : <ReturnBookButton onClick={() => onReturnBook(issue)} />}
      </td>
    </tr>
  );
}

export default function IssueRecordsTable({ issues, books, students, onReturnBook }) {
  const sortedIssues = [...issues].sort((first, second) => second.id - first.id);

  return (
    <section className="content-card">
      <div className="card-heading">
        <div>
          <h2>Book issue register</h2>
          <p>Issue history and current return status</p>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>BOOK</th><th>STUDENT</th><th>ISSUE DATE</th><th>DUE DATE</th><th>STATUS</th><th>ACTION</th></tr>
          </thead>
          <tbody>
            {sortedIssues.length === 0 ? (
              <tr><td colSpan="6"><div className="empty-state">No book issue records yet.</div></td></tr>
            ) : sortedIssues.map((issue) => (
              <IssueRecordRow
                key={issue.id}
                issue={issue}
                book={books.find((item) => item.id === issue.bookId)}
                student={students.find((item) => item.studentId === issue.studentId)}
                onReturnBook={onReturnBook}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
