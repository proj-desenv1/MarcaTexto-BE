const express = require("express");
const bookController = require("../controllers/book.controller");

const bookRoutes = express.Router();
const path = "/books";

const { checkSchema } = require("express-validator")
const bookSearchSchema = require("./validators/books.route.validators")

bookRoutes.get(path, checkSchema(bookSearchSchema), bookController.searchBooks);

module.exports = bookRoutes;