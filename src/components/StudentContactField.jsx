export default function StudentContactField({ value, onChange }) {
  return <label className="form-field full-field"><span>Contact details</span><input name="contact" value={value} onChange={onChange} placeholder="Phone number or email" /></label>;
}
