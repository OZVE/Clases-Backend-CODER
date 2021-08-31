var socket = io.connect("http://localhost:8080", { forceNew: true });

function render(data) {
  console.log(typeof data)
  var html = data
  .map(function (elem, index) {
    return `<tr>
    <th scope="row">${index+1}</th>
    <td>${elem.title}</td>:
    <td>${elem.price}</td>
    <td><img src =${elem.thumbnail} width="100" height="100"></td>
    </tr>`;
  })
  .join(" ");
  
  document.getElementById("messages").innerHTML = html;
}

socket.on("messages", function (data) {
  let index = data.items.length
  console.log(data.items)
  render(data.items, index)
});

function addMessage(e) {
  var message = {
    id: 0,
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
    };
console.log(message)
  socket.emit("new-message", message);
  return false;
}