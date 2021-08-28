const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(express.static('./public'));

io.on('connection',socket => {
    console.log('Cliente conectado!')
    socket.emit('message',"Hola Ususario!")
})
http.listen(8000, ()=>{
    console.log('init ws')
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
app.use('/', productos);