exports.validateFields = (title, pages, publisher, author, description) => {
    if (!title && !pages && !publisher && !author && !description) {
        const err = {status: 400, msg: "One of following params must not be null: title, pages, publisher, author, description"};
        throw err;
    }
}

exports.validateBook = (book) => {
    if(!book.length) {
        const err = {status: 404, msg: "Book not found for given id"};
        throw err;
    }
}