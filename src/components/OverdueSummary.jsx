import StatCard from "./StatCard.jsx";
export default function OverdueSummary({ overdueCount, studentCount }) {
  return <section className="stats-grid overdue-stats"><StatCard label="Total overdue books" value={overdueCount} note="Not yet returned after due date" symbol="◷" color="red" /><StatCard label="Students with overdue books" value={studentCount} note="Students needing a return reminder" symbol="♙" color="amber" /></section>;
}
