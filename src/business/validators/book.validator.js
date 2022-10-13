exports.validateFields = (title, pages, publisher, author) => {
    if (!title && !pages && !publisher && !author) {
        const err = {status: 400, msg: "One of following params must not be null: title, pages, publisher, author"};
        throw err;
    }
}
