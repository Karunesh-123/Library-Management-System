export default function SidebarRefreshButton() {
  return <button type="button" className="refresh-button" onClick={() => window.location.reload()}><span className="nav-symbol">↻</span><span>Refresh page</span></button>;
}
