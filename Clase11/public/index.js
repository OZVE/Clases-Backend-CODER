const socket = io();

socket.on('message',(data)=>{
    console.log(data);
    socket.emit('hello','hola...')
})
