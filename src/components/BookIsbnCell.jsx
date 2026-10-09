export default function BookIsbnCell({ isbn }) {
  return <td className="isbn-text">{isbn || "—"}</td>;
}
