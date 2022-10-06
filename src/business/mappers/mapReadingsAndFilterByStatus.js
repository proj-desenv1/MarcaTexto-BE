module.exports = (readings) => {
    const mappedReadings = readings.map((r) => {
        return {
            book: {
                id: r.liv_id,
                googleId: r.liv_id_google || null,
                title: r.liv_titulo,
                author: r.liv_autor,
                pages: r.liv_paginas,
                publisher: r.liv_editora,
                edition: r.liv_ediacao,
                imageUrl: r.liv_nm_arquivo,
                rating: r.clas_livro || null
            },
            readingStatus : {
                currentStatus: r.sta_livro,
                initialPage: r.sta_pag_inicio,
                currentPage: r.sta_pag_atual,
                readingTime: r.sta_temp_leitura
            },
            readingObservation: r.obs_leitura
        }
    });
    return {
        reading: mappedReadings.filter((r) => r.readingStatus.currentStatus.trim() == "Lendo"),
        read: mappedReadings.filter((r) => r.readingStatus.currentStatus.trim() == "Lido"),
        wantsToRead: mappedReadings.filter((r) => r.readingStatus.currentStatus.trim() == "Quero ler"),
    };
}