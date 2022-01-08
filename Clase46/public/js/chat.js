//DESNORMALIZR 

import { messages } from "../../DB/model";

//Author Schema
const schemaAuthor = new normalizr.schema.Entity('author',{},{idAttribute: 'id'});
//Message Schema
const schemaMessage = new normalizr.schema.Entity('message',{
    author: schemaAuthor
},{idAttribute: 'id'})
//Messages Schema
const schemaMessages = new normalizr.schema.Entity('messages',{
    messages:[schemaMessage]
},{idAttribute: 'id'})
//-------------------------------------------------------------------------------//

//MESSAGES SETTING
//recieve messages
socket.on('messages', function(messagesN){
    //parse data to json
    let messagesNsize = JSON.stringify(messagesN).length
    console.log(messagesN, messagesNsize);
//denormalize usgin messages schema
    let messagesD = normalizr.denormalize(messagesD.result, schemaMessages, messagesN.entities)
////parse messagesD to json
    let messagesDsize = JSON.stringify(messagesD).length
    console.log(messagesD, messagesDsize)
//give compression percentage by mathematical operation
    let percentC= parseInt((messagesNsize * 100) / messagesDsize)
    console.log(`Compression percentage ${percentC}%`)
    //change compression info with the result of percentC
    document.getElementById('compression-info').innerText = percentC
    //render messages
    render(messagesD.messages)
});
//render chat function
function render(data){
    var html = data.map(function(elem, index){
        return(` <div>
        <b style="color:blue;">${elem.author.email}</b> 
        [<span style="color:brown;">${elem.fyh}</span>] : 
        <i style="color:green;">${elem.text}</i>
        <img width="50" src="${elem.author.avatar}" alt=" ">
    </div>`)
    }).join(' ');
    document.getElementById('messages').innerHTML =html;
}
//take data by id
const userCM = document.getElementById('username')
const textCM = document.getElementById('text')
const buttonCM = document.getElementById('send')
//add message function
function addMessage(e){
    e.preventDefault()
//create message structure
    var message = {
        author: {
            email: userCM.value, 
            name: document.getElementById('firstname').value, 
            lastname: document.getElementById('lastname').value, 
            age: document.getElementById('age').value, 
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: textCM.value
    }//emit message
    socket.emit('new-message', message)
    textCM.value =''
    textCM.focus()
    buttonCM.disabled = true

}
//disable text if email dosent exits, disable button if text dosent exist
userCM.addEventListener('input',()=>{
    let email = userCM.value.length
    let text = textCM.value.length
    textCM.disabled = !email
    buttonCM.disabled = !email || !text
})
//disable button if text dosent exits
textCM.addEventListener('input',()=>{
    let text = textCM.value.length
    buttonCM.disabled = !text
})