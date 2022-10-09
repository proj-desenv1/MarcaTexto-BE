const e = require("express");
const pool = require("../config/connection.database");
const sqlErrorHandler = require("./utils/handle-sql-error");

exports.authUser = async (email, password) => {
    const db = await pool.connect();
    const query = "SELECT * FROM USUARIOS WHERE USO_EMAIL = $1 AND USO_SENHA = $2";
    try {
        const result = await(db.query(query, [email, password]));
        return result.rowCount;
    } catch(e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}