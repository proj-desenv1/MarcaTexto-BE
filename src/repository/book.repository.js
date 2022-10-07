
const axios = require("axios").default;
const axiosErrorHandler = require("./utils/handle-axios-error");
const sqlErrorHandler = require("./utils/handle-sql-error");
const pool = require("../config/connection.database");
const googleApiUrl = "https://www.googleapis.com/books/v1";

exports.searchBooks = async (query) => {
    const requestUrl = `${googleApiUrl}/volumes?q=${query}&key=${process.env.GOOGLE_API_KEY}`;
    const googleResponse = await axios.get(requestUrl).catch((err) => axiosErrorHandler(err, requestUrl));
    const books = googleResponse.data.items || [];
    if(!books.length) throw {status: 404, msg: "Search did not return any book"};
    const booksResponse = {
        books: books.slice(0,10).map((book) => {
            return {
                googleId: book.id,
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors.join(", "),
                synopsis: book.volumeInfo.synopsis,
                pageCount: book.volumeInfo.pageCount,
                publisher: book.volumeInfo.publisher,
                imageUrl: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null
            };
        })
    };
    return booksResponse;
} 


exports.insertBook = async (book) => {
    const db = await pool.connect();
    const query = `INSERT INTO livros (liv_id, liv_id_google, liv_titulo, liv_paginas, liv_editora, liv_edicao, liv_url_imagem) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const values = [book.id, book.title, book.author, book.pages, book.publisher, book.edition, book.imageUrl];
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
    const query = `SELECT liv_id as id, liv_id_google as googleId, liv_titulo as title, liv_paginas as pages, liv_editora as publisher, liv_edicao as edition, liv_url_imagem as imagePath FROM livros WHERE liv_id_google = $1`;
    try {
        return await db.query(query, [id]);
    } catch(e) {
        sqlErrorHandler(err);
    } finally {
        db.release();
    }
}

exports.findBookById = async (id) => {
    const db = await pool.connect();
    const query = `SELECT liv_id as id, liv_id_google as googleId, liv_titulo as title, liv_paginas as pages, liv_editora as publisher, liv_edicao as edition, liv_url_imagem as imagePath FROM livros WHERE liv_id = $1`;
    try {
        return await db.query(query, [id]);
    } catch(e) {
        sqlErrorHandler(err);
    } finally {
        db.release();
    }
}

exports.updateBook = async (id, book) => {
    const db = await pool.connect();
    const query = `UPDATE livros set liv_titulo=$1, liv_autor=$2, liv_paginas=$3, liv_editora=$4 , liv_edicao=$5, liv_url_imagem=$6 WHERE liv_id=$7`;
    try {
        return await db.query(db, [book.title, book.author, book.pageCount, book.publisher, book.edition, book.imagePath, id]);
    } catch (e) {
        sqlErrorHandler(err);
    } finally {
        db.release();
    }
}