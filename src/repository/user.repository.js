const pool = require("../config/connection.database");
const sqlErrorHandler = require("./utils/handle-sql-error");

exports.createUser = async (name, email, password) => {
    const db = await pool.connect();
    try {
        db.query("BEGIN")
        const query = "INSERT INTO USUARIOS (USO_NOME, USO_EMAIL, USO_SENHA) VALUES ($1, $2, $3)";
        const result = await db.query(query, [name, email, password]);
        await db.query("COMMIT");
        return result.rows;
    } catch (e) {
        await db.query("ROLLBACK");
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}
