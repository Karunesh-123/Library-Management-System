import BookDetailsCell from "./BookDetailsCell.jsx";
import BookCategoryCell from "./BookCategoryCell.jsx";
import BookIsbnCell from "./BookIsbnCell.jsx";
import BookTotalCopiesCell from "./BookTotalCopiesCell.jsx";
import BookAvailableCopiesCell from "./BookAvailableCopiesCell.jsx";
import BookActionsCell from "./BookActionsCell.jsx";

export default function BookTableRow({ book, available, onEdit, onDelete }) {
  return (
    <tr>
      <BookDetailsCell book={book} />
      <BookCategoryCell category={book.category} />
      <BookIsbnCell isbn={book.isbn} />
      <BookTotalCopiesCell totalCopies={book.totalCopies} />
      <BookAvailableCopiesCell available={available} />
      <BookActionsCell onEdit={onEdit} onDelete={onDelete} />
    </tr>
  );
}
