const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// app.use('/api/chats',)


mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT,console.log("DB connected and Server started on PORT", process.env.PORT))
}).catch((error)=>{
    console.log(error)
})