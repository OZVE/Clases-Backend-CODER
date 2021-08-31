const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const productos = require("./rutas/productos.rutas");

const port = 8000;

http.listen(port, ()=> {
    console.log('Inicializado...')
})

app.engine("hbs",handlebars(
    {
        extname:".hbs",
        defaultlayout: "index.hbs",
        layoutsDir: __dirname + "/public/views/layouts",
        partialsDir: __dirname + "/public/views/partials"
    }
    ))


    app.set("views","./public/views");
    app.set("view engine","hbs");
    app.use(express.static('public'));
    app.use('/api/productos', productos);

    io.on("connection", function (socket) {
        console.log("Alguien se ha conectado con Sockets");
        socket.emit("productos", productos);
      
        socket.on("new-producto", function (data) {
          productos.push(data);
      
          io.sockets.emit("productos", productos);
        });
    });