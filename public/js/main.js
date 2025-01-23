const socket = io();

socket.on('message',message=>{
    outputMessage(message);
})

const formMessage = document.getElementById('chat-form');
formMessage.addEventListener('submit',e=>{
    e.preventDefault();
    const message = e.target[0].value;
    socket.emit('createMessage',message);
    e.target[0].value = "";
})

function outputMessage(message){
    const divMessage = document.createElement('div');

    divMessage.classList.add('message');
    divMessage.innerHTML = `
    <p class="meta">محمد <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelectorAll('.chat-messages')[0].appendChild(divMessage)
}