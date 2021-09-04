//import modules
const { SSL_OP_MSIE_SSLV2_RSA_PADDING } = require("constants");
const express: any = require('express');
const app: any = express();
const server: any = require("http").Server(app);
const io: any = require("socket.io")(server);
//import poductos.rutas
const productosRutas: any = require("./rutas/productos.rutas");
//use router from productos.rutas    
app.use('/api/productos', productosRutas[0]);
//use var productos from productos.rutas
let productos: any = productosRutas[1]
let mensajes: any =[];
//set views as folder for ejs
app.set('views','./views');
app.set('view engine','ejs');
//set the folder public as static space
app.use(express.static("public"));

//io socket for table and table form

//create connection event
io.on("connection", function (socket) {
  //console log message when someone conect with the socket
  console.log("Alguien se ha conectado con Sockets");
  //emit var productos with the event messages
  socket.emit("messages", productos);
  //emit var mensajes with the event mensajes
  socket.emit("mensajes", mensajes);
  //receive data with the event new-messages
  socket.on("new-message", function (data:any) {
    //console log data received
    console.log(data)
    //push the data into product with the id
    let anibal:any = data
    let length:number = productos.items.length+1
    anibal.id = length
    productos.items.push(anibal);
    //emit va productos with the event messages
    io.sockets.emit("messages", productos);
  });
  //push data received into mensajes
  socket.on("new-mensaje", function(data){
    mensajes.push(data);
    io.sockets.emit("mensajes", mensajes);
  });
});
//server 
server.listen(8080, function () {
  console.log("Server active http://localhost:8080");
});

//io socket for chat


