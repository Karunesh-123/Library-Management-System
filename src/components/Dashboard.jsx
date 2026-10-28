import PageHeader from "./PageHeader.jsx";
import StatCard from "./StatCard.jsx";
import DashboardWelcome from "./DashboardWelcome.jsx";
import { formatDate, getToday } from "../utils.js";

export default function Dashboard({ books, students, issues }) {
  const activeIssues = issues.filter((issue) => !issue.returnDate);
  const overdueIssues = activeIssues.filter((issue) => issue.dueDate < getToday());
  const totalCopies = books.reduce((sum, book) => sum + Number(book.totalCopies || 0), 0);
  const availableCopies = books.reduce((sum, book) => {
    const borrowed = activeIssues.filter((issue) => issue.bookId === book.id).length;
    return sum + Math.max(0, Number(book.totalCopies || 0) - borrowed);
  }, 0);
  const today = new Date();

  return (
    <>
      <PageHeader title="Dashboard" description="A clear view of your library, books and student activity." />
      <DashboardWelcome />

      <div className="section-title-row">
        <div><h2>Library overview</h2><p>Today's collection summary</p></div>
        <span className="date-chip">Current date · {formatDate(getToday())}</span>
      </div>
      <section className="stats-grid">
        <StatCard label="Total books" value={totalCopies} note={`${books.length} book titles registered`} symbol="▤" color="blue" />
        <StatCard label="Available books" value={availableCopies} note="Copies ready to issue" symbol="✓" color="green" />
        <StatCard label="Issued books" value={activeIssues.length} note="Currently with students" symbol="⇄" color="violet" />
        <StatCard label="Total students" value={students.length} note="Registered students" symbol="♙" color="amber" />
        <StatCard label="Overdue books" value={overdueIssues.length} note="Return date has passed" symbol="◷" color="red" />
      </section>

    </>
  );
}
