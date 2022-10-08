const { response } = require("../app");
const readingBusiness = require("../business/reading.business");
const { validationResult } = require("express-validator");

exports.getAllReadings = async (req, resp, next) => {
    try {
        const readings = await readingBusiness.getAllReadings(1);
        resp.json(readings);
    } catch(e) {
        next(e);
    }
}

exports.getReadingReadings = async (req, resp, next) => {
    try {
        const readings = await readingBusiness.getReadingReadings(1);
        resp.json(readings);
    } catch(e) {
        next(e);
    }
}

exports.getReadReadings = async (req, resp, next) => {
    try {
        const readings = await readingBusiness.getReadReadings(1);
        resp.json(readings);
    } catch(e) {
        next(e);
    }
}

exports.getWantedReadings = async (req, resp, next) => {
    try {
        const readings = await readingBusiness.getWantedReadings(1);
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

exports.deleteReading = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { bookId } = req.params;
        console.log(bookId)
        await readingBusiness.deleteReading(1, bookId);
        resp.sendStatus(204);
    } catch(e) {
        next(e);
    }
}

exports.updateBookStatus = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { bookId } = req.params;
        const { currentStatus, initialPage, currentPage, readingTime } = req.body;
        await readingBusiness.updateBookStatus(1, bookId, currentStatus, initialPage, currentPage, readingTime);
        resp.sendStatus(204);
    } catch(e) {
        next(e);
    }
}