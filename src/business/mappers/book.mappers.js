exports.mapBook = (book) => {
    return {
        id: book.liv_id,
        googleId: book.liv_id_google,
        title: book.liv_titulo,
        authors: book.liv_autor,
        description: book.liv_desc,
        pageCount: book.liv_paginas,
        publisher: book.liv_editora,
        imageUrl: book.liv_url_imagem
    };
}