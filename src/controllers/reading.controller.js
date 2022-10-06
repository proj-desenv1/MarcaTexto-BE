const { response } = require("../app");
const readingBusiness = require("../business/reading.business");
const { validationResult } = require("express-validator");

exports.getReadingsByUserId = async (req, resp, next) => {
    try {
        const readings = await readingBusiness.getReadingsByUserId(1);
        resp.json(readings);
    } catch(e) {
        next(e);
    }
}

exports.startReading = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const {bookId, googleId, status} = req.body;
        await readingBusiness.startReading(1, bookId, googleId, status);
        resp.sendStatus(201);
    } catch(e) {
        next(e);
    }
}