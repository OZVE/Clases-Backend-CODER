const express = require("express");
const handlebars = require("express-handlebars");

const port = 8000;
const app = express();

const server = app.listen(port, () => {
    console.log("Corriendo en el puerto " + server.address().port)
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
