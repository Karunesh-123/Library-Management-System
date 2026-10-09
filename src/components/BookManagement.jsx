import { useState } from "react";
import PageHeader from "./PageHeader.jsx";
import Modal from "./Modal.jsx";
import AddBookButton from "./AddBookButton.jsx";
import BookCatalogue from "./BookCatalogue.jsx";
import BookTable from "./BookTable.jsx";
import EmptyBookRow from "./EmptyBookRow.jsx";
import BookTableRow from "./BookTableRow.jsx";
import BookForm from "./BookForm.jsx";

const emptyBook = {
  name: "",
  author: "",
  category: "",
  isbn: "",
  totalCopies: "1",
};

export default function BookManagement({ books, issues, onSaveBook, onDeleteBook }) {
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [form, setForm] = useState(emptyBook);

  function openAddForm() {
    setEditingBook(null);
    setForm(emptyBook);
    setShowForm(true);
  }

  function openEditForm(book) {
    setEditingBook(book);
    setForm({ ...book, totalCopies: String(book.totalCopies) });
    setShowForm(true);
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.author.trim() || Number(form.totalCopies) < 1) {
      return;
    }

    if (editingBook) {
      const borrowedCopies = issues.filter(
        (issue) => issue.bookId === editingBook.id && !issue.returnDate
      ).length;

      if (Number(form.totalCopies) < borrowedCopies) {
        alert(`At least ${borrowedCopies} total copies are needed because that many copies are currently issued.`);
        return;
      }

      onSaveBook({ ...form, id: editingBook.id, totalCopies: Number(form.totalCopies) });
    } else {
      onSaveBook({ ...form, id: Date.now(), totalCopies: Number(form.totalCopies) });
    }

    setShowForm(false);
  }

  function closeForm() {
    setShowForm(false);
  }

  return (
    <>
      <PageHeader
        title="Book Management"
        description="Add books to your catalogue and keep book records up to date."
        action={<AddBookButton onClick={openAddForm} />}
      />

      <BookCatalogue bookCount={books.length}>
        <BookTable>
          {books.length === 0 ? (
            <EmptyBookRow />
          ) : (
            books.map((book) => {
              const borrowedCopies = issues.filter(
                (issue) => issue.bookId === book.id && !issue.returnDate
              ).length;
              const availableCopies = Number(book.totalCopies) - borrowedCopies;

              return (
                <BookTableRow
                  key={book.id}
                  book={book}
                  available={availableCopies}
                  onEdit={() => openEditForm(book)}
                  onDelete={() => onDeleteBook(book)}
                />
              );
            })
          )}
        </BookTable>
      </BookCatalogue>

      {showForm && (
        <Modal
          title={editingBook ? "Edit book details" : "Add a new book"}
          subtitle="Enter the book information below."
          onClose={closeForm}
        >
          <BookForm
            form={form}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            isEditing={Boolean(editingBook)}
            onCancel={closeForm}
          />
        </Modal>
      )}
    </>
  );
}
