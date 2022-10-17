exports.mapReadingsAndFilterByStatus = (readings) => {
    const mappedReadings = readings.map((r) => {
        return {
            book: {
                id: r.liv_id,
                googleId: r.liv_id_google || null,
                title: r.liv_titulo,
                description: r.liv_desc,
                authors: r.liv_autor,
                pages: r.liv_paginas,
                publisher: r.liv_editora,
                edition: r.liv_ediacao,
                imageUrl: r.liv_url_imagem,
                rating: r.clas_livro || null
            },
            readingStatus : this.mapStatus(r),
            readingObservation: r.obs_leitura
        }
    });
    return {
        reading: mappedReadings.filter((r) => r.readingStatus.currentStatus.trim() == "Lendo"),
        read: mappedReadings.filter((r) => r.readingStatus.currentStatus.trim() == "Lidos"),
        wantsToRead: mappedReadings.filter((r) => r.readingStatus.currentStatus.trim() == "Quero ler"),
    };
}

exports.mapStatus = (status) => {
    return {
        currentStatus: status.sta_livro.trim(),
        initialPage: status.sta_pag_inicio,
        currentPage: status.sta_pag_atual || 0,
        readingTime: status.sta_temp_leitura || "00:00:00"
    }
}