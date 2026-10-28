import SidebarRefreshButton from "./SidebarRefreshButton.jsx";
const menuItems = [
  { id: "dashboard", symbol: "▦", label: "Dashboard" },
  { id: "books", symbol: "▤", label: "Book Management" },
  { id: "students", symbol: "♙", label: "Student Management" },
  { id: "tracking", symbol: "◉", label: "Student-wise Tracking" },
  { id: "issue-return", symbol: "⇄", label: "Book Issue & Return" },
  { id: "overdue", symbol: "◷", label: "Overdue Tracking" },
  { id: "availability", symbol: "⌕", label: "Book Availability" }
];

export default function Sidebar({ activePage, onChangePage }) {
  return (
    <aside className="sidebar">
      <div className="brand-lockup">
        <div className="brand-mark">L<span>+</span></div>
        <div>
          <div className="brand-name">Library<span>Management</span></div>
          <div className="brand-subtitle">SYSTEM</div>
        </div>
      </div>

      <div className="sidebar-label">WORKSPACE</div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {menuItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => onChangePage(item.id)}
          >
            <span className="nav-symbol">{item.symbol}</span>
            <span>{item.label}</span>
            {activePage === item.id && <span className="nav-active-dot" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-note">
          <div className="note-icon">✦</div>
          <strong>Library desk</strong>
          <span>Keep every book in its place.</span>
        </div>
        <SidebarRefreshButton />
      </div>
    </aside>
  );
}
