exports.validateIds = (id, googleId) => {
    if (!id && !googleId) {
        const err = {status: 400, msg: "One of following params must not be null: bookId, googleId"};
        throw err;
    }
}

exports.validateStatusNotEmpty = (status) => {
    if(!status.length) {
        const err = {status: 400, msg: "No book found for current user and given book id"};
        throw err;
    }
 }

 exports.validateReading = (reading) => {
    if(!reading.length) {
        const err = {status: 404, msg: "No reading found for given id."};
        throw err;
    }
 }