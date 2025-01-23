const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const { chatFormat } = require('./utility/chatFormat');
const { addUser, findUserByRoom, deleteUser } = require('./models/user');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,'public')));

const PORT = process.env.PORT ?? 3000;

const chatBotName = 'bot';
io.on('connection', (socket) => {
    socket.on('join',(data)=>{
        addUser(socket.id,data.username,data.room);

        socket.join(data.room);

        io.to(data.room).emit("roomUsers",findUserByRoom(data.room));

        socket.emit("message", chatFormat(`به چت روم ${data.room} خوش آمدید`,chatBotName));

        socket.broadcast.to(data.room).emit("message",chatFormat(`${data.username} وارد چت شد`,chatBotName));  

        socket.on('createMessage',msg=>{
            io.to(data.room).emit("message",chatFormat(msg,data.username));
        }) 

        socket.on('disconnect',()=>{
            deleteUser(socket.id);
            io.to(data.room).emit("message",chatFormat(`${data.username} از چت خارج شد`,chatBotName));

            io.to(data.room).emit("roomUsers",findUserByRoom(data.room));
        })
    })
    
});

server.listen(PORT,()=>{
    console.log('server listen on port ' + PORT)
})