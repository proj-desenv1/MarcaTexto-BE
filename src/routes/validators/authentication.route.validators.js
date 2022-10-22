exports.loginSchema = {
    email : {
        notEmpty: true,
        errorMessage: "Valor inválido para 'email'"
    }, 
    password : {
        notEmpty: true,
        errorMessage: "Valor inválido para 'password'",
    }
}
