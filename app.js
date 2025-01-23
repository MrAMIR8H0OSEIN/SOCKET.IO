const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,'public')));

const PORT = process.env.PORT ?? 3000;

io.on('connection', (socket) => {
    socket.emit("message", "Welcome to the ChatRoom");

    socket.broadcast.emit('message',"user join chat");

    socket.on('disconnect',()=>{
        io.emit('message',"user left chat");
    })
});

server.listen(PORT,()=>{
    console.log('server listen on port ' + PORT)
})