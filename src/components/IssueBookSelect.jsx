export default function IssueBookSelect({ books, value, availableCopies, onChange }) {
  const availableBooks = books.filter((book) => availableCopies(book) > 0);

  return (
    <label className="form-field full-field">
      <span>Book *</span>
      <select name="bookId" value={value} onChange={onChange} required>
        <option value="">Select available book</option>
        {availableBooks.map((book) => (
          <option key={book.id} value={book.id}>
            {book.name} — {availableCopies(book)} available
          </option>
        ))}
      </select>
    </label>
  );
}
