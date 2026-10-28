import PageHeader from "./PageHeader.jsx";
import OverdueSummary from "./OverdueSummary.jsx";
import { formatDate, getToday } from "../utils.js";

export default function OverdueTracking({ students, books, issues }) {
  const overdueIssues = issues.filter((issue) => !issue.returnDate && issue.dueDate < getToday());
  const overdueStudents = students.map((student) => {
    const studentOverdue = overdueIssues.filter((issue) => issue.studentId === student.studentId);
    return { ...student, overdueCount: studentOverdue.length };
  }).filter((student) => student.overdueCount > 0).sort((a, b) => b.overdueCount - a.overdueCount || a.name.localeCompare(b.name));

  return <>
    <PageHeader title="Overdue Tracking" description="See which students have books past their due date, ordered by overdue count." />
    <OverdueSummary overdueCount={overdueIssues.length} studentCount={overdueStudents.length} />
    <section className="content-card"><div className="card-heading"><div><h2>Students with overdue books</h2><p>Highest overdue count appears first</p></div><span className="date-chip">As of {formatDate(getToday())}</span></div>
      <div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>STUDENT ID</th><th>OVERDUE BOOK COUNT</th></tr></thead><tbody>
        {overdueStudents.length === 0 ? <tr><td colSpan="3"><div className="empty-state"><div className="empty-illustration success-empty">✓</div><strong>No overdue books</strong><p>All current book issues are within their due dates.</p></div></td></tr> : overdueStudents.map((student) => <tr key={student.id}><td><div className="student-cell"><span className="avatar">{student.name.charAt(0)}</span><div><div className="table-primary">{student.name}</div><div className="table-secondary">{student.contact || "No contact details"}</div></div></div></td><td><span className="id-chip">{student.studentId}</span></td><td><span className="overdue-count-chip has-overdue">{student.overdueCount}</span></td></tr>)}
      </tbody></table></div>
    </section>
  </>;
}
