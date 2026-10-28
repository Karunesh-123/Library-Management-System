export default function BookCatalogue({ children, bookCount }) {
  return (
    <section className="content-card">
      <div className="card-heading">
        <div>
          <h2>Book catalogue</h2>
          <p>{bookCount} titles registered in your library</p>
        </div>
      </div>
      {children}
    </section>
  );
}
