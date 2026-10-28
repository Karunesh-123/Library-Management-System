import { useState } from "react";
import PageHeader from "./PageHeader.jsx";
import StatCard from "./StatCard.jsx";
import StudentSearch from "./StudentSearch.jsx";
import { formatDate, getToday } from "../utils.js";

export default function StudentTracking({ books, students, issues }) {
  const [searchText, setSearchText] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const matchingStudents = students.filter((student) => `${student.name} ${student.studentId}`.toLowerCase().includes(searchText.toLowerCase()));
  const selectedStudent = students.find((student) => student.studentId === selectedId) || (searchText.trim() && matchingStudents.length === 1 ? matchingStudents[0] : null);
  const studentIssues = selectedStudent ? issues.filter((issue) => issue.studentId === selectedStudent.studentId) : [];
  const totalIssued = studentIssues.length;
  const totalReturned = studentIssues.filter((issue) => Boolean(issue.returnDate)).length;
  const activeIssues = studentIssues.filter((issue) => !issue.returnDate);
  const overdueCount = activeIssues.filter((issue) => issue.dueDate < getToday()).length;

  function handleSearchChange(event) { setSearchText(event.target.value); setSelectedId(""); }

  function chooseStudent(student) {
    setSelectedId(student.studentId);
    setSearchText(`${student.name} (${student.studentId})`);
  }

  function searchStudent() {
    const value = searchText.trim().toLowerCase();
    const found = students.find((student) =>
      student.studentId.toLowerCase() === value ||
      student.name.toLowerCase() === value ||
      `${student.name} (${student.studentId})`.toLowerCase() === value
    );
    if (found) setSelectedId(found.studentId);
    else if (matchingStudents.length === 1) setSelectedId(matchingStudents[0].studentId);
    else alert("Student not found. Check the name or Student ID.");
  }

  return <>
    <PageHeader title="Student-wise Tracking" description="Search by student name or ID to review their complete book history." />
    <StudentSearch value={searchText} onChange={handleSearchChange} onSearch={searchStudent} matches={matchingStudents} onChoose={chooseStudent} />

    {!selectedStudent ? <div className="tracking-empty content-card"><div className="empty-illustration">⌕</div><h2>Student record will appear here</h2><p>Enter a student's name or ID above, then choose the matching record.</p></div> : <>
      <section className="selected-student-banner"><div className="avatar large-avatar">{selectedStudent.name.charAt(0).toUpperCase()}</div><div className="selected-student-name"><span className="eyebrow">STUDENT RECORD</span><h2>{selectedStudent.name}</h2><p>{selectedStudent.studentId} <span>•</span> {selectedStudent.contact || "No contact details"}</p></div><div className="student-overdue-total"><span>Total overdue books</span><strong>{overdueCount}</strong></div></section>
      <section className="stats-grid tracking-stats">
        <StatCard label="Total books issued" value={totalIssued} note="All issue records" symbol="⇄" color="blue" />
        <StatCard label="Books returned" value={totalReturned} note="Marked as returned" symbol="✓" color="green" />
        <StatCard label="Currently issued" value={activeIssues.length} note="Still with this student" symbol="▤" color="violet" />
        <StatCard label="Overdue books" value={overdueCount} note="Due date has passed" symbol="◷" color="red" />
      </section>
      <section className="content-card">
        <div className="card-heading"><div><h2>Book-wise tracking</h2><p>Issue date, due date, current date and status for each book record.</p></div><span className="date-chip">Current date · {formatDate(getToday())}</span></div>
        <div className="table-wrap"><table><thead><tr><th>BOOK NAME</th><th>ISSUE DATE</th><th>DUE DATE</th><th>CURRENT DATE</th><th>BOOK STATUS</th><th>TOTAL OVERDUE BOOKS</th></tr></thead><tbody>
          {studentIssues.length === 0 ? <tr><td colSpan="6"><div className="empty-state">No issue records for this student.</div></td></tr> : studentIssues.map((issue) => {
            const book = books.find((item) => item.id === issue.bookId);
            const overdue = !issue.returnDate && issue.dueDate < getToday();
            return <tr key={issue.id} className={overdue ? "overdue-row" : ""}><td><div className="table-primary">{book ? book.name : "Deleted book"}</div><div className="table-secondary">{book ? book.author : "—"}</div></td><td>{formatDate(issue.issueDate)}</td><td>{formatDate(issue.dueDate)}</td><td>{formatDate(getToday())}</td><td><span className={`status-pill ${issue.returnDate ? "returned" : overdue ? "overdue" : "issued"}`}>{issue.returnDate ? "RETURNED" : overdue ? "OVERDUE" : "ISSUED"}</span></td><td><span className={`overdue-count-chip ${overdueCount > 0 ? "has-overdue" : ""}`}>{overdueCount}</span></td></tr>;
          })}
        </tbody></table></div>
      </section>
    </>}
  </>;
}
