export default function BookIsbnField({ value, onChange }) {
  return (
    <label className="form-field">
      <span>ISBN (optional)</span>
      <input name="isbn" value={value} onChange={onChange} placeholder="ISBN number" />
    </label>
  );
}
