exports.validateFields = (title, pages, publisher, author, description) => {
    if (!title && !pages && !publisher && !author && !description) {
        const err = {status: 400, msg: "One of following params must not be null: title, pages, publisher, author, description"};
        throw err;
    }
}
