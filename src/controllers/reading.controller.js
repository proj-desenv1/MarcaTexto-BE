const readingBusiness = require("../business/reading.business");
const { validationResult } = require("express-validator");

exports.getAllReadings = async (req, resp, next) => {
    try {
        const readings = await readingBusiness.getAllReadings(req.userId);
        resp.json(readings);
    } catch(e) {
        next(e);
    }
}

exports.getReadingReadings = async (req, resp, next) => {
    try {
        const readings = await readingBusiness.getReadingReadings(req.userId);
        resp.json(readings);
    } catch(e) {
        next(e);
    }
}

exports.getReadReadings = async (req, resp, next) => {
    try {
        const readings = await readingBusiness.getReadReadings(req.userId);
        resp.json(readings);
    } catch(e) {
        next(e);
    }
}

exports.getWantedReadings = async (req, resp, next) => {
    try {
        const readings = await readingBusiness.getWantedReadings(req.userId);
        resp.json(readings);
    } catch(e) {
        next(e);
    }
}

exports.startReading = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const {bookId, googleId, status} = req.body;
        await readingBusiness.startReading(req.userId, bookId, googleId, status);
        resp.sendStatus(201);
    } catch(e) {
        next(e);
    }
}

exports.deleteReading = async (req, resp, next) => {
    try {
        validationResult(req).throw()
        const { bookId } = req.params;
        await readingBusiness.deleteReading(req.userId, bookId);
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
        await readingBusiness.updateBookStatus(req.userId, bookId, currentStatus, initialPage, currentPage, readingTime);
        resp.sendStatus(204);
    } catch(e) {
        next(e);
    }
}