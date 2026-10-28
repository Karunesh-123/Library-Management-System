export default function StudentTableRow({ student, onEdit, onDelete }) {
  return <tr>
    <td><div className="student-cell"><span className="avatar">{student.name.charAt(0).toUpperCase()}</span><div><div className="table-primary">{student.name}</div><div className="table-secondary">Library member</div></div></div></td>
    <td><span className="id-chip">{student.studentId}</span></td>
    <td>{student.contact || "—"}</td>
    <td><div className="action-buttons"><button className="small-action" onClick={() => onEdit(student)}>Edit</button><button className="small-action danger-action" onClick={() => onDelete(student)}>Delete</button></div></td>
  </tr>;
}
