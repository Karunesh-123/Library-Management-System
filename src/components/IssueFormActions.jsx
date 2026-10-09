export default function IssueFormActions({ onClose }) {
  return (
    <div className="form-actions full-field">
      <button type="button" className="secondary-button" onClick={onClose}>
        Cancel
      </button>
      <button className="primary-button" type="submit">
        Confirm issue
      </button>
    </div>
  );
}
