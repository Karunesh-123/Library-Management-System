export default function IssueStudentSelect({ students, value, onChange }) {
  return (
    <label className="form-field full-field">
      <span>Student *</span>
      <select name="studentId" value={value} onChange={onChange} required>
        <option value="">Select student</option>
        {students.map((student) => (
          <option key={student.id} value={student.studentId}>
            {student.name} ({student.studentId})
          </option>
        ))}
      </select>
    </label>
  );
}
