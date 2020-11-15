export enum TYPERESPONSECODE {
    SinError = 0,
    ConError = -1
}


export enum TYPEHTMLCODE {
    Continue = 100, // El navegador puede continuar realizando su petición (se utiliza para indicar que la primera parte de la petición del navegador se ha recibido correctamente).
    ProcessOk = 200, // Respuesta estándar para peticiones correctas.
    NoContent = 204, // La petición se ha completado con éxito pero su respuesta no tiene ningún contenido (la respuesta puede incluir información en sus cabeceras HTTP).
    BadRequest = 400, // El servidor no procesará la solicitud, porque no puede, o no debe, debido a algo que es percibido como un error del cliente.
    Unauthorized = 401, // La solicitud fue legal, pero el servidor rehúsa responderla dado que el cliente no tiene los privilegios para hacerla. Se usa cuando la autentificación es posible pero ha fallado o aún no ha sido provista.
    NotFound = 404, // Recurso no encontrado. Se utiliza cuando el servidor web no encuentra la página o recurso solicitado
    MethodNotAllowed = 405, // Una petición fue hecha a una URI utilizando un método de solicitud no soportado por dicha URI
    NotAcceptable = 406, // El servidor no es capaz de devolver los datos en ninguno de los formatos aceptados por el cliente, indicados por éste en la cabecera "Accept" de la petición.
    InternalServerError = 500 // Es un código comúnmente emitido por aplicaciones empotradas en servidores web, mismas que generan contenido dinámicamente.
}