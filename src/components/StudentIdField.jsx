export default function StudentIdField({ value, onChange }) {
  return <label className="form-field"><span>Student ID *</span><input name="studentId" value={value} onChange={onChange} placeholder="e.g. STU-1005" required /></label>;
}
