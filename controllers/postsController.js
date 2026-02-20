const connection = require('../data/db');

function runQueryWithTimeout(sql, params, callback, timeoutMs = 5000) {
    let isHandled = false;

    const timer = setTimeout(() => {
        if (isHandled) {
            return;
        }

        isHandled = true;
        callback(new Error('Timeout query database'));
    }, timeoutMs);

    connection.query(sql, params, (err, results) => {
        if (isHandled) {
            return;
        }

        isHandled = true;
        clearTimeout(timer);
        callback(err, results);
    });
}

function index(req, res) {
    const sql = 'SELECT * FROM posts';

    runQueryWithTimeout(sql, [], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Errore nel recupero dei post dal database',
                details: err.message
            });
        }

        res.json(results);
    });
}

function show(req, res) {
    const postId = Number(req.params.id);

    if (!Number.isInteger(postId) || postId <= 0) {
        return res.status(400).json({
            error: 'ID non valido'
        });
    }

    const sql = 'SELECT * FROM posts WHERE id = ?';

    runQueryWithTimeout(sql, [postId], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Errore nel recupero del post dal database',
                details: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                error: 'Post non trovato'
            });
        }

        res.json(results[0]);
    });
}

function destroy(req, res) {
    const postId = Number(req.params.id);

    if (!Number.isInteger(postId) || postId <= 0) {
        return res.status(400).json({
            error: 'ID non valido'
        });
    }

    const sql = 'DELETE FROM posts WHERE id = ?';

    runQueryWithTimeout(sql, [postId], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Errore nell'eliminazione del post",
                details: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Post non trovato'
            });
        }

        res.sendStatus(204);
    });
}

module.exports = {
    index,
    show,
    destroy
};
