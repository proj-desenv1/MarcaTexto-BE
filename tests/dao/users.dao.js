const pool = require("../../src/config/connection.database");
const sqlErrorHandler = require("../../src/repository/utils/handle-sql-error");

exports.findUserByEmail = async (email) => {
    const db = await pool.connect();
    const query = "SELECT * FROM USUARIOS WHERE USO_EMAIL = $1";
    try {
        const result = await(db.query(query, [email]));
        if (result.rowCount > 0) {
            return result.rows[0];
        }
    } catch(e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}

exports.deleteUser = async (id) => {
    const db = await pool.connect();
    try {
        const query = "DELETE FROM USUARIOS WHERE USO_ID = $1";
        await db.query(query, [id]);
    } catch (e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}