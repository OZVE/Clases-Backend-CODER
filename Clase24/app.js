
const { application } = require("express");
const express = require("express");
const session = require("express-session")
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const moment = require('moment')
const {Firebase} = require("./db")
var date = new Date()
var dateConverted = moment(date).format('lll');

let mensajes = [];

//set views as folder for ejs
app.set('views','./views');
app.set('view engine','ejs');
//set the folder public as static space
app.use(express.static("public"));


app.use(session({
  secret:'123',
  resave: true,
  saveUninitialized: true
}))


//server 
const eugenio = new Firebase
eugenio.connectDB()
console.log(eugenio.readMessage())
//create connection event

io.on("connection", function (socket) {
  console.log("Alguien se ha conectado con Sockets");
  eugenio.readMessage().then(data => {
    console.log(data)
  socket.emit("mensajes", data);
  })
  socket.on("new-mensaje", function(data){
      eugenio.createMessage(data);
      eugenio.readMessage().then(data => {
      io.sockets.emit("mensajes", data);
  });
});
});
app.get('/vista', (req, res) => {

  res.render("index", mensajes);
});
app.get('/usuarios', (req, res) => {

  req.session.usuario = 'Oz';
  req.session.rol = 'Admin';
  req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
  res.send(`El Usuario <Strong>${req.session.usuario}</strong>
              con rol <strong>${req.session.rol}</strong>
              ha visitado esta pagina <strong>${req.session.visitas}</strong> 
    
    `)
});

server.listen(8080, function () {
  console.log("Server active http://localhost:8080");
});