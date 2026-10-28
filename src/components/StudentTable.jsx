import StudentTableRow from "./StudentTableRow.jsx";

export default function StudentTable({ students, onEdit, onDelete }) {
  return <section className="content-card">
    <div className="card-heading"><div><h2>Registered students</h2><p>{students.length} students in the library records</p></div></div>
    <div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>STUDENT ID</th><th>CONTACT DETAILS</th><th>ACTIONS</th></tr></thead>
      <tbody>{students.length === 0 ? <tr><td colSpan="4"><div className="empty-state">No students registered yet.</div></td></tr> : students.map((student) => <StudentTableRow key={student.id} student={student} onEdit={onEdit} onDelete={onDelete} />)}</tbody>
    </table></div>
  </section>;
}
