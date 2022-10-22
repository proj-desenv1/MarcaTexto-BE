exports.startReadingSchema = {
    bookId : {
        isInt: true,
        errorMessage: "Valor inválido para 'bookId'"
    }, 
    status : {
        notEmpty: true,
        errorMessage: "Status não pode ser nulo",
        isIn: {
            options: [["Lendo", "Lidos", "Quero ler"]],
            errorMessage: "Valor inválido para status. Valores aceitos: 'Lendo', 'Lidos', 'Quero ler'"
          }
    },
    initialPage : {
        isInt: true,
        optional: { options: {nullable: true} },
        errorMessage: "Valor inválido para 'initialPage'"
    },
    currentPage : {
        isInt: true,
        optional: { options: {nullable: true} },
        errorMessage: "Valor inválido para 'currentPage'"
    },
    readingTime : {
        optional: { options: { nullable: true } },
        matches: {
            options: (/^\d{2}:\d{2}:\d{2}$/)
        },
        errorMessage: "Tempo de leitura deve possuir o formato '00:00:00'"
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
            errorMessage: "Valor inválido para status. Valores aceitos: 'Lendo', 'Lidos', 'Quero ler'"
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
        errorMessage: "Tempo de leitura deve possuir o formato '00:00:00'"
    },
    bookId: {
        in: "params",
        isInt: true
    }
}