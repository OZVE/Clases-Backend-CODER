 
 let socket = io.connect("http://localhost:8000", { 'forceNew': true});
 
 
 socket.on("productos", function (data) {
  console.log(data);
  render(data);
});

function render(data) {
  let a = data;
  a.array.forEach(element => {
        return( `<div>
              <td>${data.title}</td>:
              <td>${data.price}</td>
              <td>${data.thumb}</td>
            </div>`);
          })
    }
  
  document.getElementById("formulario").innerHTML = a;
  

function addProduct(e) {
  var producto = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };

  socket.emit("new-product", producto);
  return false;
}

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


