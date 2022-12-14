exports.createUserSchema = {
    name : {
        notEmpty: true,
        errorMessage: "Valor inválido para 'name'"
    }, 
    email : {
        notEmpty: true,
        errorMessage: "Valor inválido para 'email'"
    }, 
    password : {
        notEmpty: true,
        errorMessage: "Valor inválido para 'password'"
    }
}

exports.updateUserSchema = {
    id : {
        in: "params",
        isInt: true
    },
    name : {
        notEmpty: true,
        errorMessage: "Valor inválido para 'name'",
        optional: { options: {nullable: true} }
    }, 
    email : {
        notEmpty: true,
        errorMessage: "Valor inválido para 'email'",
        optional: { options: {nullable: true} }
    }, 
    password : {
        notEmpty: true,
        errorMessage: "Valor inválido para 'password'",
        optional: { options: {nullable: true} }
    }
}

exports.getUserSchema = {
    id : {
        in: "params",
        isInt: true
    }
}

exports.resetPasswordSchema = {
    email: {
        in: "body",
        notEmpty: true,
        errorMessage: "Valor inválido para 'email'"
    }
}
