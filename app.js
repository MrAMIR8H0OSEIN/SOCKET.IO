const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const { chatFormat } = require('./utility/chatFormat');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,'public')));

const PORT = process.env.PORT ?? 3000;

const chatBotName = 'bot';
io.on('connection', (socket) => {
    socket.emit("message", chatFormat("Welcome to the ChatRoom",chatBotName));

    socket.broadcast.emit("message",chatFormat("user join chat",chatBotName));

    socket.on('createMessage',msg=>{
        io.emit("message",chatFormat(msg,"user"));
    })

    socket.on('disconnect',()=>{
        io.emit("message",chatFormat("user left chat",chatBotName));
    })
});

server.listen(PORT,()=>{
    console.log('server listen on port ' + PORT)
})