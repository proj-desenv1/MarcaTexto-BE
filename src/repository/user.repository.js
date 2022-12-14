const pool = require("../config/connection.database");
const sqlErrorHandler = require("./utils/handle-sql-error");

exports.checkUserExists = async (id) => {
    const db = await pool.connect();
    const query = "SELECT USO_ID, USO_NOME, USO_EMAIL, USO_SENHA FROM USUARIOS WHERE USO_ID = $1";
    try {
        const result = await db.query(query, [id]);
        if (result.rowCount > 0) {
            return result.rows[0];
        }
    } catch (e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}

exports.checkEmailExists = async (email) => {
    const db = await pool.connect();
    const query = "SELECT * FROM USUARIOS WHERE USO_EMAIL = $1";
    try {
        const result = await db.query(query, [email]);
        return result.rowCount;
    } catch (e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}

exports.findUserByEmail = async (email) => {
    const db = await pool.connect();
    const query = "SELECT * FROM USUARIOS WHERE USO_EMAIL = $1";
    try {
        const result = await db.query(query, [email]);
        return result.rows[0] || null;
    } catch (e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}

exports.findUserById = async (id) => {
    const db = await pool.connect();
    const query = "SELECT USO_ID, USO_NOME, USO_EMAIL FROM USUARIOS WHERE USO_ID = $1";
    try {
        const result = await db.query(query, [id]);
        return result.rows;
    } catch (e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}

exports.createUser = async (name, email, password) => {
    const db = await pool.connect();
    try {
        db.query("BEGIN")
        const query = `INSERT INTO USUARIOS (USO_NOME, USO_EMAIL, USO_SENHA) 
                       VALUES ($1, $2, $3) 
                       RETURNING USO_ID, USO_NOME, USO_EMAIL`;
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

exports.updateUser = async (id, name, email, password) => {
    const db = await pool.connect();
    try {
        const query = `UPDATE USUARIOS SET USO_NOME = $1, USO_EMAIL = $2, USO_SENHA = $3
                       WHERE USO_ID = $4
                       RETURNING USO_ID, USO_NOME, USO_EMAIL`;
        const result = await db.query(query, [name, email, password, id]);
        return result.rows;
    } catch (e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}

exports.deleteUser = async (id) => {
    const db = await pool.connect();
    const readingsQuery = "DELETE FROM LEITURAS CASCADE WHERE USO_ID = $1";
    const statusQuery = "DELETE FROM STATUS CASCADE WHERE USO_ID = $1";
    const userQuery = "DELETE FROM USUARIOS CASCADE WHERE USO_ID = $1";
    try {
        await db.query(readingsQuery, [id]);
        await db.query(statusQuery, [id]);
        await db.query(userQuery, [id]);
    } catch (e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}
