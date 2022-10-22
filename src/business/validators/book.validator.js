exports.validateFields = (title, pages) => {
    if (!title && !pages) {
        const err = {status: 400, msg: "One of following params must not be null: title, pages"};
        throw err;
    }
}

exports.validateBook = (book) => {
    if(!book.length) {
        return {status: 204, msg: "Book not found for given id"};
    }
}