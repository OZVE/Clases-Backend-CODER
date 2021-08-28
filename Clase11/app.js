const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const socket = require('socket.io')

const server = app.listen(8000, function(){
    console.log('Active')
});

app.use(express.static('./public'));
const io = socket(server);

io.on('connection',socket => {
    console.log('Cliente conectado!')
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
app.use('/api/productos', productos);