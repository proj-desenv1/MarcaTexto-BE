exports.createUserSchema = {
    name : {
        notEmpty: true,
        errorMessage: "Invalid value for 'name'"
    }, 
    email : {
        notEmpty: true,
        errorMessage: "Invalid value for 'email'"
    }, 
    password : {
        notEmpty: true,
        errorMessage: "Invalid value for 'password'"
    }
}