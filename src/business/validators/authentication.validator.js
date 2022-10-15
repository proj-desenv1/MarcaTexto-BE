exports.validateFields = (email, password) => {
    if (!email && !password) {
        const err = {status: 400, msg: "One of following params must not be null: email, password"};
        throw err;
    }
}

exports.validateUser = (user) => {
    if (!user) {
        throw { status: 401, msg: "Invalid e-mail or password" }
    }
    return user
}