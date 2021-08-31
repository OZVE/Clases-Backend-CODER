var socket = io.connect("http://localhost:8080", { forceNew: true });

socket.on("messages", function (data) {
  console.log(data);
  render(data);
});

function render(data) {
  var html = data
    .map(function (elem, index) {
      return `<div>
              <td>${elem.title}</td>:
              <td>${elem.price}</td>
              <td><img src =${elem.thumb} width="100" height="100"></td>
            </div>`;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
}

function addMessage(e) {
  var message = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumn: document.getElementById("thumb").value,
  };

  socket.emit("new-message", message);
  return false;
}