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

exports.findReadingByBookId = async (userId, bookId) => {
    const bd = await pool.connect();
    const query = `SELECT * from leituras ` +
    `JOIN livros on livros.liv_id = leituras.liv_id ` +
    `JOIN usuarios on usuarios.uso_id = leituras.uso_id ` +
    `LEFT JOIN classificacao on classificacao.liv_id = leituras.liv_id ` +
    `JOIN status on status.status_id = leituras.status_id ` +
    `WHERE leituras.uso_id = $1 AND leituras.liv_id = $2;`;
    try {
        const result = await(bd.query(query, [userId, bookId]));
        return result.rows;
    } catch(e) {
        sqlErrorHandler(e);
    } finally {
        bd.release();
    }
}

exports.findReadingByGoogleId = async (userId, googleId) => {
    const bd = await pool.connect();
    const query = `SELECT * from leituras ` +
    `JOIN livros on livros.liv_id = leituras.liv_id ` +
    `JOIN usuarios on usuarios.uso_id = leituras.uso_id ` +
    `LEFT JOIN classificacao on classificacao.liv_id = leituras.liv_id ` +
    `JOIN status on status.status_id = leituras.status_id ` +
    `WHERE leituras.uso_id = $1 AND livros.liv_id_google = $2;`;
    try {
        const result = await(bd.query(query, [userId, googleId]));
        return result.rows;
    } catch(e) {
        sqlErrorHandler(e);
    } finally {
        bd.release();
    }
}

exports.startReading = async (userId, bookId, readingStatus, initialPage, currentPage, readingTime) => {
    const db = await pool.connect();
    try {
        await db.query("BEGIN")
        const statusQuery = `insert into status(uso_id, liv_id, sta_livro, sta_pag_inicio, sta_pag_atual, sta_temp_leitura) values ($1, $2, $3, $4, $5, $6) returning status_id`
        const statusId = await db.query(statusQuery, [userId, bookId, readingStatus, initialPage, currentPage, readingTime]);
        const query = `insert into leituras(uso_id, liv_id, status_id, clas_id) values ($1, $2, $3, null) RETURNING *;`
        const result = await db.query(query, [userId, bookId, statusId.rows[0].status_id]);
        await db.query("COMMIT");
        return result.rows[0];
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

exports.getStatusByBookId = async (userId, bookId) => {
    const bd = await pool.connect();
    const query = `SELECT * FROM status WHERE uso_id = $1 AND liv_id = $2`;
    try {
        const result = await(bd.query(query, [userId, bookId]));
        return result.rows;
    } catch(e) {
        sqlErrorHandler(e);
    } finally {
        bd.release();
    }
}

exports.updateBookStatus = async (statusId, status, initialPage, currentPage, readingTime) => {
    const bd = await pool.connect();
    const query = `UPDATE status SET sta_livro = $1, sta_pag_inicio = $2, sta_pag_atual = $3, sta_temp_leitura = $4 WHERE status_id = $5`;
    try {
        await(bd.query(query, [status, initialPage, currentPage, readingTime, statusId]));
    } catch(e) {
        sqlErrorHandler(e);
    } finally {
        bd.release();
    }
}