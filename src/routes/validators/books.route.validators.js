exports.createBookSchema = {
    googleId : {
        notEmpty: false,
        errorMessage: "Valor inválido para 'googleId'"
    },
    title : {
        notEmpty: true,
        errorMessage: "Valor inválido para 'title'"
    },
    pages : {
        notEmpty: true,
        errorMessage: "Valor inválido para 'pages'"
    }, 
    publisher : {
        notEmpty: false,
        errorMessage: "Valor inválido para 'publisher'"
    },
    imageUrl : {
        notEmpty: false,
        errorMessage: "Valor inválido para 'imageUrl'"
    },
    author : {
        notEmpty: false,
        errorMessage: "Valor inválido para 'author'"
    },
    description : {
        notEmpty: false,
        errorMessage: "Valor inválido para 'description'"
    } 
    
}

exports.bookSearchSchema = {
    q: {
        in: ["query"],
        notEmpty: false,
    }
}