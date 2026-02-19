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

app.delete('/posts/:id', (req, res) => {
  const postId = Number(req.params.id);

  if (!Number.isInteger(postId) || postId <= 0) {
    return res.status(400).json({
      error: 'ID non valido'
    });
  }

  const sql = 'DELETE FROM posts WHERE id = ?';

  connection.query(sql, [postId], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Errore nell'eliminazione del post"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Post non trovato'
      });
    }

    res.json({
      message: 'Post eliminato con successo'
    });
  });
});

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
