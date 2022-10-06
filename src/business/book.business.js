const bookRepository = require("../repository/book.repository");
const conn = require("../config/connection.database")

exports.searchBooks = async (query) => {
    const books = await bookRepository.searchBooks(query);
    return books;
}

exports.insertBook = async (book) => {
    return await bookRepository.insertBook(book);
}

exports.findBookById = async (id) => {
    return await bookRepository.findBookById(id);
}

exports.updateBook = async(id, book) => {
    return await bookRepository.updateBook(id, book);
}