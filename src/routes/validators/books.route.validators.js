exports.createBookSchema = {
    googleId : {
        notEmpty: false,
        errorMessage: "Invalid value for 'googleId'"
    },
    title : {
        notEmpty: true,
        errorMessage: "Invalid value for 'title'"
    },
    pages : {
        notEmpty: true,
        errorMessage: "Invalid value for 'pages'"
    }, 
    publisher : {
        notEmpty: false,
        errorMessage: "Invalid value for 'publisher'"
    },
    imageUrl : {
        notEmpty: false,
        errorMessage: "Invalid value for 'imageUrl'"
    },
    author : {
        notEmpty: false,
        errorMessage: "Invalid value for 'author'"
    },
    description : {
        notEmpty: false,
        errorMessage: "Invalid value for 'description'"
    } 
    
}

exports.bookSearchSchema = {
    q: {
        in: ["query"],
        notEmpty: false,
    }
}