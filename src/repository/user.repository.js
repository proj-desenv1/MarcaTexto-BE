const pool = require("../config/connection.database");
const sqlErrorHandler = require("./utils/handle-sql-error");

exports.findUserById = async (id) => {
    const db = await pool.connect();
    const query = "SELECT * FROM USUARIOS WHERE USO_ID = $1";
    try {
        const result = await db.query(query, [id]);
        return result.rowCount;
    } catch (e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}

exports.deleteUser = async (id) => {
    const db = await pool.connect();
    try {
        const query = "DELETE FROM USUARIOS CASCADE WHERE USO_ID = $1";
        await db.query(query, [id]);
    } catch (e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}