
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const moment = require('moment')
const {Firebase} = require("./db")
var date = new Date()
var dateConverted = moment(date).format('lll');
const { normalize, denormalize, schema } = require("normalizr")
let mensajes = [];
//set views as folder for ejs
app.set('views','./views');
app.set('view engine','ejs');
//set the folder public as static space
app.use(express.static("public"));


const message = new schema.Entity("message", {
  author: author
})
const messages = new schema.Entity("messages", {
  messages: [message]
})

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
    const query = {
      id:1,
      ...data
    }
    const normalizeData = normalize(query, messages)
      eugenio.createMessage(normalizeData)
      eugenio.readMessage().then(data => {
      io.sockets.emit("mensajes", data);
  });
});
});
app.get('/vista', (req, res) => {

    res.render("index", mensajes);
})
server.listen(8080, function () {
  console.log("Server active http://localhost:8080");
});