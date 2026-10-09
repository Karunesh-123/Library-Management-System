export default function BookDetailsCell({ book }) {
  return (
    <td>
      <div className="book-cell">
        <span className="book-cover">{book.name.charAt(0).toUpperCase()}</span>
        <div>
          <div className="table-primary">{book.name}</div>
          <div className="table-secondary">{book.author}</div>
        </div>
      </div>
    </td>
  );
}
