import BookNameField from "./BookNameField.jsx";
import BookAuthorField from "./BookAuthorField.jsx";
import BookCategoryField from "./BookCategoryField.jsx";
import BookIsbnField from "./BookIsbnField.jsx";
import BookTotalCopiesField from "./BookTotalCopiesField.jsx";

export default function BookFormFields({ form, onChange }) {
  return (
    <>
      <BookNameField value={form.name} onChange={onChange} />
      <BookAuthorField value={form.author} onChange={onChange} />
      <BookCategoryField value={form.category} onChange={onChange} />
      <BookIsbnField value={form.isbn} onChange={onChange} />
      <BookTotalCopiesField value={form.totalCopies} onChange={onChange} />
    </>
  );
}
