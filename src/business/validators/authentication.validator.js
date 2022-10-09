exports.validateFields = (email, password) => {
    if (!email && !password) {
        const err = {status: 400, msg: "One of following params must not be null: email, password"};
        throw err;
    }
}