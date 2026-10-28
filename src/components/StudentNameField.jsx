export default function StudentNameField({ value, onChange }) {
  return <label className="form-field"><span>Student name *</span><input name="name" value={value} onChange={onChange} placeholder="Full name" required /></label>;
}
