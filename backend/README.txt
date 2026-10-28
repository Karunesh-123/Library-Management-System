LIBRARY MANAGEMENT SYSTEM BACKEND

1. Open VS Code terminal in the backend folder.
2. Run: npm init -y
3. Run: npm install express mongodb dotenv cors
4. Run: node server.js
5. Test: http://localhost:5000/api/health

Endpoints:
GET    /api/books
POST   /api/books
PUT    /api/books/:id
DELETE /api/books/:id
GET    /api/students
POST   /api/students
PUT    /api/students/:id
DELETE /api/students/:id
GET    /api/issues
POST   /api/issues
PUT    /api/issues/:id
DELETE /api/issues/:id

JSON fields should match existing frontend data:
Book: {"name":"Example","author":"Author","category":"Fiction","isbn":"123","totalCopies":5}
Student: {"studentId":"STU-1005","name":"Name","contact":"9876543210"}
Issue: {"studentId":"STU-1001","bookId":1,"issueDate":"2026-10-28","dueDate":"2026-11-11","returnDate":""}

IMPORTANT: Existing frontend currently uses localStorage. These APIs are ready, but React frontend must still be wired to these endpoints before the UI saves data to MongoDB.
