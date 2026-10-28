export default function BookFormActions({ isEditing, onCancel }) {
  return (
    <div className="form-actions full-field">
      <button type="button" className="secondary-button" onClick={onCancel}>Cancel</button>
      <button className="primary-button" type="submit">{isEditing ? "Save changes" : "Add book"}</button>
    </div>
  );
}
