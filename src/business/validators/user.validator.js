exports.validateFields = (name, email, password) => {
    if (!name && !email && !password) {
        const err = {status: 400, msg: "One of following params must not be null: name, email, password" };
        throw err;
    }
}

exports.validateUser = (user) => {
    if (user !== 1) {
        throw { status: 404, msg: "No user found for given id" };
    }
}

exports.validateEmail = (userEmail) => {
    if (userEmail === 1) {
        throw { status: 400, msg: "Unidentified error" };
    }
}