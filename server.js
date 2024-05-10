const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 - Oldal nem található
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'errors', '404.html'));
});

// Globális hibakezelés
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, 'errors', '500.html'));
});

app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} címen.`);
});
