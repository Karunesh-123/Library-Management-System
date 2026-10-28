export default function BookCategoryCell({ category }) {
  return <td><span className="category-pill">{category || "General"}</span></td>;
}
