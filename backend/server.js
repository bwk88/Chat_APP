const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')

const app = express();

app.use(cors());

app.use(express.json());

// app.use('/api/chats',)

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);


const server =  app.listen(process.env.PORT,console.log("Server started on PORT", process.env.PORT))

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('DB connected')
}).catch((error)=>{
    console.log(error)
})


//Socket io
const io = require('socket.io')(server,{
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173",
    }
})


//listening to an event, whic will come from frontend
io.on("connection" ,(socket)=> {
    console.log("connected to socket.io");
    
    //new socket listenning, which will create a new room for the user sent from the frontend
    socket.on('setup', (userData) =>{
        socket.join(userData._id) //created a room only this particular user
        // console.log(userData._id)
        
        socket.emit("connected");
    });

    socket.on("join Chat", (room)=>{
        socket.join(room); // the user id coming from backend will join the room
        console.log("User Joined Room: "+ room)
    })

    //event listenning for new message from the FE
    socket.on("new message",(newMessageRecieved)=>{
        var chat = newMessageRecieved.chat; //recieved chat data

        if(!chat.users) return console.log("chat.users not defined"); //if chat does not have a user

        //In a group chat if logged in user sends message than it should not get the message back.
        chat.users.forEach(user => {
            if(user._id == newMessageRecieved.sender._id) return;

            //if user is inside the users room, then emit
            socket.in(user._id).emit("message recieved", newMessageRecieved)
        });
    })

    socket.off("setup",()=>{
        console.log("USER DISCONECTED");
        socket.leave(userData._id)
    })
})
