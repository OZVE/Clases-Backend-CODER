 
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
