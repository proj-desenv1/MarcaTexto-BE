const bookRepository = require("../repository/book.repository");
const bookValidators = require("./validators/book.validator");
const { mapBook } = require("./mappers/book.mappers");
const { stringToArray } = require("./utils/convert-array");

exports.searchBooks = async (query) => {
    const books = await bookRepository.searchBooks(query);
    return books.map(mapBook);
}

exports.insertBook = async (book) => {
    return await bookRepository.insertBook(book);
}

exports.findBookById = async (id) => {
    const result = await bookRepository.findBookById(id);
    bookValidators.validateBook(result);
    return await mapBook(result[0]);
}


exports.findBookByGoogleId = async (id) => {
    const result = await bookRepository.findBookByGoogleId(id);
    const validated = bookValidators.validateBook(result);
    return validated || await mapBook(result[0]);
}

exports.updateBook = async(id, book) => {
    return await bookRepository.updateBook(id, book);
}

exports.createBook = async (googleId, title, pages, publisher, imageUrl, author, description) => {
    bookValidators.validateFields(title, pages);
    return await bookRepository.createBook(googleId, title, pages, publisher, imageUrl, stringToArray(author), description);
}