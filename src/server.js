import { options } from './DB/configDB'
import express from 'express'
import morgan from 'morgan'
import {ioServer} from 'socket.io'
import http from 'http'
import routes from './routes/routes'
import Chat from './DB/mensajes'

const app = express()
const httpServer = http.createServer(app)
const io = new ioServer(httpServer)
const PORT = 8080;
const content = new Chat(options.sqlite,'usuarios')

app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

app.set("views", "./public/views");
app.set("view engine", "ejs");

let messages = [];
async function chat(){
  let messages = await content.getAll()
  io.sockets.emit('mensajesEnviados', messages)
}
io.on('connection', socket => {
  console.log("New user connected. Soquet ID : ", socket.id);

  chat()
  socket.on('newMessage', async data =>{
    await content.save(data)
    let messages = await content.getAll()
    io.sockets.emit('mensajesEnviados', messages)
  })
});


httpServer.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});