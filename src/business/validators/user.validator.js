exports.validateFields = (name, email, password) => {
    if (!name && !email && !password) {
        const err = {status: 400, msg: "One of following params must not be null: name, email, password"};
        throw err;
    }
}
