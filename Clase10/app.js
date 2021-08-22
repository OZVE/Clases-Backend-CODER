const express = require("express");
const handlebars = require("express-handlebars");

const port = 8000;
const app = express();

const server = app.listen(port, () => {
    console.log("Corriendo en el puerto " + server.address().port)
})

app.set("view engine", "ejs");
const productos = require("./rutas/productos.rutas");
app.use('/api/productos', productos);
