export default function BookAvailableCopiesCell({ available }) {
  const stockClass = available === 0 ? "stock-text stock-zero" : "stock-text";
  return <td><span className={stockClass}>{available} available</span></td>;
}
