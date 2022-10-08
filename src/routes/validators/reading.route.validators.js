exports.startReadingSchema = {
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
            options: [["Lendo", "Lidos", "Quero ler"]],
            errorMessage: "Invalid value for status. Accepted values: 'Lendo', 'Lidos', 'Quero ler'"
          }
    }
}

exports.deleteBookSchema = {
    bookId : {
        in: "params",
        isInt: true
    }
}

exports.updateBookStatusSchema = {
    currentStatus: {
        isIn: {
            options: [["Lendo", "Lidos", "Quero ler"]],
            errorMessage: "Invalid value for status. Accepted values: 'Lendo', 'Lidos', 'Quero ler'"
          },
        optional: { options: { nullable: true } },
    },
    initialPage: {
        isInt: true,
        optional: { options: { nullable: true } }
    },
    currentPage: {
        isInt: true,
        optional: { options: { nullable: true } }
    },
    readingTime: {
        optional: { options: { nullable: true } },
        matches: {
            options: (/^\d{2}:\d{2}:\d{2}$/)
        },
        errorMessage: "Reading time must be in format '00:00:00'"
    },
    bookId: {
        in: "params",
        isInt: true
    }
}