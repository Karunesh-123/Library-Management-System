export default function StatCard({ label, value, note, symbol, color }) {
  return (
    <div className={`stat-card ${color || "blue"}`}>
      <div className="stat-card-top">
        <span className="stat-label">{label}</span>
        <span className="stat-symbol">{symbol}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-note">{note}</div>
    </div>
  );
}
