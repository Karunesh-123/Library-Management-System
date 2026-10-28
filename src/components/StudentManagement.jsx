import { useState } from "react";
import PageHeader from "./PageHeader.jsx";
import Modal from "./Modal.jsx";
import AddStudentButton from "./AddStudentButton.jsx";
import StudentTable from "./StudentTable.jsx";
import StudentForm from "./StudentForm.jsx";

const emptyStudent = { studentId: "", name: "", contact: "" };

export default function StudentManagement({ students, onSaveStudent, onDeleteStudent }) {
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState(emptyStudent);

  function openAddForm() {
    setEditingStudent(null);
    setForm(emptyStudent);
    setShowForm(true);
  }

  function openEditForm(student) {
    setEditingStudent(student);
    setForm({ studentId: student.studentId, name: student.name, contact: student.contact });
    setShowForm(true);
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const duplicate = students.some((student) =>
      student.studentId.toLowerCase() === form.studentId.trim().toLowerCase() &&
      (!editingStudent || student.id !== editingStudent.id)
    );
    if (duplicate) {
      alert("This Student ID is already registered. Please use a different ID.");
      return;
    }
    const student = {
      ...form,
      id: editingStudent ? editingStudent.id : Date.now(),
      studentId: form.studentId.trim(),
      name: form.name.trim()
    };
    onSaveStudent(student);
    setShowForm(false);
  }

  return <>
    <PageHeader
      title="Student Management"
      description="Add students and maintain their names, IDs and contact details."
      action={<AddStudentButton onClick={openAddForm} />}
    />
    <StudentTable students={students} onEdit={openEditForm} onDelete={onDeleteStudent} />
    {showForm && <Modal title={editingStudent ? "Edit student" : "Register a student"} subtitle="Enter the student's details below." onClose={() => setShowForm(false)}>
      <StudentForm form={form} onChange={handleChange} onSubmit={handleSubmit} isEditing={Boolean(editingStudent)} onCancel={() => setShowForm(false)} />
    </Modal>}
  </>;
}
