
const axios = require("axios").default;
const axiosErrorHandler = require("./utils/handle-axios-error");
const sqlErrorHandler = require("./utils/handle-sql-error");
const pool = require("../config/connection.database");

exports.searchBooks = async (query) => {
    const db = await pool.connect();
    console.log(query)
    const q = `SELECT * FROM livros WHERE LOWER(liv_titulo) like LOWER($1 || '%')`;
    try {
        const books = await db.query(q, [query]);
        return books.rows;
    } catch (err) {
        sqlErrorHandler(err)
    } finally {
        db.release()
    }
} 


exports.insertBook = async (book) => {
    const db = await pool.connect();
    const query = `INSERT INTO livros (liv_id, liv_id_google, liv_titulo, liv_paginas, liv_editora, liv_edicao, liv_url_imagem, liv_desc) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    const values = [book.id, book.title, book.authors, book.pages, book.publisher, book.edition, book.imageUrl, book.description];
    try {
        return await db.query(query, values, (resp, error));
    } catch (err) {
        sqlErrorHandler(err);
    } finally {
        db.release();
    }
}

exports.findBookByGoogleId = async (id) => {
    const db = await pool.connect();
    const query = `SELECT * FROM livros WHERE liv_id_google = $1`;
    try {
        const result = await db.query(query, [id]);
        return result.rows;
    } catch(e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}

exports.findBookById = async (id) => {
    const db = await pool.connect();
    const query = `SELECT * FROM livros WHERE liv_id = $1`;
    try {
        const result = await db.query(query, [id]);
        return result.rows;
    } catch(e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}

exports.updateBook = async (id, book) => {
    const db = await pool.connect();
    const query = `UPDATE livros set liv_titulo=$1, liv_autor=$2, liv_paginas=$3, liv_editora=$4 , liv_edicao=$5, liv_url_imagem=$6, liv_desc=$7 WHERE liv_id=$8`;
    try {
        return await db.query(db, [book.title, book.authors, book.pageCount, book.publisher, book.edition, book.imagePath, book.description, id]);
    } catch (e) {
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}

exports.createBook = async (googleId, title, pages, publisher, imageUrl, author, description) => {
    const db = await pool.connect();
    try {
        db.query("BEGIN")
        const query = `INSERT INTO LIVROS (LIV_ID_GOOGLE, LIV_TITULO, LIV_PAGINAS, LIV_EDITORA, LIV_URL_IMAGEM, LIV_AUTOR, LIV_DESC) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const result = await db.query(query, [googleId, title, pages, publisher, imageUrl, author, description]);
        await db.query("COMMIT");
        return result.rows;
    } catch (e) {
        await db.query("ROLLBACK");
        sqlErrorHandler(e);
    } finally {
        db.release();
    }
}