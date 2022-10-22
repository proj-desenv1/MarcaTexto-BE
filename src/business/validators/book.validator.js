exports.validateFields = (title, pages) => {
    if (!title && !pages) {
        const err = {status: 400, msg: "One of following params must not be null: title, pages"};
        throw err;
    }
}

exports.validateBook = (book) => {
    if(!book.length) {
        const err = {status: 404, msg: "Book not found for given id"};
        throw err;
    }
}