const bookRepository = require("../repository/book.repository");
const bookValidators = require("./validators/book.validator");
const conn = require("../config/connection.database");
const { mapBook } = require("./mappers/book.mappers");

exports.searchBooks = async (query) => {
    const books = await bookRepository.searchBooks(query);
    return books.map(mapBook);
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

exports.createBook = async (title, pages, publisher, imageUrl, author, description) => {
    bookValidators.validateFields(title, pages, publisher, author, description);
    return await bookRepository.createBook(title, pages, publisher, imageUrl, author, description);
}