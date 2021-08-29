const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 8000;

http.listen(port, ()=> {
    console.log('Inicializado...')
})

io.on('connection', socket => {
    console.log('Cliente conectado!'+ socket.id)
    socket.emit('message',"Hola Ususario!")
})

app.engine("hbs",handlebars(
    {
        extname:".hbs",
        defaultlayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
    }
    ))
   
    
    const productos = require("./rutas/productos.rutas");
    app.set("views","./views");
    app.set("view engine","hbs");
    app.use(express.static('public'));
    app.use('/api/productos', productos);