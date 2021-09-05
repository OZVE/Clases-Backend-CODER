//import modules
var SSL_OP_MSIE_SSLV2_RSA_PADDING = require("constants").SSL_OP_MSIE_SSLV2_RSA_PADDING;
var express = require('express');
var app = express();
var server = require("http").Server(app);
//import poductos.rutas
var productosRutas = require("./rutas/productos.rutas");
//use router from productos.rutas    
app.use('/api/productos', productosRutas[0]);
//set views as folder for ejs
app.set('views', './views');
app.set('view engine', 'ejs');
//set the folder public as static space
app.use(express.static("public"));
//server 
server.listen(8080, function () {
    console.log("Server active http://localhost:8080");
});
//io socket for chat
