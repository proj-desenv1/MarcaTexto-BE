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
        const {bookId, status, initialPage, currentPage, readingTime} = req.body;
        const result = await readingBusiness.startReading(req.userId, bookId, status, initialPage || 0, currentPage, readingTime);
        resp.status(201).json(result);
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
        const updated = await readingBusiness.updateBookStatus(req.userId, bookId, currentStatus, initialPage, currentPage, readingTime);
        resp.json(updated);
    } catch(e) {
        next(e);
    }
}

exports.getReadingByBookId = async (req, resp, next) => {
    try {
        const { bookId } = req.params;
        const result = await readingBusiness.getReadingByBookId(req.userId, bookId);
        resp.json(result);
    } catch(e) {
        next(e);
    }
}

exports.getReadingByGoogleId = async (req, resp, next) => {
    try {
        const { googleId } = req.params;
        const result = await readingBusiness.getReadingByGoogleId(req.userId, googleId);
        resp.json(result);
    } catch(e) {
        next(e);
    }
}
