export default function BookTotalCopiesField({ value, onChange }) {
  return (
    <label className="form-field">
      <span>Total copies *</span>
      <input type="number" name="totalCopies" min="1" value={value} onChange={onChange} required />
    </label>
  );
}
