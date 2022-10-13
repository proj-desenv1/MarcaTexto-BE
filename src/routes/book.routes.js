const express = require("express");
const bookController = require("../controllers/book.controller");

const bookRoutes = express.Router();
const path = "/books";

const { checkSchema } = require("express-validator")
const { bookSearchSchema, createBookSchema } = require("./validators/books.route.validators")

bookRoutes.get(path, checkSchema(bookSearchSchema), bookController.searchBooks);
bookRoutes.post(path, checkSchema(createBookSchema), bookController.createBook);

module.exports = bookRoutes;