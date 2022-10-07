const pool = require("../config/connection.database");
const googleApiUrl = "https://www.googleapis.com/books/v1";
const axios = require("axios").default;
const axiosErrorHandler = require("./utils/handle-axios-error");
const sqlErrorHandler = require("./utils/handle-sql-error");



exports.getReadingsByUserId = async (userId) => {
    const bd = await pool.connect();
    const query = `SELECT * from leituras ` +
    `JOIN livros on livros.liv_id = leituras.liv_id ` +
    `JOIN usuarios on usuarios.uso_id = leituras.uso_id ` +
    `LEFT JOIN classificacao on classificacao.liv_id = leituras.liv_id ` +
    `JOIN status on status.status_id = leituras.status_id ` +
    `WHERE usuarios.uso_id = $1;`;
    try {
        const result = await(bd.query(query, [userId]));
        return result.rows;
    } catch(e) {
        sqlErrorHandler(e);
    } finally {
        bd.release();
    }
}

exports.startReading = async (userId, bookId, googleId, readingStatus) => {
    const db = await pool.connect();
    let bookFk = bookId
    try {
        if (googleId) {
            db.query("BEGIN")
            const requestUrl = `${googleApiUrl}/volumes/${googleId}?key=${process.env.GOOGLE_API_KEY}`;
            const book = await axios.get(requestUrl).catch((err) => axiosErrorHandler(err, requestUrl));
            const query = `insert into livros (liv_id_google, liv_titulo, liv_autor, liv_paginas, liv_editora, liv_data, liv_url_imagem) ` +
                `values ($1, $2, $3, $4, $5, NOW(), $6) ` +
                `ON CONFLICT (liv_id_google) DO UPDATE SET ` +
                `liv_id_google = excluded.liv_id_google, ` +
                `liv_titulo = excluded.liv_titulo, ` +
                `liv_autor = excluded.liv_autor, ` +
                `liv_paginas = excluded.liv_paginas, ` +
                `liv_editora = excluded.liv_editora, ` +
                `liv_url_imagem = excluded.liv_url_imagem ` +
                `RETURNING *;`;
            const result = await db.query(query, [
                book.data.id, book.data.volumeInfo.title, book.data.volumeInfo.authors.join(", "), book.data.volumeInfo.pageCount,
                book.data.volumeInfo.publisher, book.data.volumeInfo.imageLinks ? book.data.volumeInfo.imageLinks.thumbnail : null
            ]);
            bookFk = result.rows[0].liv_id
        }
        const statusQuery = `insert into status(uso_id, liv_id, sta_livro) values ($1, $2, $3) returning status_id`
        const statusId = await db.query(statusQuery, [userId, bookFk, readingStatus]);
        const query = `insert into leituras(uso_id, liv_id, status_id, clas_id) values ($1, $2, $3, null) RETURNING *;`
        const result = await db.query(query, [userId, bookFk, statusId.rows[0].status_id]);
        await db.query("COMMIT");
        return result.rows;
    } catch (e) {
        await db.query("ROLLBACK");
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}

exports.deleteReading = async (userId, bookId) => {
    const bd = await pool.connect();
    const query = `DELETE FROM leituras CASCADE WHERE uso_id = $1 and liv_id = $2`;
    try {
        const result = await(bd.query(query, [userId, bookId]));
    } catch(e) {
        sqlErrorHandler(e);
    } finally {
        bd.release();
    }
}
