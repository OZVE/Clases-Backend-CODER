const express = require("express");
const app = express();

app.use('/static', express.static(__dirname + '/public'));


const port = 8000;

const server = app.listen(port, () => {
    console.log("Corriendo en el puerto " + server.address().port)
})
app.set("views","./views");
app.set("view engine", "pug");
const productos = require("./rutas/productos.rutas");
app.use('/api/productos', productos);
