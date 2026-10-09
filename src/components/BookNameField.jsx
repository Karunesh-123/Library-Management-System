export default function BookNameField({ value, onChange }) {
  return (
    <label className="form-field full-field">
      <span>Book name *</span>
      <input name="name" value={value} onChange={onChange} placeholder="e.g. Mathematics" required />
    </label>
  );
}
