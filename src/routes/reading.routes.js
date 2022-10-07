const express = require("express");
const readingController = require("../controllers/reading.controller");

const bookRoutes = express.Router();
const path = "/readings";

const { checkSchema } = require("express-validator")
const startReadingSchema = require("./validators/reading.route.validators")
const deleteBookSchema = require("./validators/delete-book.route.validators")

bookRoutes.get(path, readingController.getAllReadings);
bookRoutes.get(`${path}/reading`, readingController.getReadingReadings);
bookRoutes.get(`${path}/read`, readingController.getReadReadings);
bookRoutes.get(`${path}/wants-to-read`, readingController.getWantedReadings);
bookRoutes.post(path, checkSchema(startReadingSchema), readingController.startReading);
bookRoutes.delete(`${path}/:bookId`, checkSchema(deleteBookSchema), readingController.deleteReading);

module.exports = bookRoutes;