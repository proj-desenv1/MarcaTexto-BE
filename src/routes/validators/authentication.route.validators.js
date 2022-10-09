exports.loginSchema = {
    email : {
        notEmpty: true,
        errorMessage: "Invalid value for 'email'"
    }, 
    password : {
        notEmpty: true,
        errorMessage: "Invalid value for 'password'",
    }
}
