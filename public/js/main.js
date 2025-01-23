const socket = io();
const chatMessages = document.querySelectorAll('.chat-messages')[0];
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
const room = urlParams.get("room");

socket.on('message',message=>{
    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

socket.emit('join',{ username,room });

const formMessage = document.getElementById('chat-form');
formMessage.addEventListener('submit',e=>{
    e.preventDefault();
    const message = e.target[0].value;
    socket.emit('createMessage',message);
    e.target.msg.value = "";
    e.target.msg.focus();
})

function outputMessage(message){
    const divMessage = document.createElement('div');

    divMessage.classList.add('message');
    divMessage.innerHTML = `
    <p class="meta">${message.user} <span style="direction: ltr;">${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelectorAll('.chat-messages')[0].appendChild(divMessage)
}