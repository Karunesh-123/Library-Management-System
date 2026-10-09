export default function StudentFormActions({ isEditing, onCancel }) {
  return <div className="form-actions full-field"><button type="button" className="secondary-button" onClick={onCancel}>Cancel</button><button className="primary-button" type="submit">{isEditing ? "Save changes" : "Add student"}</button></div>;
}
