import { useState } from "react";
import PageHeader from "./PageHeader.jsx";
import { getToday } from "../utils.js";

export default function BookAvailability({ books, issues }) {
  const [searchType, setSearchType] = useState("name");
  const [searchText, setSearchText] = useState("");

  // First filter books by name or author, then calculate available copies.
  const filteredBooks = books
    .filter((book) => {
      const value = searchType === "name" ? book.name : book.author;
      return value.toLowerCase().includes(searchText.toLowerCase());
    })
    .map((book) => {
      const issuedCopies = issues.filter(
        (issue) => issue.bookId === book.id && !issue.returnDate
      ).length;

      return {
        ...book,
        available: Number(book.totalCopies) - issuedCopies,
      };
    });

  return (
    <>
      <PageHeader
        title="Book Availability"
        description="Search by book name or author to check stock availability."
      />

      <section className="content-card availability-search-card">
        <div className="availability-intro">
          <div className="search-emblem">⌕</div>
          <div>
            <h2>Find a book in the library</h2>
            <p>Search by book name or author name.</p>
          </div>
        </div>

        <div className="availability-controls">
          <div className="segmented-control">
            <button
              type="button"
              className={searchType === "name" ? "selected" : ""}
              onClick={() => setSearchType("name")}
            >
              Book name
            </button>
            <button
              type="button"
              className={searchType === "author" ? "selected" : ""}
              onClick={() => setSearchType("author")}
            >
              Author
            </button>
          </div>

          <label className="search-field wide-search">
            <span>⌕</span>
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder={
                searchType === "name"
                  ? "Search book name..."
                  : "Search author name..."
              }
            />
          </label>
        </div>
      </section>

      <section className="content-card">
        <div className="card-heading">
          <div>
            <h2>Search results</h2>
            <p>
              {searchText
                ? `${filteredBooks.length} matching book record(s)`
                : "Showing all book titles and their availability"}
            </p>
          </div>
          <span className="date-chip">{getToday()}</span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>BOOK NAME</th>
                <th>AUTHOR</th>
                <th>AVAILABILITY</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="3">
                    <div className="empty-state">
                      No book matches this search.
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <div className="book-cell">
                        <span className="book-cover">
                          {book.name.charAt(0).toUpperCase()}
                        </span>
                        <div className="table-primary">{book.name}</div>
                      </div>
                    </td>
                    <td>{book.author}</td>
                    <td>
                      <span
                        className={`availability-pill ${
                          book.available > 0 ? "in-stock" : "out-stock"
                        }`}
                      >
                        <span />
                        {book.available > 0
                          ? `${book.available} in stock`
                          : "Out of stock"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
