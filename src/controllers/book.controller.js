const bookBusiness = require("../business/book.business")
const { validationResult } = require("express-validator")

exports.searchBooks = async(req, resp, next) => {
    try {
        validationResult(req).throw()
        const result = await bookBusiness.searchBooks(req.query.q);
        resp.json(result);
    } catch (error) {
        next(error);
    }
}