const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT || 5000);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.DB_NAME || 'library_management';
const allowedCollections = new Set(['books', 'students', 'issues']);
app.use(cors({ origin: true }));
app.use(express.json({ limit: '1mb' }));

const client = new MongoClient(MONGO_URI);
let db;

app.get('/api/health', async (_req, res) => {
  try {
    await db.command({ ping: 1 });
    res.json({ message: 'Backend is running', database: DB_NAME, mongo: 'connected' });
  } catch (error) {
    res.status(503).json({ message: 'Database unavailable', error: error.message });
  }
});
app.get('/api/:resource', async (req, res, next) => {
  try {
    const { resource } = req.params;
    if (!allowedCollections.has(resource)) return res.status(404).json({ message: 'Unknown resource' });
    const docs = await db.collection(resource).find({}).toArray();
    res.json(docs.map(({ _id, ...doc }) => doc));
  } catch (error) { next(error); }
});
app.put('/api/:resource/:id', async (req, res, next) => {
  try {
    const { resource, id } = req.params;
    if (!allowedCollections.has(resource)) return res.status(404).json({ message: 'Unknown resource' });
    const body = req.body || {};
    if (String(body.id) !== String(id)) return res.status(400).json({ message: 'URL id and body id must match' });
    const { _id, ...document } = body;
    await db.collection(resource).updateOne({ id: document.id }, { $set: document }, { upsert: true });
    res.json({ message: 'Saved successfully', item: document });
  } catch (error) { next(error); }
});
app.post('/api/:resource', async (req, res, next) => {
  try {
    const { resource } = req.params;
    if (!allowedCollections.has(resource)) return res.status(404).json({ message: 'Unknown resource' });
    const document = req.body || {};
    if (document.id === undefined || document.id === null) return res.status(400).json({ message: 'An id is required' });
    const { _id, ...clean } = document;
    await db.collection(resource).updateOne({ id: clean.id }, { $set: clean }, { upsert: true });
    res.status(201).json(clean);
  } catch (error) { next(error); }
});
app.delete('/api/:resource/:id', async (req, res, next) => {
  try {
    const { resource, id } = req.params;
    if (!allowedCollections.has(resource)) return res.status(404).json({ message: 'Unknown resource' });
    const numericId = /^-?\d+$/.test(id) ? Number(id) : id;
    const result = await db.collection(resource).deleteOne({ id: numericId });
    res.json({ message: 'Deleted successfully', deleted: result.deletedCount > 0 });
  } catch (error) { next(error); }
});
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Server error', error: error.message });
});

async function start() {
  try {
    await client.connect();
    db = client.db(DB_NAME);
    await db.command({ ping: 1 });
    console.log(`MongoDB connected: ${DB_NAME}`);
    app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
    console.error('Check that MongoDB Server is running and MONGO_URI is correct.');
    process.exit(1);
  }
}
start();
