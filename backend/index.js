const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.sqlite');

// Admin Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@gmail.com' && password === '1234') {
    res.json({ success: true, token: 'admin_token' }); // Basic token
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Middleware for basic auth
const authMiddleware = (req, res, next) => {
  if (req.headers.authorization === 'Bearer admin_token') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Get all content
app.get('/api/content', (req, res) => {
  db.all('SELECT section, data FROM content', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const content = {};
    rows.forEach(row => {
      content[row.section] = JSON.parse(row.data);
    });
    res.json(content);
  });
});

// Get specific section
app.get('/api/content/:section', (req, res) => {
  db.get('SELECT data FROM content WHERE section = ?', [req.params.section], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Section not found' });
    res.json(JSON.parse(row.data));
  });
});

// Update specific section
app.put('/api/content/:section', authMiddleware, (req, res) => {
  const data = JSON.stringify(req.body.data);
  db.run('UPDATE content SET data = ? WHERE section = ?', [data, req.params.section], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
