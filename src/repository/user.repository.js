const pool = require("../config/connection.database");
const sqlErrorHandler = require("./utils/handle-sql-error");

exports.createUser = async (userName, userEmail, userPassword) => {
    const db = await pool.connect();
    try {
        db.query("BEGIN")
        const query = "INSERT INTO USUARIOS (USO_NOME, USO_EMAIL, USO_SENHA) VALUES ($1, $2, $3)";
        const result = await db.query(query, [userName, userEmail, userPassword]);
        await db.query("COMMIT");
        return result.rows;
    } catch (e) {
        await db.query("ROLLBACK");
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}
