const express = require('express');
require('./data/db');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Server attivo');
});

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
