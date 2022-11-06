exports.validateFields = (title, pages) => {
    if (!title && !pages) {
        const err = { status: 400, msg: "Um dos seguintes parâmetros não podem ser nulos: title, pages" };
        throw err;
    }
}

exports.validateBook = (book) => {
    if(!book.length) {
        return { status: 204, msg: "Livro não encontrado" };
    }
}