exports.createBookSchema = {
    title : {
        notEmpty: true,
        errorMessage: "Invalid value for 'title'"
    },
    pages : {
        notEmpty: true,
        errorMessage: "Invalid value for 'pages'"
    }, 
    publisher : {
        notEmpty: true,
        errorMessage: "Invalid value for 'publisher'"
    },
    imageUrl : {
        notEmpty: false,
        errorMessage: "Invalid value for 'imageUrl'"
    },
    author : {
        notEmpty: true,
        errorMessage: "Invalid value for 'author'"
    } 
    
}

exports.bookSearchSchema = {
    q: {
        in: ["query"],
        notEmpty: true,
        errorMessage: "Param must not be null"
    }
}