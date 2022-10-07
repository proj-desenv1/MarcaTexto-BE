const readingRepository = require("../repository/reading.repository");
const readingsMapper = require("./mappers/mapReadingsAndFilterByStatus");
const readingValidators = require("./validators/reading.validator")

exports.getAllReadings = async (userId) => {
    const readings = await readingRepository.getReadingsByUserId(userId);
    return readingsMapper(readings)
}

exports.getReadingReadings = async (userId) => {
    const readings = await readingRepository.getReadingsByUserId(userId);
    return readingsMapper(readings).reading
}

exports.getReadReadings = async (userId) => {
    const readings = await readingRepository.getReadingsByUserId(userId);
    return readingsMapper(readings).read
}

exports.getWantedReadings = async (userId) => {
    const readings = await readingRepository.getReadingsByUserId(userId);
    return readingsMapper(readings).wantsToRead
}

exports.startReading = async (userId, bookId, googleId, readingStatus) => {
    readingValidators.validateIds(bookId, googleId);
    await readingRepository.startReading(userId, bookId, googleId, readingStatus);
}

exports.deleteReading = async (userId, bookId) => {
    await readingRepository.deleteReading(userId, bookId);
}