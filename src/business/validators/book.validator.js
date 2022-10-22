exports.validateFields = (title, pages) => {
    if (!title && !pages) {
        const err = { status: 400, msg: "Um dos seguintes parâmetros não podem ser nulos: title, pages" };
        throw err;
    }
}

exports.validateBook = (book) => {
    if(!book.length) {
        const err = { status: 404, msg: "Livro não encontrado" };
        throw err;
    }
}