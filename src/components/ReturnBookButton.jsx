export default function ReturnBookButton({ onClick }) {
  return (
    <button type="button" className="small-action return-action" onClick={onClick}>
      Mark returned
    </button>
  );
}
