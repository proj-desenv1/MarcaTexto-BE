exports.loginSchema = {
    email : {
        notEmpty: false,
        errorMessage: "Invalid value for 'email'"
    }, 
    password : {
        notEmpty: false,
        errorMessage: "Invalid value for 'password'",
    }
}