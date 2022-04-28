const express=require('express');
const cors=require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");
const app=express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

socket.on("create",(room)=>{
    socket.join(room);
    console.log(`user ${socket.id} joind room ${room}`)
})
socket.on("join",(room)=>{
    socket.join(room);
})

socket.on("send",(data)=>{
    //console.log(`${data.room}+${data.message}`);
    socket.to(data.room).emit("recive",data.message);
})
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});
server.listen(3001, () => {
    console.log("SERVER RUNNING");
  });