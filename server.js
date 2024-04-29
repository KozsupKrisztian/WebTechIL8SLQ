const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Statikus fájlok szolgáltatása
app.use(express.static('public'));


// Főoldal megjelenítése
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} címen.`);
});
