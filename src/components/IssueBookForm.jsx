import Modal from "./Modal.jsx";
import DateField from "./DateField.jsx";
import IssueStudentSelect from "./IssueStudentSelect.jsx";
import IssueBookSelect from "./IssueBookSelect.jsx";
import IssueFormActions from "./IssueFormActions.jsx";

export default function IssueBookForm({
  form,
  students,
  books,
  availableCopies,
  onChange,
  onSubmit,
  onClose,
}) {
  return (
    <Modal
      title="Issue a book"
      subtitle="Choose a student, a book and its dates."
      onClose={onClose}
    >
      <form className="form-grid" onSubmit={onSubmit}>
        <IssueStudentSelect
          students={students}
          value={form.studentId}
          onChange={onChange}
        />

        <IssueBookSelect
          books={books}
          value={form.bookId}
          availableCopies={availableCopies}
          onChange={onChange}
        />

        <DateField
          label="Issue date *"
          name="issueDate"
          value={form.issueDate}
          onChange={onChange}
          required
          max={form.today}
        />

        <DateField
  label="Due date *"
  name="dueDate"
  value={form.dueDate}
  onChange={onChange}
  required
  min={form.issueDate}
/>

        <p className="form-help full-field">
          Past due dates are allowed for overdue testing. Issue date can be today or an earlier date.
        </p>

        <IssueFormActions onClose={onClose} />
      </form>
    </Modal>
  );
}
