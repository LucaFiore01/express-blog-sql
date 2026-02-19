const express = require('express');
const connection = require('./data/db');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM posts';

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: 'Errore nel recupero dei post dal database'
      });
    }

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
