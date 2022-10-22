const bookBusiness = require("../business/book.business")
const { validationResult } = require("express-validator")

exports.searchBooks = async(req, resp, next) => {
    try {
        validationResult(req).throw()
        const result = await bookBusiness.searchBooks(req.query.q || "");
        resp.json(result);
    } catch (error) {
        next(error);
    }
}

exports.createBook = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { googleId, title, pages, publisher, imageUrl, author, description } = req.body;
        const result = await bookBusiness.createBook(googleId, title, pages, publisher, imageUrl, author, description);
        resp.status(201).json(result);
    } catch(e) {
        next(e);
    }
}

exports.findBookById = async (req, resp, next) => {
    try {
        const { bookId } = req.params;
        const result = await bookBusiness.findBookById(bookId);
        resp.json(result);
    } catch(e) {
        next(e);
    }
}

exports.findBookByGoogleId = async (req, resp, next) => {
    try {
        const { googleId } = req.params;
        const result = await bookBusiness.findBookByGoogleId(googleId);
        const status = result.status ? result.status : 200
        resp.status(status).json(result);
    } catch(e) {
        next(e);
    }
}