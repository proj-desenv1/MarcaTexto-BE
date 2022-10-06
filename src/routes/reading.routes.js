const express = require("express");
const readingController = require("../controllers/reading.controller");

const bookRoutes = express.Router();
const path = "/readings";

const { checkSchema } = require("express-validator")
const startReadingSchema = require("./validators/reading.route.validators")

bookRoutes.get(path, readingController.getReadingsByUserId);
bookRoutes.post(path, checkSchema(startReadingSchema), readingController.startReading);

module.exports = bookRoutes;