function dateDaysAgo(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dateDaysFromNow(daysAhead) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export const sampleBooks = [
  { id: 1, name: "Mathematics", author: "R. D. Sharma", category: "Education", isbn: "978-81-1234-567-8", totalCopies: 12 },
  { id: 2, name: "Wings of Fire", author: "A. P. J. Abdul Kalam", category: "Biography", isbn: "978-81-7371-146-6", totalCopies: 8 },
  { id: 3, name: "The Alchemist", author: "Paulo Coelho", category: "Fiction", isbn: "978-00-6112-241-5", totalCopies: 7 },
  { id: 4, name: "A Brief History of Time", author: "Stephen Hawking", category: "Science", isbn: "978-05-5340-380-2", totalCopies: 5 },
  { id: 5, name: "Clean Code", author: "Robert C. Martin", category: "Technology", isbn: "978-01-3215-587-6", totalCopies: 6 },
  { id: 6, name: "The Blue Umbrella", author: "Ruskin Bond", category: "Fiction", isbn: "978-81-2910-000-7", totalCopies: 4 }
];

export const sampleStudents = [
  { id: 1, studentId: "STU-1001", name: "Rahul Sharma", contact: "9876543210" },
  { id: 2, studentId: "STU-1002", name: "Priya Verma", contact: "9876501234" },
  { id: 3, studentId: "STU-1003", name: "Aman Singh", contact: "9123456780" },
  { id: 4, studentId: "STU-1004", name: "Neha Gupta", contact: "9012345678" }
];

export const sampleIssues = [
  { id: 1, studentId: "STU-1001", bookId: 1, issueDate: dateDaysAgo(16), dueDate: dateDaysAgo(5), returnDate: "" },
  { id: 2, studentId: "STU-1001", bookId: 2, issueDate: dateDaysAgo(4), dueDate: dateDaysFromNow(8), returnDate: "" },
  { id: 3, studentId: "STU-1002", bookId: 3, issueDate: dateDaysAgo(18), dueDate: dateDaysAgo(3), returnDate: "" },
  { id: 4, studentId: "STU-1003", bookId: 5, issueDate: dateDaysAgo(10), dueDate: dateDaysFromNow(5), returnDate: "" },
  { id: 5, studentId: "STU-1004", bookId: 4, issueDate: dateDaysAgo(25), dueDate: dateDaysAgo(15), returnDate: dateDaysAgo(12) }
];
