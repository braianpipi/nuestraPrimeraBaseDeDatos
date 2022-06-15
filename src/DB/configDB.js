// >> CONSIGNA: Tomando como base las clases Contenedor en memoria y en archivos, desarrollar un nuevo
// contenedor con identidctos metodos per que funcion sobre base de datos, utilizando knex para la 
// conexion. Esta clase debe recibir en su constructor el objeto de configuracion de Knex y el nombre
// de la tabala sobre la cual trabajara. Luego, modificar el desafio entregable de la clase 
// 11 "Chat con Websocket" y :
//     -cambiar la persistencia de los mensajes de FileSystem a bas de datos SQLite3.
//     -cambiar la persistencia de los productos de memoria a base de datos MariaDB.

// Desarrollar tambien un script que utilizando Knex cree las tablas necesarias para la persistencia 
// en cuestion (tabla mensajes en sqlite3 y tabala de productos en mariaDb).
// >> NOTAS: 
//     -Definir una carpeta DB para almacenar la base de datos SQLite3 llamada ecommerce

export const options={
    client: 'mysql',
    connection : {
        host:'127.0.0.1',
        user:'root',
        password:'',
        database:'ecommerce'
    },
    pool:{ min : 0, max:10},
    sqlite:{
        client:'sqlite3',
            connection:{
                filename:'./ecommerce.sqlite'
            },
            useNullAsDefault:true
    },
};
