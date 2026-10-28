import StudentIdField from "./StudentIdField.jsx";
import StudentNameField from "./StudentNameField.jsx";
import StudentContactField from "./StudentContactField.jsx";
import StudentFormActions from "./StudentFormActions.jsx";

export default function StudentForm({ form, onChange, onSubmit, isEditing, onCancel }) {
  return <form className="form-grid" onSubmit={onSubmit}>
    <StudentIdField value={form.studentId} onChange={onChange} />
    <StudentNameField value={form.name} onChange={onChange} />
    <StudentContactField value={form.contact} onChange={onChange} />
    <StudentFormActions isEditing={isEditing} onCancel={onCancel} />
  </form>;
}
