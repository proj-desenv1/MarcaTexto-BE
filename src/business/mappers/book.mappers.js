exports.mapBook = (book) => {
    return {
        googleId: book.liv_id,
        title: book.liv_titulo,
        authors: book.liv_autor,
        description: book.liv_desc,
        pageCount: book.liv_paginas,
        publisher: book.liv_editora,
        imageUrl: book.liv_url_imagem
    };
}