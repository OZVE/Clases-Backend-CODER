//import modules
const { SSL_OP_MSIE_SSLV2_RSA_PADDING } = require("constants");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
//import poductos.rutas
const productosRutas = require("./rutas/productos.rutas");
//use router from productos.rutas    
app.use('/api/productos', productosRutas[0]);
//use var productos from productos.rutas
let productos = productosRutas[1]
let mensajes = [];
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
  socket.on("new-message", function (data) {
    //console log data received
    console.log(data)
    //push the data into product with the id
    let anibal = data
    let length = productos.items.length+1
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


