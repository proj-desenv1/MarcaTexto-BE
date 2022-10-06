exports.validateIds = (id, googleId) => {
    if (!id && !googleId) {
        const err = {status: 400, msg: "One of following params must not be null: bookId, googleId"};
        throw err;
    }
}