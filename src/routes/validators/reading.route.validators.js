module.exports = {
    bookId : {
        isInt: true,
        optional: { options: { nullable: true } },
        errorMessage: "Invalid value for 'bookId'"
    }, 
    googleId : {
        notEmpty: false,
        errorMessage: "Invalid value for 'googleId'",
        optional: { options: { nullable: true } }
    }, 
    status : {
        notEmpty: true,
        errorMessage: "Status must not be null",
        isIn: {
            options: [["Lendo", "Lido", "Quero ler"]],
            errorMessage: "Invalid value for status. Accepted values: 'Lendo', 'Lido', 'Quero ler'"
          }
    }
}