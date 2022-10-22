exports.validateFields = (email, password) => {
    if (!email && !password) {
        const err = {status: 400, msg: "Um dos seguintes parâmetros não podem ser nulos: email, password"};
        throw err;
    }
}

exports.validateUser = (user) => {
    if (!user) {
        throw { status: 401, msg: "E-mail ou senha inválidos" }
    }
    return user;
}