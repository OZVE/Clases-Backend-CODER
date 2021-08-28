const express = require("express");
const app = express();
const http = require("http").Server(app)
const io = require("socket.io")(http);

io.on('connection', socket =>{
    console.log("loool");
    io.emit('message',"Hola!")

});
http.listen(8000,()=>{
    console.log("active")
});

app.set("view engine", "ejs");
const productos = require("./rutas/productos.rutas");
app.use('/api/productos', productos);
