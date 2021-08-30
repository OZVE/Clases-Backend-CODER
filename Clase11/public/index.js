document.addEventListener('DOMContentLoaded', function() {
    
    const socket = io()
    const guardarProd = document.getElementById("Guardarform")
    const title = document.getElementById("title")
    const price = document.getElementById("price")
    const thumb = document.getElementById("thumbnail")
    // const template = document.getElementById("template")
    // const toRender = document.getElementById("toRender")
    socket.on("message", msg => {
        console.log(msg)
    })



function enviarProducto (){
   
    var url = 'http://localhost:8000/api/productos/guardarform';
    var data = {title, price,thumb};
    
    fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));

 };
});