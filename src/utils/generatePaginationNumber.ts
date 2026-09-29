
export const generatePaginationNumber = ( currentPage: number, totalPages: number ) => {
    //Si el numero total de paginas es 7 o menos
    //Vamos a mostrar todas las paginas sin puntos suspensivos.

    if ( totalPages <= 7 ){
        return Array.from({ length: totalPages }, (_,i) => i + 1);
    }

    // Si la página actual está entre las primeras 3 páginas
    // Mostrar las primeras 3, puntos suspensivos y las últimas 2

    if ( currentPage <= 3 ){
        return [1,2,3,'...', totalPages -1, totalPages]; // [1, 2, 3, '...', 49, 50]
    }

    // Si la pagina actual esta entre las 3 ultimas
    // mostrar las primeras 2, puntos suspensivos, las últimas 3 páginas.
    if( currentPage >= totalPages -2 ){
        return [1, 2, '...', totalPages -2 , totalPages -1, totalPages] //[1, 2, '...', 48, 49, 50]
    }

    // Si la página actual esta en otro lugar medio
    // mostrar la primera página, puntos suspensivos, la pagina actual y vecinos
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
    ];
}