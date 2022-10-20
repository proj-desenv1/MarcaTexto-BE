const pool = require("../../src/config/connection.database");
const sqlErrorHandler = require("../../src/repository/utils/handle-sql-error");

exports.deleteBook = async (id) => {
    const db = await pool.connect();
    try {
        const query = "DELETE FROM LIVROS WHERE LIV_ID = $1";
        await db.query(query, [id]);
    } catch (e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}