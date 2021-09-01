var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

const productosRutas = require("./rutas/productos.rutas");
    
app.use('/api/productos', productosRutas[0]);

var productos = productosRutas[1]


app.set('views','./views');
app.set('view engine','ejs');


app.use(express.static("public"));


io.on("connection", function (socket) {
  console.log("Alguien se ha conectado con Sockets");
  socket.emit("messages", productos);

  socket.on("new-message", function (data) {
    console.log(data)
    var anibal = data
    var length = productos.items.length+1
    anibal.id = length
   
    productos.items.push(anibal);

    io.sockets.emit("messages", productos);
  });
});

server.listen(8080, function () {
  console.log("Server active http://localhost:8080");
});