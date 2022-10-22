exports.validateIds = (id, googleId) => {
    if (!id && !googleId) {
        const err = { status: 400, msg: "Um dos seguintes parâmetros não podem ser nulos: bookId, googleId" };
        throw err;
    }
}

exports.validateStatusNotEmpty = (status) => {
    if(!status.length) {
        const err = { status: 400, msg: "Livro não encontrado para o usuário" };
        throw err;
    }
 }

 exports.validateReading = (reading) => {
    if(!reading.length) {
        const err = { status: 404, msg: "Leitura não encontrada para o livro selecionado" };
        throw err;
    }
 }