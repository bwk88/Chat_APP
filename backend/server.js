const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());

app.use(express.json());

// app.use('/api/chats',)

app.use('/api/user',userRoutes);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT,console.log("DB connected and Server started on PORT", process.env.PORT))
}).catch((error)=>{
    console.log(error)
})