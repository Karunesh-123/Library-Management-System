import BookFormFields from "./BookFormFields.jsx";
import BookFormActions from "./BookFormActions.jsx";

export default function BookForm({ form, onChange, onSubmit, isEditing, onCancel }) {
  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <BookFormFields form={form} onChange={onChange} />
      <BookFormActions isEditing={isEditing} onCancel={onCancel} />
    </form>
  );
}
