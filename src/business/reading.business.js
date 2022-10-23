const { Result } = require("express-validator");
const readingRepository = require("../repository/reading.repository");
const readingsMapper = require("./mappers/reading.mappers");
const readingValidators = require("./validators/reading.validator");

exports.getAllReadings = async (userId) => {
    const readings = await readingRepository.getReadingsByUserId(userId);
    return readingsMapper.mapReadingsAndFilterByStatus(readings);
}

exports.getReadingReadings = async (userId) => {
    const readings = await readingRepository.getReadingsByUserId(userId);
    return readingsMapper.mapReadingsAndFilterByStatus(readings).reading;
}

exports.getReadReadings = async (userId) => {
    const readings = await readingRepository.getReadingsByUserId(userId);
    return readingsMapper.mapReadingsAndFilterByStatus(readings).read;
}

exports.getWantedReadings = async (userId) => {
    const readings = await readingRepository.getReadingsByUserId(userId);
    return readingsMapper.mapReadingsAndFilterByStatus(readings).wantsToRead;
}

exports.startReading = async (userId, bookId, readingStatus, initialPage, currentPage, readingTime) => {
    
    const reading = await readingRepository.startReading(userId, bookId, readingStatus, initialPage, currentPage, readingTime);
    
    const result = await readingRepository.findReadingByBookId(userId, reading.liv_id);

    return readingsMapper.mapReadings(result)[0];
}

exports.deleteReading = async (userId, bookId) => {
    await readingRepository.deleteReading(userId, bookId);
}

exports.updateBookStatus = async (userId, bookId, currentStatus, initialPage, currentPage, readingTime) => {
    const bookStatus = await readingRepository.getStatusByBookId(userId, bookId);
    readingValidators.validateStatusNotEmpty(bookStatus);
    const mappedStatus = readingsMapper.mapStatus(bookStatus[0]);
    await readingRepository.updateBookStatus(
        bookStatus[0].status_id,
        currentStatus || mappedStatus.currentStatus,
        initialPage || mappedStatus.initialPage,
        currentPage || mappedStatus.currentPage,
        readingTime || mappedStatus.readingTime
    );
    const updated = await readingRepository.findReadingByBookId(userId, bookId);
    return readingsMapper.mapReadings(updated)[0];
}

exports.getReadingByBookId = async (userId, bookId) => {
    const result = await readingRepository.findReadingByBookId(userId, bookId);
    readingValidators.validateReading(result);
    return readingsMapper.mapReadings(result)[0];
}

exports.getReadingByGoogleId = async (userId, googleId) => {
    const result = await readingRepository.findReadingByGoogleId(userId, googleId);
    readingValidators.validateReading(result);
    return readingsMapper.mapReadings(result)[0];
}