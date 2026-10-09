export default function BookAuthorField({ value, onChange }) {
  return (
    <label className="form-field">
      <span>Author *</span>
      <input name="author" value={value} onChange={onChange} placeholder="Author name" required />
    </label>
  );
}
