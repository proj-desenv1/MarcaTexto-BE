exports.validateFields = (name, email, password) => {
    if (!name && !email && !password) {
        const err = { status: 400, msg: "Um dos seguintes parâmetros não podem ser nulos: name, email, password" };
        throw err;
    }
}

exports.validateUser = (user) => {
    if (!user) {
        const err = { status: 404, msg: "Usuário não encontrado" };
        throw err;
    }
    return user;
}

exports.validateEmail = (userEmail) => {
    if (userEmail === 1) {
        const err = { status: 400, msg: "Não foi possível completar o cadastro" };
        throw err;
    }
}