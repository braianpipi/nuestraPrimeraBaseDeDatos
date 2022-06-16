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
import { options } from "./DB/configDB.js";
import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "http";
import Chat from "./DB/mensajes.js";
import Contenedor from "./apiClass.js";
// import knex from "knex";


const ioServer = Server;
const app = express();
const httpServer = http.createServer(app);
const io = new ioServer(httpServer);
const PORT = 8080;
const containerProducts = new Contenedor();
const content = new Chat(options.sqlite, "usuarios");


app.use(express.static("./public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", "./public/views");
app.set("view engine", "ejs");


// (async () => {
//   try {
//     await knex(options).schema.createTableIfNotExists("usuarios", (table) => {
//       table.increments("id").primary().unique();
//       table.string("name");
//       table.string("email");
//     });
//   } catch (err) {
//     console.log(err);
//   }
// })();

app.get("/", containerProducts.getByAll);
app.post("/productos", containerProducts.save);

let messages = [];
async function chat() {
  let messages = await content.getAll();
  io.sockets.emit("mensajesEnviados", messages);
}
io.on("connection", (socket) => {
  console.log("New user connected. Soquet ID : ", socket.id);

  chat();
  socket.on("newMessage", async (data) => {
    await content.save(data);
    let messages = await content.getAll();
    io.sockets.emit("mensajesEnviados", messages);
  });
});

httpServer.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
