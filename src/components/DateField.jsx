
export default function DateField({
  label,
  name,
  value,
  onChange,
  required = false,
  min,
  max,
}) {
  return (
    <label className="form-field">
      <span>{label}</span>

      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
      />
    </label>
  );
}
