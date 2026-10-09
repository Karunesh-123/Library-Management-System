export default function BookCategoryField({ value, onChange }) {
  return (
    <label className="form-field">
      <span>Category</span>
      <input name="category" value={value} onChange={onChange} placeholder="e.g. Education" />
    </label>
  );
}
