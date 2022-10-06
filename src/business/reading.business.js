const readingRepository = require("../repository/reading.repository");
const readingsMapper = require("./mappers/mapReadingsAndFilterByStatus");
const readingValidators = require("./validators/reading.validator")

exports.getReadingsByUserId = async (userId) => {
    const readings = await readingRepository.getReadingsByUserId(userId);
    return readingsMapper(readings)

}

exports.startReading = async (userId, bookId, googleId, readingStatus) => {
    readingValidators.validateIds(bookId, googleId);
    await readingRepository.startReading(userId, bookId, googleId, readingStatus);
}