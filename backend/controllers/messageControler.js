const asyncHandler = require("express-async-handler");
const Message = require('../models/messageModels');
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = asyncHandler(async(req,res)=> {
    const { content, chatId } = req.body;

    if(!content || !chatId) {
        console.log("Invalid data passed");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id, //logged in user ID
        content: content,  // the content
        chat: chatId,  // the chat ID to which message is sent
    }

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender","name pic");

        message = await message.populate("chat");

        message = await User.populate(message,{
            path: "chat.users",
            select: "name pic email"
        })

        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage: message
        });

        res.json(message)
    } catch (error) {
        res.status(400)
        throw new Error(error.message );
    }

})

const allMessages = asyncHandler(async (req,res)=>{
    try {
        const message = await Message.find({ chat: req.params.chatId }).populate("sender","name pic email").populate("chat");
        res.json(message)
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})


module.exports = { sendMessage, allMessages }