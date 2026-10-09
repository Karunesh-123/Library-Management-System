import EditBookButton from "./EditBookButton.jsx";
import DeleteBookButton from "./DeleteBookButton.jsx";

export default function BookActionsCell({ onEdit, onDelete }) {
  return (
    <td>
      <div className="action-buttons">
        <EditBookButton onClick={onEdit} />
        <DeleteBookButton onClick={onDelete} />
      </div>
    </td>
  );
}
