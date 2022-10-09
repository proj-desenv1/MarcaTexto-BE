const pool = require("../config/connection.database");
const sqlErrorHandler = require("./utils/handle-sql-error");

exports.findUserById = async (id) => {
    const db = await pool.connect();
    const query = "SELECT * FROM USUARIOS WHERE USO_ID = $1";
    try {
        const result = await db.query(query, [id]);
        return result.rows;
    } catch (e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}

exports.updateUser = async (id, name, email, password) => {
    const db = await pool.connect();
    try {
        const query = "UPDATE USUARIOS SET USO_NOME = $1, USO_EMAIL = $2, USO_SENHA = $3 WHERE USO_ID = $4";
        await db.query(query, [name, email, password, id]);
    } catch (e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}