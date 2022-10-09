const pool = require("../config/connection.database");
 const sqlErrorHandler = require("./utils/handle-sql-error");

 exports.updateUser = async (id, name, email, password) => {
     const db = await pool.connect();
     try {
         db.query("BEGIN")
         const query = "UPDATE USUARIOS SET USO_NOME = $1, USO_EMAIL = $2, USO_SENHA = $3 WHERE USO_ID = $4";
         const result = await db.query(query, [name, email, password, id]);
         await db.query("COMMIT");
         return result.rows;
     } catch (e) {
         await db.query("ROLLBACK");
         sqlErrorHandler(e);
     } finally {
         db.release();
     }
 }