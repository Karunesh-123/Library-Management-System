export default function BookTable({ children }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>BOOK DETAILS</th>
            <th>CATEGORY</th>
            <th>ISBN</th>
            <th>TOTAL COPIES</th>
            <th>AVAILABLE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
