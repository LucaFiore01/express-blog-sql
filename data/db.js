const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '7arrag4n',
  database: 'express_blog'
});

connection.connect((err) => {
  if (err) {
    console.error('Errore connessione MySQL:', err.message);
    return;
  }
  console.log('Connesso a MySQL!');

})

module.exports = connection;
