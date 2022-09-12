//const { Server } = require("socket.io");

const io = require("socket.io")
const http = require("http")

const server = http.createServer((req , res) => {



const users={};
io.on("connection",socket=>{
    socket.on("new-user-joined",name=>{
       // console.log("New user" , name);
        users[socket.id] = name;
        socket.broadcast.emit("user-joined",name);
    });

    socket.on("send",message=>{
        socket.broadcast.emit("receive",{message:message,name:users[socket.id]})
    });


socket.on("disconnect",message=>{
    socket.broadcast.emit("left",users[socket.id]);
    delete users[socket.id];
});

})
});

server.listen(3000 , "127.0.0.1", ()=> {
    console.log("listening to the port no 3000");
});







 