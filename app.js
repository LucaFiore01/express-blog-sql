const express = require('express');
const postsController = require('./controllers/postsController');

const app = express();
const port = 3000;

app.get('/', postsController.index);
app.get('/posts/:id', postsController.show);
app.delete('/posts/:id', postsController.destroy);

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
