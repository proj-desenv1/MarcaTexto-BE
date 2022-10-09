exports.createUserSchema = {
    userName : {
        notEmpty: true,
        errorMessage: "Invalid value for 'userName'"
    }, 
    userEmail : {
        notEmpty: true,
        errorMessage: "Invalid value for 'userEmail'"
    }, 
    userPassword : {
        notEmpty: true,
        errorMessage: "Invalid value for 'userPassword'"
    }
}