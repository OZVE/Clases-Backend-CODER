//calls socket and set connection
var socket = io.connect("http://localhost:8080", { forceNew: true });
//table config
//function thar render the new data element by element into html

//CHAT

// function that render chat
function renderChat(data) {
  // console.log(data)
  var html = data
  .map(function (elem, index) {
    console.log(elem, 'aqui eugenio')
    return `<div>
    <p align="left" style="color: brown">
    <strong style="color: blue">${elem.Author.Alias}</strong>
   ${elem.date}:
    <i style="color: green">${elem.text}</i>
    </p>
    </div>`;
  })
  .join(" ");
  //send to the innerHtml element named as messages the value of var htm
  document.getElementById("mensajes").innerHTML = html;
}
//receive data with event mensajes
socket.on("mensajes", function (data) {
  // console.log(data)
  renderChat(data)
});
// form onsubmit function
function addMensaje(e) {
  let date = new Date()
  var mensaje = {
      Author:{
        id: document.getElementById("id").value,
        name: document.getElementById('Name').value,
        lastname: document.getElementById('LastName').value,
        Age: document.getElementById('Age').value,
        Alias: document.getElementById('Alias').value,
        Avatar: document.getElementById('Avatar').value,
      },
    date: date,
    text: document.getElementById("text").value,
    };

console.log(mensaje)
if(document.getElementById("id").value != 0){
//emit var message with form values with the event new-messages
socket.emit("new-mensaje", mensaje);
  return false;
}else
console.log("need email")
}