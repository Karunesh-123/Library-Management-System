export default function IssueSummaryCard({ label, value, color }) {
  return (
    <div className="mini-summary">
      <span className={`summary-dot ${color}`} />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
